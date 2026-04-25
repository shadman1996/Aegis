# IoT Device Connectivity & Partnership Ecosystem
# Nexara + CRM — Bengal Bound Ltd | v1.0
# "Connect everything. Every connection = revenue."

---

## Strategy: Partnership-Led Revenue

```
Every integration is a revenue stream:
├── IoT device makers → Nexara Certified badge → co-marketing
├── Platform partners → Nexara listed on their marketplace
├── Resellers → 20% recurring commission → passive income
├── Developer ecosystem → API usage fees
└── White-label → enterprise one-time setup + monthly licence
```

---

## 1. Cloud IoT Platforms (Enterprise Tier)

### AWS IoT Core ✅ Ready to Integrate
**Docs:** `docs.aws.amazon.com/iot/latest/developerguide`
**Protocol:** MQTT 3.1.1 + MQTT 5.0 + WebSocket Secure
**Security:** TLS 1.2/1.3 + X.509 certificates + Mutual TLS
**Ports:** 8883 (MQTT) · 443 (WebSocket) · 443 (HTTPS)
**Scale:** Millions of concurrent devices

```python
# Nexara AWS IoT Bridge (Django service)
import paho.mqtt.client as mqtt
import ssl

class AWSIoTBridge:
    """Subscribes to AWS IoT Core topics → feeds data to Nexara agents"""
    BROKER = "{account}.iot.{region}.amazonaws.com"
    PORT = 8883

    def connect(self, client_id, cert_path, key_path, ca_path):
        client = mqtt.Client(client_id=client_id, clean_session=False)
        client.tls_set(ca_path, cert_path, key_path,
                      tls_version=ssl.PROTOCOL_TLSv1_2)
        client.on_message = self.on_message
        client.connect(self.BROKER, self.PORT)
        client.subscribe("nexara/{client_id}/sensors/#", qos=1)
        return client

    def on_message(self, client, userdata, msg):
        # Inspector gate → route to appropriate agent
        InspectorGate.evaluate_iot_data(msg.payload, msg.topic)
```

**Partnership opportunity:** List Nexara on AWS Marketplace → AWS handles billing

---

### Azure IoT Hub ✅ Ready to Integrate
**Docs:** `learn.microsoft.com/en-us/azure/iot-hub/`
**Protocols:** MQTT · MQTT over WebSocket · AMQP · AMQP over WebSocket · HTTPS
**Ports:** 8883 (MQTT) · 5671 (AMQP) · 443 (WebSocket/HTTPS)
**Auth:** SAS Tokens · X.509 certificates
**Scale:** Billions of messages/day

```python
# Nexara Azure IoT Bridge
from azure.iot.device import IoTHubDeviceClient, Message

class AzureIoTBridge:
    """Receives Azure IoT Hub telemetry → Nexara agents"""

    def connect(self, connection_string):
        client = IoTHubDeviceClient.create_from_connection_string(
            connection_string
        )
        client.on_message_received = self.handle_message
        client.connect()
        return client

    def handle_message(self, message):
        payload = message.data.decode("utf-8")
        InspectorGate.evaluate_iot_data(payload)
```

**Partnership opportunity:** List Nexara on Microsoft AppSource
**SSO bonus:** Azure AD B2C → "Sign in with Microsoft" → already in our auth stack

---

### HiveMQ Cloud ✅ RECOMMENDED MQTT Broker
**Docs:** `www.hivemq.com/docs/hivemq-cloud`
**API:** OpenAPI 3.0 REST API
**Scale:** Mission-critical, 100% Sparkplug compliant
**Why choose:** Enterprise-grade, 100M+ connections, industrial IoT

```
HiveMQ cluster (managed) → Nexara subscribes via MQTT
→ Inspector gate → Route to agent
```

**Tier:** Free (100 connections) → $49/mo → Enterprise custom

---

### EMQX Cloud ✅ HIGH-SCALE MQTT Broker
**Docs:** `docs.emqx.com/en/cloud`
**API:** REST API + SQL Rule Engine
**Scale:** 100M+ concurrent connections
**Key feature:** Built-in data pipelines → directly push to PostgreSQL, Kafka, HTTP

```
EMQX Rule Engine:
IoT device sends → EMQX broker → SQL rule matches
→ HTTP sink → POST to api.nexara.io/v1/iot/event/
→ Inspector evaluates → Agent takes action
```

**Cost:** Free (1M free messages/mo) → Serverless $0.00014/msg

---

