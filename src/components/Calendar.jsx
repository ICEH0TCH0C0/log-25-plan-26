import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarContainer } from './Calendar.styled'
import { useNavigate, useParams } from 'react-router-dom';

const Calendar = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const handleDateClick = (arg) => {
    nav(`/main/${id}/${arg.dateStr}`);
  }

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        selectable={true}
        selectMirror={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        dateClick={handleDateClick}
      />
    </CalendarContainer>
  )
}

export default Calendar