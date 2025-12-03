import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarContainer } from './Calendar.styled'

const Calendar = () => {
  const handleDateClick = (arg) => {
    alert('클릭한 날짜: ' + arg.dateStr)
  }

  return (
    <CalendarContainer>
      
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        selectable={true}
        selectMirror={true}
        events={[
          { title: '회의', date: '2025-12-28' },
          { title: '프로젝트 마감', date: '2025-12-30' }
        ]}
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