### ThingsBoard ✅ OPEN SOURCE OPTION
**Docs:** `thingsboard.io/docs/`
**Protocols:** MQTT · HTTP · CoAP · LwM2M
**Deploy:** Self-hosted (free) or Cloud ($10/device/month)
**Key feature:** Rule Engine → webhooks → Nexara

```
ThingsBoard Rule Engine:
Device data received → Rule node → REST API call
→ POST api.nexara.io/v1/iot/thingsboard/
→ Nexara agent processes + responds
```

**Partnership:** Nexara becomes "ThingsBoard Integration Partner" → listed in their marketplace

---

## 2. Consumer IoT Ecosystems (SME Tier)

### Tuya IoT Platform ✅ MASSIVE MARKET (Millions of cheap smart devices)
**Docs:** `developer.tuya.com/en/docs`
**API:** REST API + WebSocket
**Devices:** 700M+ devices globally using Tuya backend (every cheap smart plug/bulb)
**Auth:** OAuth 2.0 + Client ID/Secret
**Endpoints:** `openapi.tuyaeu.com` (EU) · `openapi.tuyaus.com` (US)

```python
# Nexara Tuya Bridge
import hmac, hashlib, time, requests

class TuyaIoTBridge:
    BASE_URL = "https://openapi.tuyaeu.com"

    def get_token(self):
        """Get Tuya OAuth token"""
        t = str(int(time.time() * 1000))
        # Sign with client secret
        sign = hmac.new(self.SECRET.encode(),
                       (self.CLIENT_ID + t).encode(),
                       hashlib.sha256).hexdigest().upper()
        return requests.post(f"{self.BASE_URL}/v1.0/token",
                           headers={"client_id": self.CLIENT_ID,
                                    "sign": sign, "t": t})

    def get_device_status(self, device_id, token):
        """Get live sensor data from any Tuya device"""
        return requests.get(
            f"{self.BASE_URL}/v1.0/devices/{device_id}/status",
            headers={"access_token": token}
        )
```

**Use cases for Nexara:**
- Smart office sensors (Hera: attendance via entry sensors)
- Smart locks (Rex: security monitoring)
- Smart energy meters (Finn: utility cost tracking)
- Warehouse temp/humidity sensors (Flux: cold chain)
- POS card readers (Cash: transaction monitoring)

---

### Matter / Thread ✅ THE FUTURE STANDARD (2024+)
**What it is:** Universal IoT standard backed by Apple, Google, Amazon, Samsung
**Why critical:** Any Matter-certified device works with any Matter hub
**Devices:** 4,000+ certified devices and growing fast
**Protocol:** IP-based (Thread, Wi-Fi, Ethernet)

```
Matter device → Home Hub (Apple HomePod/Echo/Google Home)
     → Matter Bridge → Nexara IoT Gateway
     → Inspector → Agent action
```

**Nexara roadmap:** Build Matter SDK bridge (Phase 3) to connect to the entire Matter ecosystem at once

---

### Samsung SmartThings ✅
**Docs:** `developer.smartthings.com`
**API:** REST API + WebHook subscriptions
**Auth:** OAuth 2.0

```python
# Subscribe to device events via SmartThings webhooks
# SmartThings → POST api.nexara.io/v1/iot/smartthings/
# Nexara processes → agent action
```

---

### Home Assistant ✅ (3,000+ device integrations)
**Docs:** `developers.home-assistant.io`
**API:** REST API · WebSocket API · MQTT integration
**Why:** One Home Assistant install connects 3,000+ device brands

```
Home Assistant (local) → REST API → Nexara
# One integration = access to 3,000+ device types
```

---

## 3. Hardware Platforms (Developer/Industrial)

### ESP32 / Arduino (Most Popular IoT Hardware Globally)
**Protocol:** MQTT via WiFi
**Library:** PubSubClient (Arduino) / paho-mqtt (Python)
**Cost:** $5–$15 per device

```cpp
// ESP32 → Nexara via MQTT (Arduino code)
#include <WiFi.h>
#include <PubSubClient.h>

const char* mqtt_server = "mqtt.nexara.io";
const int mqtt_port = 8883; // TLS

void publishSensorData(float temperature, float humidity) {
  String payload = "{\"temp\":" + String(temperature) +
                   ",\"humidity\":" + String(humidity) + "}";
  client.publish("nexara/CLIENT_ID/sensors/env", payload.c_str());
  // → Nexara receives → Inspector → Flux/Rex/Finn agent processes
}
```

**Use cases:** Factory floor sensors, warehouse monitoring, smart office

---

