from pymongo import ReturnDocument
from fastapi import APIRouter

from utils.database import get_analytics_collection


router = APIRouter(prefix="/api", tags=["analytics"])

PORTFOLIO_VIEWS_ID = "portfolio_views"


@router.get("/portfolio/views")
async def get_portfolio_views():
    collection = get_analytics_collection()
    doc = await collection.find_one({"_id": PORTFOLIO_VIEWS_ID})
    return {"count": int(doc.get("count", 0)) if doc else 0}


@router.post("/portfolio/views/increment")
async def increment_portfolio_views():
    collection = get_analytics_collection()
    updated_doc = await collection.find_one_and_update(
        {"_id": PORTFOLIO_VIEWS_ID},
        {"$inc": {"count": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )
    return {"count": int(updated_doc.get("count", 0))}
