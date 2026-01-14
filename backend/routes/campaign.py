from fastapi import APIRouter, HTTPException
from models import Customer, CartItem
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from datetime import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import csv
import io

load_dotenv()

router = APIRouter(prefix="/campaign", tags=["campaign"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]


class CampaignLead(BaseModel):
    customer: Customer
    items: List[CartItem]
    total_amount: int
    created_at: datetime = None


@router.post("/submit")
async def submit_campaign_lead(lead_data: CampaignLead):
    """Capture pre-launch campaign lead and send email"""
    try:
        # Add timestamp
        if not lead_data.created_at:
            lead_data.created_at = datetime.utcnow()
        
        # Save to database
        lead_dict = lead_data.dict()
        await db.campaign_leads.insert_one(lead_dict)
        
        # Send email with customer details
        await send_customer_email(lead_data)
        
        return {
            "success": True,
            "message": "Pre-launch interest captured successfully!",
            "discount_code": "SKIN25NOW"
        }
    
    except Exception as e:
        print(f"Campaign submission error: {str(e)}")
        # Still return success even if email fails
        return {
            "success": True,
            "message": "Pre-launch interest captured!",
            "discount_code": "SKIN25NOW"
        }


async def send_customer_email(lead_data: CampaignLead):
    """Send email with customer details as CSV attachment"""
    try:
        gmail_user = os.environ.get('GMAIL_USER')
        gmail_password = os.environ.get('GMAIL_APP_PASSWORD')
        admin_email = os.environ.get('ADMIN_EMAIL')
        
        if not gmail_user or not gmail_password:
            print("Gmail credentials not configured")
            return
        
        # Create CSV data
        csv_buffer = io.StringIO()
        csv_writer = csv.writer(csv_buffer)
        
        # Write headers
        csv_writer.writerow([
            'Date', 'Name', 'Email', 'Phone', 'Address', 'City', 
            'State', 'Pincode', 'Products', 'Total Amount'
        ])
        
        # Write customer data
        products_list = ', '.join([f"{item.name} (Qty: {item.quantity})" for item in lead_data.items])
        csv_writer.writerow([
            lead_data.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            lead_data.customer.name,
            lead_data.customer.email,
            lead_data.customer.phone,
            lead_data.customer.address,
            lead_data.customer.city,
            lead_data.customer.state,
            lead_data.customer.pincode,
            products_list,
            f"₹{lead_data.total_amount}"
        ])
        
        # Create email
        msg = MIMEMultipart()
        msg['From'] = gmail_user
        msg['To'] = admin_email
        msg['Subject'] = f'🎉 New Pre-Launch Lead: {lead_data.customer.name}'
        
        # Email body
        body = f"""
        New Pre-Launch Campaign Lead Received!
        
        Customer Details:
        ==================
        Name: {lead_data.customer.name}
        Email: {lead_data.customer.email}
        Phone: {lead_data.customer.phone}
        
        Address:
        {lead_data.customer.address}
        {lead_data.customer.city}, {lead_data.customer.state} - {lead_data.customer.pincode}
        
        Products Interested In:
        =======================
        {products_list}
        
        Total Amount: ₹{lead_data.total_amount}
        
        Date: {lead_data.created_at.strftime('%Y-%m-%d %H:%M:%S')}
        
        ---
        VÉ PRO SKIN Pre-Launch Campaign
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Attach CSV
        csv_data = csv_buffer.getvalue()
        attachment = MIMEBase('application', 'octet-stream')
        attachment.set_payload(csv_data.encode())
        encoders.encode_base64(attachment)
        attachment.add_header(
            'Content-Disposition',
            f'attachment; filename=lead_{lead_data.customer.name}_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'
        )
        msg.attach(attachment)
        
        # Send email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(gmail_user, gmail_password)
        server.send_message(msg)
        server.quit()
        
        print(f"✅ Email sent successfully to {admin_email}")
        
    except Exception as e:
        print(f"❌ Email sending failed: {str(e)}")


@router.get("/leads")
async def get_all_leads():
    """Get all campaign leads"""
    leads = await db.campaign_leads.find().sort("created_at", -1).to_list(1000)
    
    for lead in leads:
        lead.pop('_id', None)
    
    return leads


@router.get("/leads/export")
async def export_leads_csv():
    """Export all leads as CSV"""
    leads = await db.campaign_leads.find().sort("created_at", -1).to_list(1000)
    
    csv_buffer = io.StringIO()
    csv_writer = csv.writer(csv_buffer)
    
    # Headers
    csv_writer.writerow([
        'Date', 'Name', 'Email', 'Phone', 'Address', 'City', 
        'State', 'Pincode', 'Products', 'Total Amount'
    ])
    
    # Data
    for lead in leads:
        products_list = ', '.join([f"{item['name']} (Qty: {item['quantity']})" for item in lead['items']])
        csv_writer.writerow([
            lead['created_at'].strftime('%Y-%m-%d %H:%M:%S'),
            lead['customer']['name'],
            lead['customer']['email'],
            lead['customer']['phone'],
            lead['customer']['address'],
            lead['customer']['city'],
            lead['customer']['state'],
            lead['customer']['pincode'],
            products_list,
            f"₹{lead['total_amount']}"
        ])
    
    return {
        "csv_data": csv_buffer.getvalue(),
        "total_leads": len(leads)
    }