### Raspberry Pi (Edge Gateway)
**Role:** Local edge processor → MQTT bridge to Nexara cloud
**Why:** Process data locally, only send important events to cloud (cost saving)

```python
# Raspberry Pi Edge Gateway
import paho.mqtt.client as mqtt
import requests

def on_message(client, userdata, msg):
    # Pre-filter locally → only send to Nexara if significant
    data = json.loads(msg.payload)
    if data['temperature'] > 35:  # Only alert on threshold
        requests.post("https://api.nexara.io/v1/iot/event/",
                     json={"type": "temperature_alert", "value": data},
                     headers={"Authorization": f"Bearer {NEXARA_API_KEY}"})
```

---

### Particle.io (Industrial-Grade)
**Docs:** `docs.particle.io`
**Devices:** Boron (LTE) · Argon (WiFi) · Photon 2
**Feature:** Built-in webhook → POST to Nexara on any sensor event
**Cost:** $4.99/device/month (managed cloud)

```
Particle device → Particle Cloud → Webhook integration
→ POST api.nexara.io/v1/iot/particle/
→ Agent processes
```

---

## 4. Industrial IoT (Enterprise/Manufacturing)

| Protocol | Standard | Used In | Nexara Integration |
|---|---|---|---|
| **OPC-UA** | Industry standard | Manufacturing, SCADA | Phase 3 via Bridge |
| **Modbus/TCP** | Industrial control | PLCs, motors, meters | Phase 3 |
| **BACnet** | Building automation | HVAC, lighting, access | Phase 3 |
| **Profibus** | Process automation | Chemical, pharma | Phase 3 |
| **AMQP** | Enterprise messaging | High-volume telemetry | Phase 1 (HiveMQ) |
| **Zigbee** | Low-power mesh | Smart building sensors | Via Home Assistant |
| **Z-Wave** | Smart home | Security, locks | Via Home Assistant |
| **LoRaWAN** | Long-range low-power | Agriculture, utilities | Phase 2 |

---

## 5. Nexara IoT Gateway Architecture

```
DEVICE LAYER                 NEXARA IOT GATEWAY              AGENTS
─────────────                ──────────────────              ──────
ESP32/Arduino  ──MQTT──►  ┌────────────────────┐
Raspberry Pi   ──MQTT──►  │   MQTT Broker       │
Tuya devices   ──REST──►  │   (EMQX Cloud)      │
AWS IoT Core   ──MQTT──►  │                    │
Azure IoT Hub  ──AMQP──►  │   Rule Engine       │──► Inspector ──► Rex
ThingsBoard    ──HTTP──►  │   (SQL-based)       │──► Inspector ──► Flux
SmartThings    ──WebHook► │                    │──► Inspector ──► Finn
Home Assistant ──REST──►  │   Topic Router      │──► Inspector ──► Hera
Particle       ──WebHook► └────────────────────┘──► Inspector ──► Payload
Matter devices ──Thread►              │
                          ┌───────────▼───────────┐
                          │   IoT Event Store      │
                          │   (PostgreSQL + TimeSeries)│
                          └───────────────────────┘
```

---

## 6. Revenue Model from IoT Connectivity

| Stream | Model | Estimate |
|---|---|---|
| **IoT add-on tier** | +৳2,000/mo per client for IoT module | High margin |
| **Device management** | Per-device fee (like Particle) | Recurring |
| **AWS Marketplace listing** | AWS handles billing, takes 3% | Passive |
| **Azure AppSource listing** | Microsoft handles billing | Passive |
| **SmartThings partner** | Listed in Samsung ecosystem | Lead generation |
| **ThingsBoard partner** | Listed in their marketplace | Lead generation |
| **Tuya Solution Partner** | Listed for 700M+ device owners | Massive reach |
| **White-label IoT dashboard** | Enterprises rebrand Nexara IoT | $5,000+ setup |

---

## 7. Quick-Connect Reference Card (for docs)

```
For developers connecting to Nexara IoT:

MQTT Broker:    mqtt.nexara.io:8883 (TLS required)
HTTP Endpoint:  https://api.nexara.io/v1/iot/event/
Auth:           Bearer {YOUR_NEXARA_API_KEY}
Topic format:   nexara/{client_id}/{device_type}/{device_id}

Example topic:  nexara/clt_123/sensors/temp_sensor_001
Example payload: {"value": 28.5, "unit": "celsius", "timestamp": "..."}

Full IoT docs:  https://developers.nexara.io/iot
```

---

*Bengal Bound Ltd — IoT Connectivity v1.0*
*Every device connected = every action automated = every client retained.*
