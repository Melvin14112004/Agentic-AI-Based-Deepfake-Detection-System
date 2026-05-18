#!/usr/bin/env python3
"""
Debug script for tayyabimam/Deepfake custom model
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv(dotenv_path=Path(__file__).parent / ".env")


def debug_hf_model():
    print("🔍 Debugging Hugging Face Model Loading...")
    print("=" * 60)

    model_name = os.getenv("MODEL_NAME", "tayyabimam/Deepfake")
    hf_token = os.getenv("HUGGINGFACE_TOKEN")

    print(f"Model name: {model_name}")
    print(f"Token available: {'Yes' if hf_token else 'No'}")

    if not hf_token:
        print("❌ No valid Hugging Face token!")
        return False

    # Test 1: Repo access
    print("\n🧪 Test 1: Accessing repository...")
    try:
        from huggingface_hub import HfApi
        api = HfApi()
        files = api.list_repo_files(repo_id=model_name, token=hf_token)
        print("✅ Repository accessible")
        print(f"Files in repo: {files}")
    except Exception as e:
        print(f"❌ Cannot access repo: {e}")
        return False

    # Test 2: Download weights
    print("\n🧪 Test 2: Downloading model weights...")
    try:
        from huggingface_hub import hf_hub_download
        cache_dir = Path(__file__).parent / "model_cache"
        cache_dir.mkdir(exist_ok=True)

        weights_file = "model_87_acc_20_frames_final_data.pt"
        path = hf_hub_download(
            repo_id=model_name,
            filename=weights_file,
            token=hf_token,
            local_dir=cache_dir
        )

        print(f"✅ Downloaded {weights_file}")
    except Exception as e:
        print(f"❌ Download failed: {e}")
        return False

    # Test 3: Import modules
    print("\n🧪 Test 3: Importing local modules...")
    try:
        sys.path.insert(0, str(Path(__file__).parent))

        from model import DeepFakeDetectorModel
        from processor import DeepFakeProcessor

        print("✅ Local modules imported successfully")
    except Exception as e:
        print(f"❌ Import failed: {e}")
        return False

    # Test 4: Load model weights
    print("\n🧪 Test 4: Loading model weights...")
    try:
        import torch

        model = DeepFakeDetectorModel()
        state_dict = torch.load(path, map_location="cpu")
        model.load_state_dict(state_dict)
        model.eval()

        proc = DeepFakeProcessor()

        print("✅ Model loaded successfully — ready for inference!")
        return True
    except Exception as e:
        print(f"❌ Model loading failed: {e}")
        return False


if __name__ == "__main__":
    success = debug_hf_model()
    print("\n" + "=" * 60)
    if success:
        print("✅ System ready for deepfake detection")
    else:
        print("❌ Some tests FAILED")
