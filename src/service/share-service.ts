

class ShareService {
    calculateNearestPreviousWeekday(date: { getDay: () => number; setDate: (arg0: number) => void; getDate: () => number; }) {
        const dayOfWeek = date.getDay();
        
        // Если текущий день - выходной, уменьшаем дату на 1 день
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          date.setDate(date.getDate() - 1);
        }
        
        // Пока день недели равен 0 (воскресенье) или 6 (суббота), уменьшаем дату на 1 день
        while (date.getDay() === 0 || date.getDay() === 6) {
          date.setDate(date.getDate() - 1);
        }
        
        return date;
      }
      

      addDays(date: Date, days: number) {
        date.setDate(date.getDate() + days);
        return date;
        }

}

export const shareService = new ShareService(); 