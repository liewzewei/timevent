let enddemin = 0
let enddehr = 0
let schedulestartmin = 0
let where = 0
let temporary = ""
let subject = ""
let finmin = 0
let finhr = 0
let min = 0
let hr = 0
let time1 = 0
let go = 1
let hour = 0
let minute = 0
let second = 0
let _set = 0
let minsss: number[] = []
let hoursss: number[] = []
let endhr: number[] = []
let endmin: number[] = []
let sbj_list: string[] = []
basic.showString("A=+1")
basic.showString("B=-1")
basic.showString("Push=Set")
basic.showString("Hour")
while (go == 1) {
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        go = 0
    }
    if (input.buttonIsPressed(Button.A)) {
        hour = Math.min(23, hour + 1)
        basic.showNumber(hour)
    } else if (input.buttonIsPressed(Button.B)) {
        hour = Math.max(0, hour - 1)
        basic.showNumber(hour)
    }
}
basic.showString("Minute")
go = 1
while (go == 1) {
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        go = 0
    }
    if (input.buttonIsPressed(Button.A)) {
        minute = Math.min(59, minute + 1)
        basic.showNumber(minute)
    } else if (input.buttonIsPressed(Button.B)) {
        minute = Math.max(0, minute - 1)
        basic.showNumber(minute)
    }
}
basic.showString("Second")
go = 1
while (go == 1) {
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        go = 0
    }
    if (input.buttonIsPressed(Button.A)) {
        second = Math.min(59, second + 1)
        basic.showNumber(second)
    } else if (input.buttonIsPressed(Button.B)) {
        second = Math.max(0, second - 1)
        basic.showNumber(second)
    }
}
let done = 1
let text_list = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
basic.forever(function () {
    if (done == 1 && go == 0) {
        if (_set == 1) {
            time1 = 0
            hr = -1
            min = -1
            finhr = -1
            finmin = -1
            basic.showString("start hour")
            while (hr == -1) {
                basic.showNumber(Math.min(23, Math.floor(pins.analogReadPin(AnalogPin.P1) / 42)))
                if (pins.digitalReadPin(DigitalPin.P0) == 1) {
                    hr = Math.min(23, Math.floor(pins.analogReadPin(AnalogPin.P1) / 42))
                }
                basic.pause(1000)
            }
            basic.showString("start minute")
            while (min == -1) {
                basic.showNumber(Math.min(59, Math.floor(pins.analogReadPin(AnalogPin.P1) / 17)))
                if (pins.digitalReadPin(DigitalPin.P0) == 1) {
                    min = Math.min(59, Math.floor(pins.analogReadPin(AnalogPin.P1) / 17))
                }
                basic.pause(1000)
            }
            hoursss.push(hr)
            minsss.push(min)
            basic.showString("end hour")
            while (finhr == -1) {
                basic.showNumber(Math.min(23, Math.floor(pins.analogReadPin(AnalogPin.P1) / 42)))
                if (pins.digitalReadPin(DigitalPin.P0) == 1) {
                    finhr = Math.min(23, Math.floor(pins.analogReadPin(AnalogPin.P1) / 42))
                }
                basic.pause(1000)
            }
            basic.showString("end minute")
            while (finmin == -1) {
                basic.showNumber(Math.min(59, Math.floor(pins.analogReadPin(AnalogPin.P1) / 17)))
                if (pins.digitalReadPin(DigitalPin.P0) == 1) {
                    finmin = Math.min(59, Math.floor(pins.analogReadPin(AnalogPin.P1) / 17))
                }
                basic.pause(1000)
            }
            endhr.push(finhr)
            endmin.push(finmin)
            while (subject.length < 3) {
                basic.showString("" + (text_list[Math.floor(pins.analogReadPin(AnalogPin.P1) / 40)]))
                if (pins.digitalReadPin(DigitalPin.P0) == 1) {
                    temporary = text_list[Math.floor(pins.analogReadPin(AnalogPin.P1) / 40)]
                    subject = "" + subject + temporary
                    basic.pause(2000)
                }
            }
            sbj_list.push(subject)
            subject = ""
            _set = 0
        }
    }
})
basic.forever(function () {
    while (true) {
        second += 1
        basic.pause(1000)
        if (second == 60) {
            minute += 1
            second = 0
        }
        if (minute == 60) {
            hour += 1
            minute = 0
        }
        if (hour == 24) {
            hour += 0
        }
    }
})
basic.forever(function () {
    if (go == 0) {
        if (input.buttonIsPressed(Button.A)) {
            _set = 1
        }
    }
})
basic.forever(function () {
    if (_set == 0 && done == 1) {
        if (hour >= 10) {
            if (minute >= 10) {
                basic.showString("" + hour + ":" + minute)
            } else {
                basic.showString("" + hour + ":" + "0" + minute)
            }
        } else {
            if (minute >= 10) {
                basic.showString("0" + hour + ":" + minute)
            } else {
                basic.showString("0" + hour + ":" + "0" + minute)
            }
        }
    }
})
basic.forever(function () {
    if (done == 1 && _set == 0) {
        if (hoursss.length > 0) {
            where = hoursss.indexOf(hour)
            schedulestartmin = minsss[where]
            enddehr = endhr[where]
            enddemin = endmin[where]
            if (hour >= hoursss[where] && minute >= minsss[where] && (hour <= enddehr && minute <= enddemin)) {
                pins.digitalWritePin(DigitalPin.P2, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P2, 0)
            }
            if (hour >= hoursss[where] && minute >= minsss[where] && (hour <= enddehr && minute <= enddemin)) {
                if (input.buttonIsPressed(Button.B)) {
                    basic.showString("" + (sbj_list[where]))
                }
            }
        }
    }
})
