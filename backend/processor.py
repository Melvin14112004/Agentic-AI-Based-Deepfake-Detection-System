import numpy as np
import torch
from PIL import Image
import cv2


class DeepFakeProcessor:
    def __init__(self, im_size=112, mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]):
        self.im_size = im_size
        self.mean = mean
        self.std = std

    def preprocess_frame(self, frame):
        if isinstance(frame, np.ndarray):
            frame = Image.fromarray(frame)

        frame = frame.resize((self.im_size, self.im_size))

        frame = np.array(frame).astype(np.float32) / 255.0
        frame = (frame - np.array(self.mean)) / np.array(self.std)
        frame = frame.transpose(2, 0, 1)

        return torch.tensor(frame, dtype=torch.float32)

    def extract_frames(self, video_path, sequence_length=20):
        frames = []
        vid = cv2.VideoCapture(video_path)

        total_frames = int(vid.get(cv2.CAP_PROP_FRAME_COUNT))
        interval = max(1, total_frames // sequence_length)

        count = 0
        success = True

        while success and len(frames) < sequence_length:
            success, frame = vid.read()
            if success and count % interval == 0:
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                processed = self.preprocess_frame(frame)
                frames.append(processed)
            count += 1

        while len(frames) < sequence_length:
            frames.append(frames[-1] if frames else torch.zeros((3, self.im_size, self.im_size)))

        stack = torch.stack(frames)
        stack = stack.unsqueeze(0)

        return stack

    def __call__(self, video_path=None, frames=None, return_tensors="pt", **kwargs):
        if return_tensors != "pt":
            raise ValueError("Only 'pt' tensors supported")

        if video_path is not None:
            return {"pixel_values": self.extract_frames(video_path)}
        elif frames is not None:
            processed = torch.stack([self.preprocess_frame(f) for f in frames])
            return {"pixel_values": processed.unsqueeze(0)}
        else:
            raise ValueError("Need video_path or frames")
