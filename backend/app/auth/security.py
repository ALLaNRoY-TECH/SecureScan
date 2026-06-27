from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from pydantic import ValidationError

from app.core.config import settings

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    if not settings.SUPABASE_JWT_SECRET:
        # If we are in local dev and secret is missing, allow mock login for now
        if credentials.credentials == "mock_access_token" or credentials.credentials == "mock_access_token_new":
            return {"sub": "u_1", "email": "admin@example.com"}
        raise HTTPException(status_code=500, detail="SUPABASE_JWT_SECRET not configured")

    try:
        # Supabase uses HS256 to sign JWTs
        payload = jwt.decode(
            credentials.credentials,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated"
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
