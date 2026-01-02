import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarContainer } from './Calendar.styled'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { useMemo } from 'react';

const Calendar = () => {
  const nav = useNavigate();
  const { currentUser } = useUserStore();

  const handleDateClick = (arg) => {
    // currentUser.id를 사용하여 URL을 생성합니다.
    if (currentUser) {
      nav(`/main/${currentUser.userNo}/${arg.dateStr}`);
    }
  }

  // currentUser.userPlan이 변경될 때만 events 배열을 다시 계산합니다.
  const events = useMemo(() => {
    return currentUser?.userPlan?.map(plan => ({
      title: plan.planTitle, // 일정의 제목을 달력에 표시
      date: plan.date,
      id: plan.planNo.toString() // id는 문자열로 전달하는 것이 안전합니다.
    })) || [];
  }, [currentUser]);

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        selectable={true}
        selectMirror={true}
        dayMaxEventRows={3}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        dateClick={handleDateClick}
        events={events}
      />
    </CalendarContainer>
  )
}

export default Calendar