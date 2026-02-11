# 互联网医院

## 概述

互联网医院提供在线问诊、电子处方、预约挂号、健康档案、远程会诊等智慧医疗解决方案，实现医疗服务的数字化转型。

## 核心功能

### 在线问诊

- 图文问诊
- 视频问诊
- 电话问诊
- 急诊问诊
- 专家问诊

### 预约挂号

- 科室预约
- 医生预约
- 时段选择
- 号源管理
- 预约提醒

### 电子处方

- 处方开具
- 处方审核
- 处方流转
- 药品配送
- 用药指导

### 健康档案

- 健康记录
- 体检报告
- 诊断记录
- 用药记录
- 健康评估

## 功能特性

### 1. 在线问诊

#### 问诊订单

```typescript
interface ConsultationOrder {
  id: number
  orderNo: string
  userId: number
  userName: string
  doctorId: number
  doctorName: string
  departmentId: number
  departmentName: string
  type: 'text' | 'video' | 'phone'
  status: ConsultationStatus
  complaint: string       // 主诉
  description: string    // 详细描述
  attachments: string[]   // 附件图片
  symptoms: string[]      // 症状标签
  duration?: number       // 病程（天）
  price: number
  paid: boolean
  startTime?: Date
  endTime?: Date
  diagnosis?: string      // 诊断结果
  prescription?: string   // 处方
  advice?: string         // 医嘱
  rating?: number         // 评分
  comment?: string        // 评价
  createdAt: Date
}

type ConsultationStatus =
  | 'pending'        // 待接诊
  | 'consulting'     // 问诊中
  | 'completed'      // 已完成
  | 'cancelled'      // 已取消
  | 'refunded'       // 已退款
```

#### 问诊流程

```
用户下单 → 医生接诊 → 在线沟通 → 开具处方 → 问诊结束 → 用户评价
```

### 2. 预约挂号

#### 预约订单

```typescript
interface AppointmentOrder {
  id: number
  orderNo: string
  userId: number
  userName: string
  phone: string
  idCard: string
  hospitalId: number
  hospitalName: string
  departmentId: number
  departmentName: string
  doctorId: number
  doctorName: string
  doctorTitle: string
  scheduleDate: Date
  timeSlot: string       // 时段：09:00-10:00
  sourceId: number        // 号源ID
  status: AppointmentStatus
  price: number
  paid: boolean
  patientInfo: {
    name: string
    gender: 'male' | 'female'
    age: number
    idCard: string
    phone: string
  }
  checkIn?: boolean      // 是否签到
  checkInTime?: Date
  createdAt: Date
}

type AppointmentStatus =
  | 'pending'        // 待支付
  | 'confirmed'      // 已预约
  | 'checked_in'     // 已签到
  | 'completed'      // 已完成
  | 'cancelled'      // 已取消
  | 'no_show'        // 未到诊
```

#### 排班管理

```typescript
interface DoctorSchedule {
  id: number
  doctorId: number
  date: Date
  timeSlot: string
  totalSources: number     // 总号源
  usedSources: number      // 已用号源
  availableSources: number // 可用号源
  status: 'available' | 'full' | 'unavailable'
  location: string        // 诊室位置
}

// 批量排班
interface BatchSchedule {
  doctorId: number
  departmentId: number
  startDate: Date
  endDate: Date
  weekdays: number[]       // 0-6，周日到周六
  timeSlots: string[]      // 时段列表
  sourcePerSlot: number    // 每时段号源数
  location: string
}
```

### 3. 电子处方

#### 处方信息

```typescript
interface Prescription {
  id: number
  prescriptionNo: string
  orderNo: string          // 关联问诊单
  hospitalId: number
  hospitalName: string
  departmentId: number
  departmentName: string
  doctorId: number
  doctorName: string
  patientId: number
  patientName: string
  diagnosis: string
  type: 'western' | 'chinese'  // 西药/中药
  status: PrescriptionStatus
  drugs: PrescriptionDrug[]
  totalPrice: number
  auditDoctorId?: number
  auditDoctorName?: string
  auditTime?: Date
  auditRemark?: string
  createdAt: Date
}

type PrescriptionStatus =
  | 'draft'          // 草稿
  | 'pending_audit'  // 待审核
  | 'approved'       // 已审核
  | 'rejected'        // 已驳回
  | 'dispensed'      // 已发药

interface PrescriptionDrug {
  drugId: number
  drugName: string
  spec: string        // 规格
  manufacturer: string // 厂家
  quantity: number    // 数量
  unit: string        // 单位
  price: number
  amount: number
  dosage: string      // 用法用量
  frequency: string   // 用药频次
  days: number        // 用药天数
}
```

