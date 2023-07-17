import { useState } from "react";
import { Label } from "@ui/label";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import moment from "moment";
import { type DateValue } from "react-aria";
import { useDatePickerState } from "react-stately";
import { RRule } from "rrule";

import { api } from "~/utils/api";
import { columns } from "~/components/Apps/KodixCare/columns";
import CreateEventDialogButton from "~/components/Apps/KodixCare/CreateEventDialogButton";
import { DataTable } from "~/components/Apps/KodixCare/data-table";
import RecurrencePicker from "~/components/Apps/KodixCare/RecurrencePicker";
import { DateTimePicker } from "~/components/date-time-picker/date-time-picker";
import { TimeField } from "~/components/date-time-picker/time-field";
import { TimePicker } from "~/components/date-time-picker/time-picker";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { cn } from "~/components/ui/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { H1 } from "~/components/ui/typography";

export default function KodixCare() {
  //date Start should be the beginninig of the day
  //date End should be the end of the day

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(
    moment().startOf("day").toDate(),
  );

  const result = api.event.getAll.useQuery(
    {
      dateStart: moment(selectedDay).startOf("day").toDate(),
      dateEnd: moment(selectedDay).endOf("day").toDate(),
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      <H1>Kodix Care</H1>
      <Separator className="my-4" />
      <CreateEventDialogButton />
      <DataTable
        columns={columns}
        data={result.data ?? []}
        selectedDate={selectedDay}
        setSelectedDate={setSelectedDay}
        isLoading={result.isFetching || result.isRefetching}
      />
    </>
  );
}
