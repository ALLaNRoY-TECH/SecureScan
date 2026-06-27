from typing import Generic, TypeVar, Optional, List, Any
from pydantic import BaseModel

T = TypeVar("T")

class PaginationMeta(BaseModel):
    page: int
    size: int
    total_items: int
    total_pages: int

class APIResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    meta: Optional[dict] = None
    pagination: Optional[PaginationMeta] = None
    errors: Optional[List[dict]] = None

def success_response(data: Any, meta: Optional[dict] = None, pagination: Optional[PaginationMeta] = None) -> APIResponse:
    return APIResponse(success=True, data=data, meta=meta, pagination=pagination)

def error_response(errors: List[dict]) -> APIResponse:
    return APIResponse(success=False, errors=errors)