#### 药品管理

```typescript
interface Drug {
  id: number
  drugCode: string
  drugName: string
  genericName?: string   // 通用名
  type: 'western' | 'chinese'
  category: string       // 药品分类
  spec: string
  manufacturer: string
  approvalNumber: string // 批准文号
  barcode?: string
  price: number
  stock: number
  unit: string
  storage?: string       // 储存条件
  indications?: string   // 适应症
  contraindications?: string // 禁忌症
  dosage?: string        // 用法用量
  status: 'active' | 'inactive'
}
```

### 4. 健康档案

#### 健康记录

```typescript
interface HealthRecord {
  id: number
  userId: number
  userName: string
  type: RecordType
  recordDate: Date
  hospitalId?: number
  hospitalName?: string
  departmentId?: number
  departmentName?: string
  doctorId?: number
  doctorName?: string
  diagnosis?: string
  content: Record<string, any>
  attachments: string[]
  createdAt: Date
}

type RecordType =
  | 'visit'          // 就诊记录
  | 'prescription'   // 处方记录
  | 'examination'    // 检查报告
  | 'test'           // 检验报告
  | 'surgery'        // 手术记录
  | 'vaccination'    // 疫苗接种
  | 'checkup'        // 体检报告
```

#### 健康数据

```typescript
interface HealthData {
  id: number
  userId: number
  type: HealthDataType
  value: number
  unit: string
  measureTime: Date
  device?: string      // 测量设备
  source: 'manual' | 'device' | 'platform'
  remark?: string
}

type HealthDataType =
  | 'blood_pressure_systolic'   // 收缩压
  | 'blood_pressure_diastolic'  // 舒张压
  | 'heart_rate'                // 心率
  | 'blood_sugar'               // 血糖
  | 'temperature'               // 体温
  | 'weight'                    // 体重
  | 'height'                    // 身高
  | 'bmi'                       // BMI
  | 'blood_oxygen'              // 血氧
```

### 5. 远程会诊

#### 会诊申请

```typescript
interface ConsultationRequest {
  id: number
  requestNo: string
  patientId: number
  patientName: string
  requestingDoctorId: number
  requestingDoctorName: string
  requestingHospitalId: number
  requestingHospitalName: string
  requestedDoctorId: number
  requestedDoctorName: string
  requestedHospitalId: number
  requestedHospitalName: string
  type: 'video' | 'phone'
  status: RequestStatus
  reason: string           // 会诊原因
  patientInfo: {
    diagnosis: string
    history: string
    examination: string
    treatment: string
  }
  attachments: string[]
  scheduledTime?: Date
  duration?: number        // 会诊时长
  conclusion?: string      // 会诊结论
  advice?: string          // 建议
  createdAt: Date
}

type RequestStatus =
  | 'pending'        // 待确认
  | 'confirmed'      // 已确认
  | 'in_progress'    // 进行中
  | 'completed'      // 已完成
  | 'cancelled'      // 已取消
  | 'rejected'       // 已拒绝
```

## 技术实现

### 关键接口

```typescript
// 获取科室列表
GET /api/hospital/departments
Query: { hospitalId, level, page, size }

// 获取医生列表
GET /api/hospital/doctors
Query: { departmentId, keyword, page, size }

// 获取排班信息
GET /api/hospital/schedules
Query: { doctorId, date, startDate, endDate }

// 预约挂号
POST /api/hospital/appointments
Body: {
  scheduleId: number
  patientInfo: PatientInfo
}

// 在线问诊
POST /api/hospital/consultations
Body: {
  type: 'text' | 'video' | 'phone'
  doctorId: number
  complaint: string
  description: string
  attachments: string[]
}

// 发送消息（图文问诊）
POST /api/hospital/consultations/:id/messages
Body: {
  content: string
  type: 'text' | 'image'
  file?: File
}

// 开具处方
POST /api/hospital/prescriptions
Body: {
  orderNo: string
  diagnosis: string
  type: 'western' | 'chinese'
  drugs: PrescriptionDrug[]
}

// 处方审核
POST /api/hospital/prescriptions/:id/audit
Body: {
  approved: boolean
  remark?: string
}

// 查询健康档案
GET /api/hospital/health-records
Query: { userId, type, startDate, endDate, page, size }

// 远程会诊申请
POST /api/hospital/remote-consultations
Body: ConsultationRequest
```

