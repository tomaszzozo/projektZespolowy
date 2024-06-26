import Header from "../../../components/Header/Header";
import Title from "../../../components/Title/Title";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EmployeeBottomNavigation from "../EmployeeBottomNavigation/EmployeeBottomNavigation";
import { useBlocker, useNavigate, useSearchParams } from "react-router-dom";
import { MobileDatePicker } from "@mui/x-date-pickers";
import {
  Button,
  Fab,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import { useCookies } from "react-cookie";
import FullscreenProgress from "../../../components/FullscreenProgress/FullscreenProgress";
import validateToken from "../../../functions/ValidateToken";

interface Report {
  settlementDate: Date | null;
  workHours: number;
  hourlyRate: number;
  transfer: number;
  l4Days: number;
  l4DailyRate: number;
  daysTaken: number;
  daysUnpaid: number;
  daysOnDemand: number;
  daysOccasional: number;
  timeOffDailyRate: number;
  overtimeHourlyRate: number;
  overtimeHours: number;
  extraPay: number;
  cashAdvance: number;
  loanTaken: number;
  loanReturned: number;
  additionalCosts: number;
  additionalCostsDescription: string;
  otherCosts: number;
  otherCostsDescription: string;
  tax26yearsOld: number;
}

export default function EmployeeReports() {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const [savedState, setSavedState] = useState<Report>({
    settlementDate: null,
    workHours: 0,
    hourlyRate: 0,
    transfer: 0,
    l4Days: 0,
    l4DailyRate: 0,
    daysTaken: 0,
    daysUnpaid: 0,
    daysOnDemand: 0,
    daysOccasional: 0,
    timeOffDailyRate: 0,
    overtimeHourlyRate: 0,
    overtimeHours: 0,
    extraPay: 0,
    cashAdvance: 0,
    loanTaken: 0,
    loanReturned: 0,
    additionalCosts: 0,
    additionalCostsDescription: "",
    otherCosts: 0,
    otherCostsDescription: "",
    tax26yearsOld: 0,
  });
  const [extraPay, setExtraPay] = useState(savedState.extraPay.toString());
  const [cashAdvance, setCashAdvance] = useState(
    savedState.cashAdvance.toString(),
  );
  const [loanTaken, setLoanTaken] = useState(savedState.loanTaken.toString());
  const [loanReturned, setLoanReturned] = useState(
    savedState.loanReturned.toString(),
  );
  const [additionalCosts, setAdditionalCosts] = useState(
    savedState.additionalCosts.toString(),
  );
  const [additionalCostsDescription, setAdditionalCostsDescription] = useState(
    savedState.additionalCostsDescription.toString(),
  );
  const [otherCosts, setOtherCosts] = useState(
    savedState.otherCosts.toString(),
  );
  const [otherCostsDescription, setOtherCostsDescription] = useState(
    savedState.otherCostsDescription.toString(),
  );
  const [tax26YearsOld, setTax26YearsOld] = useState(
    savedState.tax26yearsOld.toString(),
  );
  const [workHours, setWorkHours] = useState(savedState.workHours.toString());
  const [hourlyRate, setHourlyRate] = useState(
    savedState.hourlyRate.toString(),
  );
  const [transfer, setTransfer] = useState(savedState.transfer.toString());
  const [l4Days, setL4Days] = useState(savedState.l4Days.toString());
  const [l4DailyRate, setL4DailyRate] = useState(
    savedState.l4DailyRate.toString(),
  );
  const [savedDaysToTake, setSavedDaysToTake] = useState(0);
  const [daysToTake, setDaysToTake] = useState(savedDaysToTake.toString());
  const [daysTaken, setDaysTaken] = useState(savedState.daysTaken.toString());
  const [daysUnpaid, setDaysUnpaid] = useState(
    savedState.daysUnpaid.toString(),
  );
  const [daysOnDemand, setDaysOnDemand] = useState(
    savedState.daysOnDemand.toString(),
  );
  const [daysOccasional, setDaysOccasional] = useState(
    savedState.daysOccasional.toString(),
  );
  const [timeOffDailyRate, setTimeOffDailyRate] = useState(
    savedState.timeOffDailyRate.toString(),
  );
  const [overtimeHours, setOvertimeHours] = useState(
    savedState.overtimeHours.toString(),
  );
  const [overtimeHourlyRate, setOvertimeHourlyRate] = useState(
    savedState.overtimeHourlyRate.toString(),
  );
  const [settlementDate, setSettlementDate] = useState<dayjs.Dayjs | null>(
    savedState.settlementDate === null
      ? null
      : dayjs(savedState.settlementDate),
  );
  const [tab, setTab] = useState(0);
  const [savedNotes, setSavedNotes] = useState<string[]>([
    "mało robi",
    "wolno robi",
    "dużo chce",
  ]);
  const [notes, setNotes] = useState<string[]>(savedNotes);
  const [saveOverlay, setSaveOverlay] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [cookie, setCookie] = useCookies(["role"]);
  useEffect(
    () => {
      new Promise<void>((resolve) => {
        validateToken(cookie, navigate, setCookie, setWaiting);
        setWaiting(true);
        resolve();
      }).then(() => {
        fetch(
          `http://localhost:8080/report?userId=${parseInt(queryParameters.get("id")!)}&year=${parseInt(queryParameters.get("year")!)}&month=${parseInt(queryParameters.get("month")!)}`,
          {
            credentials: "include",
          },
        )
          .then((response) => {
            if (response.status !== 200) {
              if (response.status === 204) {
                return;
              }
              throw Error(
                "Token logowania przedawnił się lub wystąpił błąd serwera.",
              );
            }
            return response.text();
          })
          .then((text) => {
            if (text === undefined) return;
            const parsedResponse = JSON.parse(text);
            setSavedState({ ...parsedResponse });
            setExtraPay(parsedResponse.extraPay.toString());
            setCashAdvance(parsedResponse.cashAdvance.toString());
            setLoanTaken(parsedResponse.loanTaken.toString());
            setLoanReturned(parsedResponse.loanReturned.toString());
            setAdditionalCosts(parsedResponse.additionalCosts.toString());
            setAdditionalCostsDescription(
              parsedResponse.additionalCostsDescription,
            );
            setOtherCosts(parsedResponse.otherCosts.toString());
            setOtherCostsDescription(parsedResponse.otherCostsDescription);
            setTax26YearsOld(parsedResponse.tax26yearsOld.toString());
            setWorkHours(parsedResponse.workHours.toString());
            setHourlyRate(parsedResponse.hourlyRate.toString());
            setTransfer(parsedResponse.transfer.toString());
            setL4Days(parsedResponse.l4Days.toString());
            setL4DailyRate(parsedResponse.l4DailyRate.toString());
            setDaysUnpaid(parsedResponse.daysUnpaid.toString());
            setDaysTaken(parsedResponse.daysTaken.toString());
            setDaysOnDemand(parsedResponse.daysOnDemand.toString());
            setDaysOccasional(parsedResponse.daysOccasional.toString());
            setTimeOffDailyRate(parsedResponse.timeOffDailyRate.toString());
            setOvertimeHours(parsedResponse.overtimeHours.toString());
            setOvertimeHourlyRate(parsedResponse.overtimeHourlyRate.toString());
            setSettlementDate(
              parsedResponse.settlementDate === null
                ? null
                : dayjs(parsedResponse.settlementDate),
            );
            setSavedDaysToTake(parsedResponse.daysOffPerYear);
            setDaysToTake(parsedResponse.daysOffPerYear.toString());
            // setSavedComments(parsedResponse.);
            // setComments(parsedResponse.);
            setWaiting(false);
          })
          .catch((error) => {
            console.error(error);
            navigate("/signIn");
            return;
          });
      });
    },
    [], // eslint-disable-line
  );

  useEffect(() => {
    let activate;
    if (settlementDate === null || savedState.settlementDate === null) {
      activate = settlementDate !== null || savedState.settlementDate !== null;
    } else {
      activate = settlementDate.toString() !== dayjs(savedState.settlementDate).toString()
    }
    setButtonActive(
      detectStateChange(savedState.workHours, workHours) ||
        detectStateChange(savedState.hourlyRate, hourlyRate) ||
        detectStateChange(savedState.transfer, transfer) ||
        detectStateChange(savedState.l4Days, l4Days) ||
        detectStateChange(savedState.l4DailyRate, l4DailyRate) ||
        detectStateChange(savedDaysToTake, daysToTake) ||
        detectStateChange(savedState.daysTaken, daysTaken) ||
        detectStateChange(savedState.daysUnpaid, daysUnpaid) ||
        detectStateChange(savedState.daysOnDemand, daysOnDemand) ||
        detectStateChange(savedState.daysOccasional, daysOccasional) ||
        detectStateChange(savedState.timeOffDailyRate, timeOffDailyRate) ||
        detectStateChange(savedState.overtimeHours, overtimeHours) ||
        detectStateChange(savedState.overtimeHourlyRate, overtimeHourlyRate) ||
        detectStateChange(savedState.loanTaken, loanTaken) ||
        detectStateChange(savedState.loanReturned, loanReturned) ||
        detectStateChange(savedState.extraPay, extraPay) ||
        detectStateChange(savedState.cashAdvance, cashAdvance) ||
        detectStateChange(savedState.additionalCosts, additionalCosts) ||
        savedState.additionalCostsDescription !== additionalCostsDescription ||
        detectStateChange(savedState.otherCosts, otherCosts) ||
        savedState.otherCostsDescription !== otherCostsDescription ||
        detectStateChange(savedState.tax26yearsOld, tax26YearsOld) ||
        savedNotes.toString() !== notes.toString() || activate
    );
  }, [
    savedState,
    workHours,
    hourlyRate,
    transfer,
    l4Days,
    l4DailyRate,
    daysToTake,
    savedDaysToTake,
    daysTaken,
    daysUnpaid,
    daysOnDemand,
    daysOccasional,
    timeOffDailyRate,
    overtimeHours,
    overtimeHourlyRate,
    loanTaken,
    loanReturned,
    extraPay,
    cashAdvance,
    additionalCosts,
    additionalCostsDescription,
    otherCosts,
    otherCostsDescription,
    tax26YearsOld,
    notes,
    settlementDate,
  ]);

  let blocker = useBlocker(buttonActive);

  if (
    queryParameters.get("id") === null ||
    parseInt(queryParameters.get("id")!) <= 0
  ) {
    console.error(`id ${queryParameters.get("id")} is incorrect`);
    navigate("/personnel");
    return;
  }

  const id = parseInt(queryParameters.get("id")!);

  const paramsIncorrect = () => {
    const m = queryParameters.get("month");
    const y = queryParameters.get("year");

    return (
      m === null ||
      y === null ||
      Number.isNaN(parseInt(m)) ||
      Number.isNaN(parseInt(y)) ||
      parseInt(m) <= 0 ||
      parseInt(m) > 12 ||
      parseInt(y) < 2020 ||
      parseInt(y) > 2099
    );
  };

  const m = paramsIncorrect()
    ? new Date().getMonth()
    : parseInt(queryParameters.get("month")!);
  const y = paramsIncorrect()
    ? new Date().getFullYear()
    : parseInt(queryParameters.get("year")!);

  const date = dayjs(new Date(y, m - 1, 1));

  const calculateCosts = (): string => {
    return (
      parseFloat(calculateBasePension()) +
      parseFloat(calculateSickLeavePension()) +
      parseFloat(calculateNormalLeavePension()) +
      parseFloat(calculateOvertimeHours()) +
      parseFloat(extraPay) +
      parseFloat(additionalCosts) +
      parseFloat(tax26YearsOld)
    ).toFixed(2);
  };

  const calculateBasePension = (): string => {
    return (parseInt(workHours) * parseFloat(hourlyRate)).toFixed(2);
  };

  const calculateSickLeavePension = (): string => {
    return (parseInt(l4Days) * parseFloat(l4DailyRate)).toFixed(2);
  };

  const calculateNormalLeavePension = (): string => {
    return (
      (parseInt(daysTaken) +
        +parseInt(daysOccasional) +
        parseInt(daysOnDemand)) *
      parseFloat(timeOffDailyRate)
    ).toFixed(2);
  };

  const calculateOvertimeHours = (): string => {
    return (parseInt(overtimeHours) * parseFloat(overtimeHourlyRate)).toFixed(
      2,
    );
  };

  const calculateSalaryToPay = (): string => {
    return (
      parseFloat(calculateCosts()) -
      parseFloat(transfer) -
      parseFloat(loanReturned) -
      parseFloat(cashAdvance)
    ).toFixed(2);
  };

  if (waiting) {
    return <FullscreenProgress />;
  }

  return (
    <>
      <Header selectedPage={"personnel"} />
      <Title
        label="Tomasz Wojtkiewicz: rozliczenia"
        icon={<AssessmentIcon className="color-darker-white" />}
      />
      <div
        className={"d-flex justify-content-center my-4 " + styles.monthPicker}
      >
        <MobileDatePicker
          views={["year", "month"]}
          label={"Miesiąc"}
          value={date}
          onAccept={(newValue) => {
            if (newValue !== null) {
              navigate(
                `/personnel/report?id=${id}&year=${newValue.year()}&month=${newValue.month() + 1}`,
              );
              navigate(0);
            }
          }}
          minDate={dayjs(new Date(2020, 1, 1))}
        />
      </div>
      <div className={styles.tabsContainer}>
        <Tabs
          className={styles.tabs}
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable tabs"
        >
          <Tab label="Podstawa wypłaty" />
          <Tab label="L4" />
          <Tab label="Urlopy" />
          <Tab label="Nadgodziny" />
          <Tab label="Pożyczki" />
          <Tab label="Pozostałe" />
          <Tab label="Uwagi" />
          <Tab label="Podsumowanie" />
        </Tabs>
      </div>
      <div className={styles.contentContainer}>
        {tab === 0 && (
          <>
            <IntegerInput
              value={workHours}
              setter={setWorkHours}
              label={"Godziny"}
            />
            <DecimalInput
              value={hourlyRate}
              setter={setHourlyRate}
              label={"Stawka"}
              endAdornment={"zł/h"}
            />
            <ReadonlyInput
              label={"Razem"}
              endAdornment={"zł"}
              value={calculateBasePension()}
            />
            <DecimalInput
              value={transfer}
              setter={setTransfer}
              label={"Z czego przelano"}
              endAdornment={"zł"}
            />
          </>
        )}
        {tab === 1 && (
          <>
            <IntegerInput value={l4Days} setter={setL4Days} label={"Dni"} />
            <DecimalInput
              value={l4DailyRate}
              setter={setL4DailyRate}
              label={"Stawka"}
              endAdornment={"zł/dzień"}
            />
            <ReadonlyInput
              label={"Razem"}
              endAdornment={"zł"}
              value={calculateSickLeavePension()}
            />
          </>
        )}
        {tab === 2 && (
          <>
            <IntegerInput
              value={daysToTake}
              setter={setDaysToTake}
              label={`Przydział w ${y}`}
              endAdornment={"dni"}
            />
            <ReadonlyInput
              label={`Pozostało w ${y}`}
              endAdornment={"dni"}
              value={"0"}
            />
            <ReadonlyInput
              label={`Pozostało na żądanie w ${y}`}
              endAdornment={"dni"}
              value={"0"}
            />
            <IntegerInput
              value={daysTaken}
              setter={setDaysTaken}
              label={"Zwykły"}
              endAdornment={"dni"}
            />
            <IntegerInput
              value={daysUnpaid}
              setter={setDaysUnpaid}
              label={"Bezpłatny"}
              endAdornment={"dni"}
            />
            <IntegerInput
              value={daysOnDemand}
              setter={setDaysOnDemand}
              label={"Na żądanie"}
              endAdornment={"dni"}
            />
            <IntegerInput
              value={daysOccasional}
              setter={setDaysOccasional}
              label={"Okolicznościowy"}
              endAdornment={"dni"}
            />
            <DecimalInput
              value={timeOffDailyRate}
              setter={setTimeOffDailyRate}
              label={"Stawka"}
              endAdornment={"zł/dzień"}
            />
            <ReadonlyInput
              label={"Razem"}
              endAdornment={"zł"}
              value={calculateNormalLeavePension()}
            />
          </>
        )}
        {tab === 3 && (
          <>
            <IntegerInput
              value={overtimeHours}
              setter={setOvertimeHours}
              label={"Godziny"}
            />
            <DecimalInput
              value={overtimeHourlyRate}
              setter={setOvertimeHourlyRate}
              label={"Stawka"}
              endAdornment={"zł/h"}
            />
            <ReadonlyInput
              label={"Razem"}
              endAdornment={"zł"}
              value={calculateOvertimeHours()}
            />
          </>
        )}
        {tab === 4 && (
          <>
            <DecimalInput
              value={loanTaken}
              setter={setLoanTaken}
              label={"Pożyczono"}
              endAdornment={"zł"}
              helperText={"Kwota pożyczona pracownikowi w danym miesiącu"}
            />
            <DecimalInput
              value={loanReturned}
              setter={setLoanReturned}
              label={"Zwrócono"}
              endAdornment={"zł"}
              helperText={"Kwota potrącona z wypłaty na poczet pożyczek"}
            />
            <ReadonlyInput
              label={"Dług pracownika"}
              endAdornment={"zł"}
              value={"0"}
            />
          </>
        )}
        {tab === 5 && (
          <>
            <DecimalInput
              value={extraPay}
              setter={setExtraPay}
              label={"Premia"}
              endAdornment={"zł"}
            />

            <DecimalInput
              value={cashAdvance}
              setter={setCashAdvance}
              label={"Zaliczka"}
              endAdornment={"zł"}
              helperText={"Kwota wypłacona pracownikowi przed właściwą wypłatą"}
            />
            <DecimalInput
              value={additionalCosts}
              setter={setAdditionalCosts}
              label={"Koszty dodatkowe"}
              endAdornment={"zł"}
              helperText={"Dodatkowe koszty zatrudnienia (płaci firma)"}
            />
            <MultilineInput
              label={"Opis"}
              value={additionalCostsDescription}
              setter={setAdditionalCostsDescription}
            />
            <DecimalInput
              value={otherCosts}
              setter={setOtherCosts}
              label={"Koszty inne"}
              endAdornment={"zł"}
              helperText={"Dodatkowe koszty zatrudnienia (płaci pracownik)"}
            />
            <MultilineInput
              label={"Opis"}
              value={otherCostsDescription}
              setter={setOtherCostsDescription}
            />
            <DecimalInput
              value={tax26YearsOld}
              setter={setTax26YearsOld}
              label={"Podatek 26 r.ż."}
              endAdornment={"zł"}
            />
          </>
        )}
        {tab === 6 && (
          <>
            {notes.map((note, i) => (
              <div className={styles.notesContainer} key={i}>
                <TextField
                  label={`Uwaga ${i + 1}`}
                  multiline
                  value={note}
                  onChange={(e) => {
                    notes[i] = e.target.value;
                    setNotes([...notes]);
                  }}
                />
                <Fab
                  size={"small"}
                  aria-label="delete note"
                  className={"bg-error-red"}
                  sx={{ zIndex: 0 }}
                  onClick={() => {
                    notes.splice(i, 1);
                    setNotes([...notes]);
                  }}
                >
                  <RemoveIcon className={"color-darker-white"} />
                </Fab>
              </div>
            ))}
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => {
                setNotes([...notes, ""]);
              }}
            >
              Dodaj uwagę
            </Button>
          </>
        )}
        {tab === 7 && (
          <>
            <div className={styles.notesContainer}>
              <MobileDatePicker
                label={"Data rozliczenia"}
                value={settlementDate}
                onChange={(newValue) => setSettlementDate(newValue)}
                minDate={dayjs(new Date(2020, 1, 1))}
              />
              {settlementDate !== null && (
                <Fab
                  size={"small"}
                  aria-label="clear date"
                  className={"bg-error-red"}
                  sx={{ zIndex: 0 }}
                  onClick={() => {
                    setSettlementDate(null);
                  }}
                >
                  <ClearIcon className={"color-darker-white"} />
                </Fab>
              )}
            </div>

            <ReadonlyInput
              label={"Koszty"}
              endAdornment={"zł"}
              value={calculateCosts()}
            />
            <ReadonlyInput
              label={"Do wypłaty"}
              endAdornment={"zł"}
              value={calculateSalaryToPay()}
            />
            <Button variant="contained" endIcon={<PictureAsPdfIcon />}>
              Raport miesięczny (PDF)
            </Button>
            <Button variant="contained" endIcon={<BorderAllIcon />}>
              Raport miesięczny (CSV)
            </Button>
            <Button variant="contained" endIcon={<PictureAsPdfIcon />}>
              Raport roczny (PDF)
            </Button>
            <Button variant="contained" endIcon={<BorderAllIcon />}>
              Raport roczny (CSV)
            </Button>
          </>
        )}
      </div>
      <EmployeeBottomNavigation
        saveButtonActive={buttonActive}
        saveButtonOnClick={() => {
          setSaveOverlay(true);
        }}
      />
      {blocker.state === "blocked" && (
        <div className={styles.blockerContainer}>
          <div className={styles.blockerCard}>
            <p>
              Zmiany <b>nie</b> zostały zapisane.
              <br />
              Porzucić zmiany?
            </p>
            <Button
              variant="contained"
              size={"large"}
              onClick={() => blocker.reset()}
            >
              Wróć do edycji
            </Button>
            <Button
              variant="contained"
              size={"large"}
              onClick={() => blocker.proceed()}
            >
              Porzuć zmiany
            </Button>
          </div>
        </div>
      )}
      {saveOverlay && (
        <div className={styles.blockerContainer}>
          <div className={styles.blockerCard}>
            <p>Zapisać zmiany?</p>
            <Button
              variant="contained"
              size={"large"}
              onClick={() => setSaveOverlay(false)}
            >
              Nie zapisuj
            </Button>
            <Button
              variant="contained"
              size={"large"}
              onClick={() => {
                setSavedState({
                  settlementDate:
                    settlementDate === null ? null : settlementDate.toDate(),
                  workHours: parseInt(workHours),
                  hourlyRate: parseFloat(hourlyRate),
                  transfer: parseFloat(transfer),
                  l4Days: parseInt(l4Days),
                  l4DailyRate: parseFloat(l4DailyRate),
                  daysTaken: parseInt(daysTaken),
                  daysUnpaid: parseInt(daysUnpaid),
                  daysOnDemand: parseInt(daysOnDemand),
                  daysOccasional: parseInt(daysOccasional),
                  timeOffDailyRate: parseFloat(timeOffDailyRate),
                  overtimeHourlyRate: parseFloat(overtimeHourlyRate),
                  overtimeHours: parseInt(overtimeHours),
                  extraPay: parseFloat(extraPay),
                  cashAdvance: parseFloat(cashAdvance),
                  loanTaken: parseFloat(loanTaken),
                  loanReturned: parseFloat(loanReturned),
                  additionalCosts: parseFloat(additionalCosts),
                  additionalCostsDescription: additionalCostsDescription,
                  otherCosts: parseFloat(otherCosts),
                  otherCostsDescription: otherCostsDescription,
                  tax26yearsOld: parseFloat(tax26YearsOld),
                });
                setSavedNotes([...notes]);
                setSavedDaysToTake(parseInt(daysToTake));
                setButtonActive(false);
                setSaveOverlay(false);
              }}
            >
              Zapisz
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

const IntegerInput = (props: {
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  endAdornment?: string;
}) => {
  return (
    <TextField
      label={props.label}
      type="number"
      value={props.value}
      inputProps={{ pattern: "[0-9]*" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.endAdornment ? props.endAdornment : ""}
          </InputAdornment>
        ),
      }}
      onChange={(e) => {
        let newValue = null;
        if (props.value === "0" && e.target.value.startsWith("0")) {
          newValue = e.target.value.replaceAll(/^0/g, "");
        } else if (e.target.value === "") {
          newValue = "0";
        } else if (
          parseInt(e.target.value) >= 0 &&
          parseInt(e.target.value) <= 744
        ) {
          newValue = e.target.value;
        }
        if (newValue !== null) {
          props.setter(newValue);
        }
      }}
      onKeyDown={(e) => {
        if (!/\d|(Backspace)/.test(e.key)) {
          e.preventDefault();
        }
      }}
    />
  );
};

const DecimalInput = (props: {
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  endAdornment: string;
  helperText?: string;
}) => {
  return (
    <TextField
      label={props.label}
      type="number"
      helperText={props.helperText}
      inputProps={{ inputMode: "decimal" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{props.endAdornment}</InputAdornment>
        ),
      }}
      value={props.value}
      onChange={(e) => {
        if (props.value === "0" && /^0[^,.]/.test(e.target.value)) {
          props.setter(e.target.value.substring(1));
        } else if (e.target.value === "") {
          props.setter("0");
        } else if (
          parseFloat(e.target.value) >= 0 &&
          !/^\d+[,.]\d{3,}$/.test(e.target.value)
        ) {
          props.setter(e.target.value);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === ".") {
          e.preventDefault();
        }
      }}
    />
  );
};

const ReadonlyInput = (props: {
  value: string;
  label: string;
  endAdornment: string;
  helperText?: string;
}) => {
  return (
    <TextField
      label={props.label}
      type="number"
      helperText={props.helperText}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">{props.endAdornment}</InputAdornment>
        ),
      }}
      value={props.value}
    />
  );
};

const MultilineInput = (props: {
  label: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextField
      label={props.label}
      value={props.value}
      onChange={(e) => {
        props.setter(e.target.value);
      }}
      multiline
    />
  );
};

const detectStateChange = (
  savedState: number,
  actualState: string,
): boolean => {
  return savedState.toFixed(2) !== parseFloat(actualState).toFixed(2);
};
