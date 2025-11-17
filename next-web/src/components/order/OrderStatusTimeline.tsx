'use client';

interface OrderStatusTimelineProps {
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderStatusTimeline({ status, createdAt, updatedAt }: OrderStatusTimelineProps) {
  const statuses = [
    { key: 'pending', label: 'รอดำเนินการ', icon: 'fa-clock' },
    { key: 'confirmed', label: 'ยืนยันคำสั่งซื้อ', icon: 'fa-check-circle' },
    { key: 'processing', label: 'กำลังจัดเตรียม', icon: 'fa-box' },
    { key: 'shipped', label: 'จัดส่งแล้ว', icon: 'fa-truck' },
    { key: 'delivered', label: 'ส่งสำเร็จ', icon: 'fa-check-double' },
  ];

  const statusIndex = statuses.findIndex(s => s.key === status);
  const currentIndex = statusIndex >= 0 ? statusIndex : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-dark-color mb-6 thai-text">
        สถานะการจัดส่ง
      </h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <div 
          className="absolute left-6 top-0 w-0.5 bg-primary-color transition-all duration-500"
          style={{ height: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
        ></div>

        {/* Timeline items */}
        <div className="space-y-8">
          {statuses.map((item, index) => {
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;
            const isCancelled = status === 'cancelled';

            return (
              <div key={item.key} className="relative flex items-start gap-4">
                {/* Icon */}
                <div 
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    isActive && !isCancelled
                      ? 'bg-primary-color border-primary-color text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-primary-color ring-opacity-20' : ''}`}
                >
                  <i className={`fa-solid ${item.icon} text-lg`}></i>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className={`font-semibold thai-text ${
                    isActive && !isCancelled ? 'text-dark-color' : 'text-gray-400'
                  }`}>
                    {item.label}
                  </div>
                  {isCurrent && !isCancelled && (
                    <div className="text-sm text-gray-500 mt-1 thai-text">
                      {new Date(updatedAt).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Cancelled status */}
          {status === 'cancelled' && (
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 bg-red-500 border-red-500 text-white">
                <i className="fa-solid fa-times text-lg"></i>
              </div>
              <div className="flex-1 pt-2">
                <div className="font-semibold text-red-600 thai-text">
                  ยกเลิกคำสั่งซื้อ
                </div>
                <div className="text-sm text-gray-500 mt-1 thai-text">
                  {new Date(updatedAt).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order dates */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600 space-y-1 thai-text">
        <div>
          <span className="font-medium">วันที่สั่งซื้อ:</span>{' '}
          {new Date(createdAt).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
        <div>
          <span className="font-medium">อัพเดทล่าสุด:</span>{' '}
          {new Date(updatedAt).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}
