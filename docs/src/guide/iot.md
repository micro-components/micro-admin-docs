# IoT物联网

## 概述

IoT物联网平台提供设备接入、数据采集、远程控制、设备管理等物联网核心功能，实现万物互联的智能化管理。

## 核心功能

### 设备管理

- 设备注册
- 设备认证
- 设备状态监控
- 设备配置
- 设备固件升级
- 设备日志

### 数据采集

- 实时数据采集
- 历史数据存储
- 数据质量检查
- 数据聚合统计
- 数据导出

### 远程控制

- 远程指令下发
- 设备参数配置
- 设备重启/关机
- 批量操作

### 规则引擎

- 数据转发规则
- 告警规则
- 定时任务
- 场景联动

## 功能特性

### 1. 设备管理

#### 设备数据模型

```typescript
interface Device {
  id: number
  deviceKey: string      // 设备唯一标识
  deviceName: string    // 设备名称
  deviceType: string    // 设备类型
  productKey: string    // 产品Key
  status: DeviceStatus
  online: boolean
  lastOnlineTime?: Date
  location?: Location
  firmware: Firmware
  properties: Record<string, any>
  tags: DeviceTag[]
  createdAt: Date
  updatedAt: Date
}

type DeviceStatus = 'active' | 'inactive' | 'disabled'

interface Location {
  latitude: number
  longitude: number
  address?: string
}

interface Firmware {
  version: string
  upgradeAvailable: boolean
  upgradeUrl?: string
  upgradeAt?: Date
}

interface DeviceTag {
  key: string
  value: string
}
```

#### 产品管理

```typescript
interface Product {
  id: number
  productKey: string
  productName: string
  category: string
  deviceType: 'gateway' | 'sub_device' | 'sensor' | 'actuator'
  description: string
  dataFormat: 'json' | 'binary'
  protocols: string[]      // 支持的协议
  properties: PropertyDefinition[]
  services: ServiceDefinition[]
  events: EventDefinition[]
}

interface PropertyDefinition {
  identifier: string
  name: string
  dataType: 'int' | 'float' | 'bool' | 'enum' | 'text' | 'date'
  unit?: string
  min?: number
  max?: number
  enumValues?: { value: string; name: string }[]
  readOnly: boolean
}

interface ServiceDefinition {
  identifier: string
  name: string
  description: string
  callType: 'sync' | 'async'
  inputParams: ParameterDefinition[]
  outputParams: ParameterDefinition[]
}

interface EventDefinition {
  identifier: string
  name: string
  eventType: 'info' | 'warn' | 'error'
  outputParams: ParameterDefinition[]
}
```

### 2. 数据采集

#### 实时数据

```typescript
interface DeviceData {
  id: number
  deviceKey: string
  productKey: string
  timestamp: number      // Unix时间戳（毫秒）
  properties: Record<string, any>
  quality: number        // 数据质量：0-正常，1-异常
}

// 订阅设备数据
interface Subscription {
  id: number
  deviceKey: string
  property: string
  callbackUrl: string
  status: 'active' | 'paused'
}
```

#### 历史数据

```typescript
// 查询历史数据
GET /api/iot/data/history
Query: {
  deviceKey: string
  startTime: number
  endTime: number
  properties?: string    // 逗号分隔的属性列表
  interval?: number      // 聚合间隔（秒）
  aggregate?: 'raw' | 'avg' | 'max' | 'min' | 'sum'
}

Response: {
  timestamps: number[]
  data: {
    [property: string]: any[]
  }
}
```

### 3. 远程控制

#### 设备服务调用

```typescript
interface ServiceCall {
  id: number
  deviceKey: string
  serviceId: string
  inputParams: Record<string, any>
  status: 'pending' | 'success' | 'failed' | 'timeout'
  outputParams?: Record<string, any>
  error?: string
  createdAt: Date
  completedAt?: Date
}

// 调用设备服务
POST /api/iot/devices/:deviceKey/services/:serviceId/invoke
Body: {
  inputParams: Record<string, any>
  timeout?: number  // 超时时间（秒）
}
```

#### 设备属性设置

```typescript
// 设置设备属性
POST /api/iot/devices/:deviceKey/properties
Body: {
  properties: Record<string, any>
}
```

### 4. 规则引擎

#### 数据转发规则

```typescript
interface Rule {
  id: number
  name: string
  status: 'enabled' | 'disabled'
  condition: RuleCondition
  actions: RuleAction[]
}

interface RuleCondition {
  deviceKey?: string      // 设备过滤
  property?: string       // 属性过滤
  operator: string        // >, <, =, >=, <=, !=
  value: any
}

interface RuleAction {
  type: 'kafka' | 'mqtt' | 'http' | 'database' | 'device'
  config: Record<string, any>
}
```

#### 告警规则

```typescript
interface AlarmRule {
  id: number
  name: string
  status: 'enabled' | 'disabled'
  deviceKey?: string
  property: string
  condition: {
    operator: string
    threshold: number
    duration: number  // 持续时间（秒）
  }
  alarmLevel: 'info' | 'warn' | 'error' | 'critical'
  notificationMethods: ('email' | 'sms' | 'push' | 'webhook')[]
  recoveryRule?: {
    operator: string
    threshold: number
  }
}
```

## 技术实现

### 支持的协议

#### MQTT

```typescript
// MQTT连接配置
interface MqttConfig {
  host: string
  port: number
  username?: string
  password?: string
  clientId?: string
  qos?: 0 | 1 | 2
  retain?: boolean
  topics: {
    data: '/sys/{productKey}/{deviceKey}/thing/event/property/post'  // 上报数据
    command: '/sys/{productKey}/{deviceKey}/thing/service/property/set'  // 下发命令
    reply: '/sys/{productKey}/{deviceKey}/thing/service/property/set_reply'  // 命令响应
  }
}
```

