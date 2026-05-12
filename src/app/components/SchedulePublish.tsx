import { Calendar, Clock, Repeat, Zap, Check } from 'lucide-react';
import { useState } from 'react';

interface SchedulePublishProps {
  onSchedule: (settings: any) => void;
  onClose: () => void;
}

export function SchedulePublish({ onSchedule, onClose }: SchedulePublishProps) {
  const [publishType, setPublishType] = useState<'now' | 'scheduled' | 'recurring'>('scheduled');
  const [date, setDate] = useState('2026-05-15');
  const [time, setTime] = useState('10:00');
  const [recurringType, setRecurringType] = useState('weekly');
  const [platforms, setPlatforms] = useState({
    wordpress: true,
    facebook: false,
    twitter: false,
    linkedin: false,
  });

  const handleSubmit = () => {
    const settings = {
      type: publishType,
      date,
      time,
      recurringType: publishType === 'recurring' ? recurringType : null,
      platforms,
    };
    onSchedule(settings);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-8">
        <h2 className="mb-6">排程發布設定</h2>

        <div className="space-y-6">
          {/* 發布類型 */}
          <div>
            <label className="block mb-3">發布方式</label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <button
                onClick={() => setPublishType('now')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  publishType === 'now'
                    ? 'border-brand-deep bg-slate-50'
                    : 'border-border hover:border-slate-300'
                }`}
              >
                <Zap className={`w-6 h-6 mb-2 ${publishType === 'now' ? 'text-brand-link' : 'text-muted-foreground'}`} />
                <h4 className="mb-1">立即發布</h4>
                <p className="text-sm text-muted-foreground">馬上發布文章</p>
              </button>

              <button
                onClick={() => setPublishType('scheduled')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  publishType === 'scheduled'
                    ? 'border-brand-deep bg-slate-50'
                    : 'border-border hover:border-slate-300'
                }`}
              >
                <Clock className={`w-6 h-6 mb-2 ${publishType === 'scheduled' ? 'text-brand-link' : 'text-muted-foreground'}`} />
                <h4 className="mb-1">排程發布</h4>
                <p className="text-sm text-muted-foreground">指定時間發布</p>
              </button>

              <button
                onClick={() => setPublishType('recurring')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  publishType === 'recurring'
                    ? 'border-brand-deep bg-slate-50'
                    : 'border-border hover:border-slate-300'
                }`}
              >
                <Repeat className={`w-6 h-6 mb-2 ${publishType === 'recurring' ? 'text-brand-link' : 'text-muted-foreground'}`} />
                <h4 className="mb-1">定期發布</h4>
                <p className="text-sm text-muted-foreground">重複排程</p>
              </button>
            </div>
          </div>

          {/* 日期時間設定 */}
          {publishType !== 'now' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block mb-2">發布日期</label>
                <div className="relative">
                  <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-input-background rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">發布時間</label>
                <div className="relative">
                  <Clock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-input-background rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 定期發布設定 */}
          {publishType === 'recurring' && (
            <div>
              <label className="block mb-2">重複頻率</label>
              <select
                value={recurringType}
                onChange={(e) => setRecurringType(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg"
              >
                <option value="daily">每天</option>
                <option value="weekly">每週</option>
                <option value="biweekly">每兩週</option>
                <option value="monthly">每月</option>
              </select>
            </div>
          )}

          {/* 發布平台 */}
          <div>
            <label className="block mb-3">發布到</label>
            <div className="space-y-3">
              {[
                { id: 'wordpress', label: 'WordPress', description: '自動發布到您的 WordPress 網站', available: true },
                { id: 'facebook', label: 'Facebook', description: '同步發布到 Facebook 粉絲專頁', available: false },
                { id: 'twitter', label: 'Twitter / X', description: '發布摘要到 Twitter', available: false },
                { id: 'linkedin', label: 'LinkedIn', description: '分享到 LinkedIn', available: false },
              ].map((platform) => (
                <label
                  key={platform.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    platforms[platform.id as keyof typeof platforms]
                      ? 'border-brand-deep bg-slate-50'
                      : 'border-border hover:border-slate-300'
                  } ${!platform.available ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={platforms[platform.id as keyof typeof platforms]}
                      onChange={(e) => setPlatforms({ ...platforms, [platform.id]: e.target.checked })}
                      disabled={!platform.available}
                      className="w-5 h-5 rounded"
                    />
                    <div>
                      <h4 className="mb-0.5 flex items-center gap-2">
                        {platform.label}
                        {!platform.available && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                            即將推出
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{platform.description}</p>
                    </div>
                  </div>
                  {platforms[platform.id as keyof typeof platforms] && platform.available && (
                    <Check className="w-5 h-5 text-brand-link" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* 預覽 */}
          <div className="bg-gradient-to-br from-brand-soft-from to-brand-soft-to border border-slate-200 rounded-xl p-6">
            <h4 className="mb-3">排程預覽</h4>
            <div className="space-y-2 text-sm">
              {publishType === 'now' && (
                <p className="text-muted-foreground">✓ 文章將立即發布</p>
              )}
              {publishType === 'scheduled' && (
                <>
                  <p className="text-muted-foreground">✓ 文章將於 <strong>{date} {time}</strong> 自動發布</p>
                  <p className="text-muted-foreground">✓ 發布到：WordPress</p>
                </>
              )}
              {publishType === 'recurring' && (
                <>
                  <p className="text-muted-foreground">✓ 首次發布：<strong>{date} {time}</strong></p>
                  <p className="text-muted-foreground">
                    ✓ 重複頻率：
                    {recurringType === 'daily' && '每天'}
                    {recurringType === 'weekly' && '每週'}
                    {recurringType === 'biweekly' && '每兩週'}
                    {recurringType === 'monthly' && '每月'}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 按鈕 */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white border-2 border-border rounded-xl hover:border-brand-deep transition-all"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-3 px-6 hover:from-brand-deep hover:to-brand-strong transition-all"
            >
              {publishType === 'now' ? '立即發布' : '確認排程'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
