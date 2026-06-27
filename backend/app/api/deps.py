from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.shared.database import get_db
from app.shared.security import verify_token
from app.models.models import User, Workspace, UserRole

def get_current_user(
    db: Session = Depends(get_db),
    token_payload: dict = Depends(verify_token)
) -> User:
    user_id = token_payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(User).filter(User.id == user_id).first()
    
    # Auto-provision user if they exist in Supabase Auth but not in our public.users table yet
    if not user:
        email = token_payload.get("email", "")
        # Create a default workspace for them
        new_workspace = Workspace(name=f"{email.split('@')[0]}'s Workspace")
        db.add(new_workspace)
        db.flush() # Get the new workspace ID

        user = User(
            id=user_id,
            email=email,
            name=token_payload.get("user_metadata", {}).get("full_name", email.split('@')[0]),
            role=UserRole.USER,
            workspace_id=new_workspace.id
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return user
