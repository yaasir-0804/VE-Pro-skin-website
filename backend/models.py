from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


# Product Models
class Product(BaseModel):
    id: str
    name: str
    category: str
    skinType: str
    price: int
    originalPrice: int
    discount: int
    ingredients: List[str]
    benefits: List[str]
    description: str
    fullDescription: str
    image: str
    rating: float
    reviews: int
    stock: int
    badge: str
    viewsToday: int
    boughtToday: int
    comingSoon: Optional[bool] = False
    subtitle: Optional[str] = None


# Cart Models
class CartItem(BaseModel):
    id: str
    name: str
    price: int
    quantity: int
    image: str
    skinType: str


# Customer Models
class Customer(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: str
    city: str
    state: str
    pincode: str


# Order Models
class OrderCreate(BaseModel):
    amount: int
    customer: Customer
    items: List[CartItem]


class Order(BaseModel):
    order_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    amount: int
    currency: str = "INR"
    customer: Customer
    items: List[CartItem]
    status: str = "created"  # created, paid, failed, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class PaymentVerification(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    customer: Customer
    items: List[CartItem]


# Quiz Models
class QuizAnswers(BaseModel):
    skinType: str
    concerns: List[str]
    sensitivity: str
    climate: str
    routine: str


class QuizResult(BaseModel):
    quiz_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    answers: QuizAnswers
    recommendations: List[str]
    skinTypeResult: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
