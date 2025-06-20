import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale'

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    weekStart: 1,
})

export default function Calendar() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DemoContainer
        components={[
          'StaticDatePicker',
        ]}
      >
        <DemoItem>
          <StaticDatePicker defaultValue={dayjs(Date())} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