### 视频问诊

使用 WebRTC 实现视频通话：

```typescript
// 初始化视频通话
import { Janus } from 'janus-gateway'

const janus = new Janus({
  server: 'wss://your-janus-server',
  success: () => {
    janus.attach({
      plugin: 'janus.plugin.videoroom',
      success: (pluginHandle) => {
        const body = {
          request: 'join',
          room: consultationOrderId,
          ptype: 'publisher',
          display: userName
        }
        pluginHandle.send({ message: body })
      }
    })
  }
})
```

## 配置说明

### 医院配置

```yaml
hospital:
  id: 1
  name: 示例互联网医院
  address: 北京市朝阳区
  phone: 010-12345678
  description: 专业的互联网医疗服务平台
  features:
    - online_consultation
    - appointment
    - prescription
    - health_record
  departments:
    - id: 1
      name: 内科
      parent_id: null
    - id: 2
      name: 外科
      parent_id: null
    - id: 3
      name: 儿科
      parent_id: null
```

### 问诊价格配置

```yaml
consultation_prices:
  text:
    - level: resident
      name: 住院医师
      price: 19.9
    - level: attending
      name: 主治医师
      price: 39.9
    - level: chief
      name: 主任医师
      price: 99.9

  video:
    - level: resident
      name: 住院医师
      price: 29.9
    - level: attending
      name: 主治医师
      price: 59.9
    - level: chief
      name: 主任医师
      price: 129.9
```

### 处方规则

```yaml
prescription_rules:
  max_days: 30              // 最多开药天数
  max_drugs: 20             // 每张处方最多药品数
  require_audit: true       // 必须审核
  audit_type: 'pharmacist'  // 审核人类型

  control_drugs:            // 精神药品管制
    max_days: 7
    require_special_audit: true
```

## 使用场景

### 慢性病管理

- 定期复诊
- 用药提醒
- 健康监测
- 生活指导

### 常见病咨询

- 快速问诊
- 在线开方
- 药品配送
- 康复指导

### 专家会诊

- 远程会诊
- 多科室协作
- 病例讨论
- 治疗方案

### 健康体检

- 体检预约
- 报告查询
- 结果解读
- 健康建议

## 快速开始

### 1. 用户注册

```bash
# 进入注册页面
填写手机号、验证码、密码

# 实名认证
上传身份证照片，完成实名认证

# 绑定医保卡
输入医保卡号，绑定医保卡（可选）
```

### 2. 预约挂号

```bash
# 选择科室
首页 > 预约挂号 > 选择科室

# 选择医生
选择医生，查看医生简介、排班信息

# 选择时段
选择日期和时段，查看号源情况

# 填写信息
填写就诊人信息、症状描述

# 支付预约
支付挂号费，完成预约

# 按时就诊
收到预约提醒，按时到院就诊
```

### 3. 在线问诊

```bash
# 选择问诊类型
首页 > 在线问诊 > 选择图文/视频/电话

# 选择医生
选择科室和医生

# 描述病情
填写主诉、详细描述、上传相关图片

# 支付问诊
支付问诊费用，等待医生接诊

# 在线沟通
图文问诊：发送文字、图片
视频问诊：视频通话
电话问诊：电话呼叫

# 查看诊断
问诊结束，查看诊断结果和医嘱
```

### 4. 处方购药

```bash
# 查看处方
问诊结束，查看电子处方

# 审核处方
药师审核处方

# 选择配送方式
- 到院取药
- 配送上门

# 支付药费
支付药品费用

- 到院取药：到院扫码取药
- 配送上门：等待配送
```

## 最佳实践

1. **病情描述**: 详细描述病情，提供完整信息
2. **资料准备**: 提前准备好检查报告、既往病历
3. **问诊时间**: 选择合适时间，确保网络稳定
4. **用药规范**: 严格按医嘱用药，不自行停药
5. **隐私保护**: 保护个人隐私，不要在公共场合问诊

## 扩展功能

### 高级功能

- AI辅助诊断
- 智能导诊
- 健康评估
- 慢病管理
- 用药提醒
- 康复指导
- 心理咨询
- 营养咨询

### 集成功能

- 医保支付
- 商业保险
- 第三方检验
- 第三方影像
- 用药指导
- 电子签名
