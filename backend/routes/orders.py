from fastapi import APIRouter, HTTPException
from models import OrderCreate, Order, PaymentVerification
from motor.motor_asyncio import AsyncIOMotorClient
import razorpay
import hmac
import hashlib
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/orders", tags=["orders"])

# Razorpay client
razorpay_client = razorpay.Client(
    auth=(
        os.environ.get('RAZORPAY_KEY_ID', 'your_razorpay_key_id'),
        os.environ.get('RAZORPAY_KEY_SECRET', 'your_razorpay_key_secret')
    )
)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]


@router.post("/create")
async def create_order(order_data: OrderCreate):
    """Create a Razorpay order"""
    try:
        # Convert to paise (Razorpay uses paise)
        amount_in_paise = order_data.amount * 100
        
        # Create Razorpay order
        razorpay_order = razorpay_client.order.create({
            "amount": amount_in_paise,
            "currency": "INR",
            "payment_capture": 1
        })
        
        # Create order in database
        order = Order(
            razorpay_order_id=razorpay_order['id'],
            amount=order_data.amount,
            customer=order_data.customer,
            items=order_data.items,
            status="created"
        )
        
        await db.orders.insert_one(order.dict())
        
        return {
            "razorpay_order_id": razorpay_order['id'],
            "amount": razorpay_order['amount'],
            "currency": razorpay_order['currency'],
            "key_id": os.environ.get('RAZORPAY_KEY_ID', 'your_razorpay_key_id')
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")


@router.post("/verify")
async def verify_payment(verification: PaymentVerification):
    """Verify Razorpay payment signature"""
    try:
        # Verify signature
        razorpay_secret = os.environ.get('RAZORPAY_KEY_SECRET', 'your_razorpay_key_secret')
        
        generated_signature = hmac.new(
            razorpay_secret.encode(),
            f"{verification.razorpay_order_id}|{verification.razorpay_payment_id}".encode(),
            hashlib.sha256
        ).hexdigest()
        
        if generated_signature != verification.razorpay_signature:
            raise HTTPException(status_code=400, detail="Invalid payment signature")
        
        # Update order in database
        result = await db.orders.update_one(
            {"razorpay_order_id": verification.razorpay_order_id},
            {
                "$set": {
                    "razorpay_payment_id": verification.razorpay_payment_id,
                    "status": "paid"
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        # Get order details
        order = await db.orders.find_one({"razorpay_order_id": verification.razorpay_order_id})
        
        return {
            "success": True,
            "order_id": order['order_id'],
            "message": "Payment verified successfully"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment verification failed: {str(e)}")


@router.get("/{order_id}")
async def get_order(order_id: str):
    """Get order details by order_id"""
    order = await db.orders.find_one({"order_id": order_id})
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Remove MongoDB _id field
    order.pop('_id', None)
    
    return order


@router.get("/")
async def get_all_orders():
    """Get all orders"""
    orders = await db.orders.find().to_list(1000)
    
    # Remove MongoDB _id fields
    for order in orders:
        order.pop('_id', None)
    
    return orders
