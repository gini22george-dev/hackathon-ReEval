"""
Integration & End-to-End Verification Test for BoardMark Defender
"""
import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath("backend"))

from fastapi.testclient import TestClient
from main import app, analyze_regional_blur, compute_laplacian_variance
import numpy as np

def run_tests():
    print("==================================================")
    print("1. Testing Computer Vision & Blur Detection")
    print("==================================================")
    # Create synthetic test image (300x300):
    # Top-right quadrant will be blurred (uniform/smooth)
    # Center will have sharp high-frequency edges
    img = np.zeros((300, 300), dtype=np.uint8)
    # Add sharp checkers / text-like lines in center (100 to 200)
    img[100:200:4, 100:200] = 255
    img[100:200, 100:200:4] = 255

    import cv2
    _, img_encoded = cv2.imencode(".png", img)
    blur_res = analyze_regional_blur(img_encoded.tobytes(), filename="sample_sheet.png")

    print(f"Global Variance: {blur_res['global_variance']}")
    print(f"Blurry Region Count: {blur_res['blurry_region_count']} / {blur_res['total_regions']}")
    assert len(blur_res["regions"]) == 9, "Must return exactly 9 geographic sectors"
    print("-> OpenCV 3x3 Regional Blur Analysis PASSED!")

    print("\n==================================================")
    print("2. Testing FastAPI /api/health Endpoint")
    print("==================================================")
    client = TestClient(app)
    health_resp = client.get("/api/health")
    assert health_resp.status_code == 200, f"Health check failed: {health_resp.text}"
    health_data = health_resp.json()
    print("Health response:", health_data)
    assert health_data["status"] == "healthy"
    print("-> /api/health PASSED!")

    print("\n==================================================")
    print("3. Testing FastAPI /api/audit Multipart Upload")
    print("==================================================")
    # Mock PDF bytes
    mock_pdf_bytes = b"%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"

    files = {
        "answer_sheet": ("CBSE_Physics_Class_XII.pdf", mock_pdf_bytes, "application/pdf"),
        "question_paper": ("QuestionPaper.pdf", mock_pdf_bytes, "application/pdf")
    }
    data = {
        "student_name": "Aditya Verma",
        "roll_number": "CBSE-2026-PHY-9182",
        "subject": "Physics (Class XII)",
        "exam_board": "CBSE",
        "gemini_key": "test_ai_key_simulation"
    }

    resp = client.post("/api/audit", files=files, data=data)
    print(f"Response Status Code: {resp.status_code}")
    assert resp.status_code == 200, f"Audit endpoint failed: {resp.text}"

    audit_result = resp.json()
    print("\nAudit Response Structure Validation:")
    print(" - Summary:", audit_result["summary"])
    print(f" - Audit Items Count: {len(audit_result['audit_items'])}")
    print(" - Retotalling Check:", audit_result["retotalling_check"])
    print(f" - Blur Regions Count: {len(audit_result['blur_analysis']['regions'])}")
    print(f" - Dispute Letter Length: {len(audit_result['formal_dispute_letter'])} chars")

    # Check key contracts
    assert "claimable_increase" in audit_result["summary"]
    assert audit_result["summary"]["claimable_increase"] > 0
    assert len(audit_result["audit_items"]) >= 1
    assert "has_arithmetic_error" in audit_result["retotalling_check"]
    assert len(audit_result["blur_analysis"]["regions"]) == 9
    assert "Controller of Examinations" in audit_result["formal_dispute_letter"]

    print("\n-> /api/audit E2E Integration PASSED 100%!")

if __name__ == "__main__":
    run_tests()