#### HTTP

```typescript
// HTTP接口定义
interface HttpApi {
  method: 'GET' | 'POST'
  path: string
  description: string
  parameters: HttpParameter[]
}

// 设备认证
POST /api/iot/auth
Body: {
  productKey: string
  deviceKey: string
  signature: string
  timestamp: number
}
```

### 关键接口

```typescript
// 设备列表
GET /api/iot/devices
Query: { productKey, status, online, page, size }

// 设备详情
GET /api/iot/devices/:deviceKey

// 注册设备
POST /api/iot/devices
Body: {
  productKey: string
  deviceName: string
  deviceKey?: string
  tags?: DeviceTag[]
}

// 删除设备
DELETE /api/iot/devices/:deviceKey

// 实时数据
GET /api/iot/devices/:deviceKey/properties/latest

// 历史数据
GET /api/iot/devices/:deviceKey/properties/history

// 调用服务
POST /api/iot/devices/:deviceKey/services/:serviceId/invoke

// 设备日志
GET /api/iot/devices/:deviceKey/logs
Query: { startTime, endTime, page, size }

// 固件升级
POST /api/iot/devices/:deviceKey/ota/upgrade
Body: {
  firmwareId: number
}
```

## 配置说明

### 产品配置

```yaml
# 传感器产品
product:
  name: 温湿度传感器
  category: sensor
  data_format: json
  protocols:
    - mqtt
  properties:
    - identifier: temperature
      name: 温度
      data_type: float
      unit: ℃
      min: -40
      max: 80
      read_only: true
    - identifier: humidity
      name: 湿度
      data_type: float
      unit: %
      min: 0
      max: 100
      read_only: true
  events:
    - identifier: temperature_high
      name: 温度告警
      event_type: warn
      output_params:
        - identifier: temperature
          data_type: float
        - identifier: threshold
          data_type: float
```

### 告警配置

```yaml
alarm_rules:
  - name: 温度过高告警
    property: temperature
    condition:
      operator: '>'
      threshold: 35
      duration: 300  # 持续5分钟
    alarm_level: warn
    notification_methods:
      - email
      - push
    recovery_rule:
      operator: '<='
      threshold: 30
```

### 数据存储配置

```yaml
data_storage:
  # 实时数据存储
  realtime:
    enabled: true
    retention: 7  # 保留7天

  # 历史数据存储
  history:
    enabled: true
    retention: 365  # 保留365天
    aggregation:
      - interval: 60     # 1分钟聚合
        retention: 30    # 保留30天
      - interval: 3600   # 1小时聚合
        retention: 365   # 保留365天
      - interval: 86400  # 1天聚合
        retention: 3650  # 保留10年
```

## 使用场景

### 智能家居

- 温湿度监测
- 灯光控制
- 空调控制
- 门锁管理
- 安防监控

### 工业物联网

- 设备状态监控
- 生产数据采集
- 能耗管理
- 预测性维护
- 远程诊断

### 智慧农业

- 土壤监测
- 气象监测
- 灌溉控制
- 温室管理
- 作物生长监控

### 智慧城市

- 环境监测
- 交通管理
- 路灯控制
- 垃圾管理
- 停车管理

## 快速开始

### 1. 创建产品

```bash
# 进入产品管理
IoT > 产品管理 > 新建产品

# 填写产品信息
- 产品名称
- 产品类型
- 数据格式
- 支持协议

# 定义产品功能
- 定义属性
- 定义服务
- 定义事件
```

### 2. 注册设备

```bash
# 进入设备管理
IoT > 设备管理 > 新建设备

# 选择产品
从产品列表中选择设备所属产品

# 填写设备信息
- 设备名称
- 设备密钥（自动生成）
- 设备标签
```

### 3. 设备接入

```bash
# MQTT接入
const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://your-mqtt-server', {
  username: productKey,
  password: deviceKey
})

// 连接成功
client.on('connect', () => {
  console.log('Device connected')

  // 上报数据
  const data = {
    id: Date.now(),
    params: {
      temperature: 25.5,
      humidity: 60.3
    },
    method: 'thing.event.property.post'
  }
  const topic = `/sys/${productKey}/${deviceKey}/thing/event/property/post`
  client.publish(topic, JSON.stringify(data))
})

// 接收指令
const topic = `/sys/${productKey}/${deviceKey}/thing/service/property/set`
client.subscribe(topic)
client.on('message', (topic, message) => {
  const command = JSON.parse(message.toString())
  console.log('Received command:', command)
})
```

### 4. 查看数据

```bash
# 实时数据
IoT > 设备管理 > 设备列表 > 点击设备 > 实时数据

# 历史数据
IoT > 数据分析 > 历史数据查询

# 数据曲线
IoT > 数据分析 > 数据可视化
```

## 最佳实践

1. **设备命名**: 设备Key使用有意义的命名规则，便于识别
2. **数据质量**: 建立数据质量检查机制，及时发现异常数据
3. **协议选择**: 根据网络环境选择合适的通信协议
4. **安全认证**: 使用设备认证机制，确保设备安全接入
5. **告警设置**: 合理设置告警规则，及时发现问题

## 扩展功能

### 高级功能

- 设备影子
- 边缘计算
- 设备分组
- 设备拓扑
- 数字孪生
- OTA升级
- 设备诊断

### 集成功能

- 大数据分析
- AI预测
- 可视化大屏
- 移动端APP
- 第三方平台对接
