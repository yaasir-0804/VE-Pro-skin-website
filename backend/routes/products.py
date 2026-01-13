from fastapi import APIRouter, HTTPException
from models import Product
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/products", tags=["products"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]


@router.get("/", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    skin_type: Optional[str] = None
):
    """Get all products with optional filters"""
    query = {}
    
    if category:
        query['category'] = category
    
    if skin_type:
        query['skinType'] = skin_type
    
    products = await db.products.find(query).to_list(1000)
    
    # Remove MongoDB _id fields
    for product in products:
        product.pop('_id', None)
    
    return products


@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a single product by ID"""
    product = await db.products.find_one({"id": product_id})
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.pop('_id', None)
    
    return product


@router.post("/", response_model=Product)
async def create_product(product: Product):
    """Create a new product (admin only)"""
    await db.products.insert_one(product.dict())
    return product


@router.put("/{product_id}", response_model=Product)
async def update_product(product_id: str, product: Product):
    """Update a product (admin only)"""
    result = await db.products.update_one(
        {"id": product_id},
        {"$set": product.dict()}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product


@router.delete("/{product_id}")
async def delete_product(product_id: str):
    """Delete a product (admin only)"""
    result = await db.products.delete_one({"id": product_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully"}
