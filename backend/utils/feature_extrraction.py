import numpy as np
import librosa
import pywt
from scipy import stats

FIXED_LENGTH = 1000  # Fixed length for spectrogram padding

def extract_spectrogram(audio, sample_rate):
    """ Extract and normalize spectrogram features """
    spectrogram = librosa.feature.melspectrogram(y=audio, sr=sample_rate)
    spectrogram = librosa.power_to_db(spectrogram)

    # Pad or truncate to fixed length
    if spectrogram.shape[1] > FIXED_LENGTH:
        spectrogram = spectrogram[:, :FIXED_LENGTH]
    else:
        spectrogram = np.pad(spectrogram, ((0, 0), (0, FIXED_LENGTH - spectrogram.shape[1])), 'constant')

    return spectrogram.flatten()

def extract_statistical_features(audio):
    """ Extract basic statistical features """
    return [
        np.mean(audio), np.var(audio), stats.skew(audio), stats.kurtosis(audio),
        np.sqrt(np.mean(audio**2)), np.max(audio), np.min(audio),
        np.mean(librosa.zero_crossings(audio, pad=False))
    ]

def extract_frequency_features(audio, sample_rate):
    """ Extract frequency domain features """
    mfcc = np.mean(librosa.feature.mfcc(y=audio, sr=sample_rate), axis=1)
    return list(mfcc) + [
        np.mean(librosa.feature.spectral_centroid(y=audio, sr=sample_rate)),
        np.mean(librosa.feature.spectral_bandwidth(y=audio, sr=sample_rate)),
        np.mean(librosa.feature.spectral_contrast(y=audio, sr=sample_rate)),
        np.mean(librosa.feature.spectral_flatness(y=audio)),
        np.mean(librosa.feature.spectral_rolloff(y=audio, sr=sample_rate))
    ]

def extract_wavelet_features(audio):
    """ Extract wavelet decomposition features """
    coeffs = pywt.wavedec(audio, wavelet="db1", level=5)
    features = []
    for coef in coeffs:
        features.extend([np.mean(coef), np.var(coef), np.max(coef), np.min(coef)])
    return features
