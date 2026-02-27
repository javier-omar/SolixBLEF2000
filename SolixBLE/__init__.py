"""SolixBLE module.

.. moduleauthor:: Harvey Lelliott (flip-dots) <harveylelliott@duck.com>

"""

from .device import SolixBLEDevice
from .devices import C300, C300DC, C1000, C1000G2, Generic
from .states import ChargingStatus, LightStatus, PortStatus
from .utilities import discover_devices

__all__ = [
    "SolixBLEDevice",
    "C300",
    "C300DC",
    "C1000",
    "C1000G2",
    "Generic",
    "ChargingStatus",
    "LightStatus",
    "PortStatus",
    "discover_devices",
]
