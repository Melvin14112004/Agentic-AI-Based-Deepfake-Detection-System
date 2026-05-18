import torch
import torch.nn as nn
import torchvision.models as models


class DeepFakeDetectorModel(nn.Module):
    def __init__(self):
        super().__init__()

        self.latent_dim = 2048
        self.hidden_dim = 2048
        self.num_classes = 2

        # ResNeXt50 backbone
        resnext = models.resnext50_32x4d(pretrained=True)
        self.model = nn.Sequential(*list(resnext.children())[:-2])

        # LSTM
        self.lstm = nn.LSTM(
        input_size=self.latent_dim,
        hidden_size=self.hidden_dim,
        num_layers=1,
        bidirectional=False,
        bias=False
    )

        self.dropout = nn.Dropout(0.4)
        self.linear1 = nn.Linear(self.hidden_dim, self.num_classes)
        self.avgpool = nn.AdaptiveAvgPool2d(1)

    def forward(self, x):
        batch_size, seq_length, c, h, w = x.shape

        x = x.view(batch_size * seq_length, c, h, w)

        features = self.model(x)
        pooled = self.avgpool(features)

        pooled = pooled.view(batch_size, seq_length, self.latent_dim)

        lstm_out, _ = self.lstm(pooled)
        final = lstm_out[:, -1, :]

        logits = self.linear1(self.dropout(final))

        return logits
