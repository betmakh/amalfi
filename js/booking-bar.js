$(document).ready(function(){

// update on load from cache - update the info.
	var numOfAdults=$("#selectNumOfAdults option:selected").val();
		if(numOfAdults =="1"){
			$("span.AdultPlural").hide();
			$("span.AdultSingular").show();
		} else {
			$("span.AdultSingular").hide();
			$("span.AdultPlural").show();
		}
	$('#numOfAdults').html(numOfAdults);
	
	var numOfRooms=$("#selectNumOfRooms option:selected").text();
	$('#numOfRooms').html(numOfRooms);
	
		var numOfChildren=$("#selectNumOfChildren option:selected").val();
		if(numOfChildren =="1"){
			$("span.ChildPlural").hide();
			$("span.ChildSingular").show();
			$("div.addss_3").show();
		} else if (numOfChildren == "0") {
			$("span.ChildPlural").hide();
			$("span.ChildSingular").hide();
			document.getElementById('numOfChildren').style.display = 'none';
		} else {
			$("span.ChildSingular").hide();
			$("span.ChildPlural").show();
			$("div.addss_3").show();
		}
	$('#numOfChildren').html('- ' + numOfChildren);
	if (numOfChildren != "0"){
		document.getElementById('numOfChildren').style.display = 'inline';
	}
// end update 

	// google search
	$('#search-button').click(function(){
		$('.gsc-search-button').css("display", "none");
		$('.gsc-clear-button').css("display", "none");
	});
$('b.ico-toggle, #peopleCount').click(function(){
	$('div.counterOf').toggleClass('hide');
	hidePanels();
    var a = euginJsCompatibility.getElementsByClassName(document, "eugin-calendar");
	for (i = 0; i < a.length; i++) {
		if (a[i] != this.calendar) {
			a[i].style.display = "none"
		}
	}
});



$('#selectNumOfAdults').on('change',function(){
	var numOfAdults=$("#selectNumOfAdults option:selected").val();
		if(numOfAdults =="1"){
			$("span.AdultPlural").hide();
			$("span.AdultSingular").show();
		} else {
			$("span.AdultSingular").hide();
			$("span.AdultPlural").show();
		}
	$('#numOfAdults').html(numOfAdults);
});
$('#selectNumOfRooms').on('change',function(){
	var numOfRooms=$("#selectNumOfRooms option:selected").text();
	$('#numOfRooms').html(numOfRooms);
});
$('#selectNumOfChildren').on('change',function(){
	var numOfChildren=$("#selectNumOfChildren option:selected").val();
		if(numOfChildren =="1"){
			$("span.ChildPlural").hide();
			$("span.ChildSingular").show();
			$("div.addss_3").show();
		} else if (numOfChildren == "0") {
			$("span.ChildPlural").hide();
			$("span.ChildSingular").hide();
			document.getElementById('numOfChildren').style.display = 'none';
		} else {
			$("span.ChildSingular").hide();
			$("span.ChildPlural").show();
			$("div.addss_3").show();
		}
	$('#numOfChildren').html('- ' + numOfChildren);
	if (numOfChildren != "0"){
		document.getElementById('numOfChildren').style.display = 'inline';
	}
})
$('#findHotel').click(function(){
	var arrivalDate=$('#booking-checkin-search_eug').val();
	arrivalDate=arrivalDate.split('/');
	// фикс для цифр 10 20 30
	if (arrivalDate[0]<10){
		arrivalDate[0] = arrivalDate[0].replace('0','');
	}
	if (arrivalDate[1]<10){
		arrivalDate[1] = arrivalDate[1].replace('0','');
	}
	var departureDate = $('#booking-checkout-search_eug').val();
	var departureDate = departureDate.split('/');
	if (departureDate[0]<10){
		departureDate[0] = departureDate[0].replace('0','');
	}
	if (departureDate[1]<10){
		departureDate[1] = departureDate[1].replace('0','');
	}
	var numOfRooms  = $('#numOfRooms').text();
	var adults=$('#numOfAdults').text();
	var children=$('#numOfChildren').text();
	children=children.substr(2);
	var thisLang=$('#CurrentLanguage').text();
	var link ="http://www.booking.com/searchresults.html?src=region"+
	"&region=1754&aid=341392&error_url=http://www.booking.com/region/it/lecinqueterre.html?"+
	"aid=341392;&label=5TBookBar"+thisLang+"&checkin_monthday="+arrivalDate[0]+
	"&checkin_year_month="+arrivalDate[2]+"-"+arrivalDate[1]+"&checkout_monthday="+departureDate[0]+
	"&checkout_year_month="+departureDate[2]+"-"+departureDate[1]+
	"&no_rooms="+numOfRooms+"&group_adults="+adults+"&group_children="+children;

	var ageParams = "";
	if (children>0){
		var $age = $(".input-age");
		$.each($age, function() {
			var value = this.value;
			value = parseInt(value);
			if (value>0 && value<18){
			}else{
				value=17;
			}
			ageParams += "&age=" + value;
		});
	}

	window.open(link + ageParams);
	//alert(link + ageParams);
})


var fieldsVisibilityControl = function() {
	var $wrap = $(".counterOf");
	$wrap.addClass("children-show");
	$wrap.addClass("rooms-show");

	$("body")
		.on("click", ".eugin-booking-dropdown-container", function(e) {
			e.stopImmediatePropagation();
		})
		.on("click", function(e) {
			if(!$wrap.is(":visible")) return true;
			$wrap.addClass("hide");
		})
		// tap for iPhone
		.on('tap',".eugin-booking-dropdown-container", function(e){
			e.stopImmediatePropagation();
		})
		.on('tap',".eugin-calendar", function(e){
			e.stopImmediatePropagation();
		})
		.on('tap',".field-date", function(e){
			e.stopImmediatePropagation();
		})
		//скрывать разную хрень при тапе по документу
		.on('tap',function(e){
			if($wrap.is(":visible")){
				$wrap.addClass("hide");
			}
			
			var a = euginJsCompatibility.getElementsByClassName(document, "eugin-calendar");
			for (i = 0; i < a.length; i++) {
				if (a[i] != this.calendar) {
					a[i].style.display = "none"
				}
			}
			
			//remove focus from calendar on iPhone.
			if (document.activeElement.id=="booking-checkin-search_eug" || document.activeElement.id=="booking-checkout-search_eug"){
				document.activeElement.blur();
			}
		})
		;
};

$("#selectNumOfChildren").on("change", function() {
	var value = this.value;
	$(".counterOf").attr("data-childcount", value);
	var $fields = $(".input-age");
	if($fields.length == value) return true;
	var isIncrement = $fields.length < value;

	if(isIncrement) {
		var count = value - $fields.length;
		var $fieldClone = $fields.eq(0);
		for(var i = 0; count > i; i++) {
			$fieldClone.clone().insertAfter($fields.filter(":last"));
		};
	} else {
		var count = $fields.length - value;
		for(var i = 0; count > i; i++) {
			var $els = $(".input-age");
			if($els.length == 1) return false;
			$els.filter(":last").remove();
		};
	}
});
fieldsVisibilityControl();
})














// чужое
function euginCalendar(a) {
    if (a.lang === undefined) {
        a.lang = "it"
    }
    if (a.yearsNavigation === undefined) {
        a.yearsNavigation = false
    }
    if (a.range === undefined) {
        a.range = {
            min: false,
            max: false
        }
    }
    if (a.range.min === undefined) {
        a.range.min = false
    }
    if (a.range.max === undefined) {
        a.range.max = false
    }
    if (a.onSelect === undefined) {
        a.onSelect = function (b) {}
    }
    if (a.calendarPosition === undefined) {
        a.calendarPosition = "bottom"
    }
    if (a.fixed === undefined) {
        a.fixed = false
    }
    if (a.dateFormats === undefined) {
        a.dateFormats = {}
    }
    this.options = a;
    this.calendar = null;
    this.other_calendar = null;
    this.current_date = null;
    this.on_set_current_date_closures = [];
    this.on_date_click = function () {};
    this.i18n = new euginCalendarI18n(this, this.options.lang, a.dateFormats);
    this.input = new euginCalendarInput(this, this.options.inputId);
    this._init_events();
    this._init_options()
}
euginCalendar.prototype = {
    _init_options: function () {
        if (this.options.range.min === "today") {
            this.options.range.min = this.i18n.date2DateString(new Date())
        }
    },
    _init_events: function () {
        euginJsCompatibility.addEvent(document, "click", function (a) {
            var b = euginJsCompatibility.getEventTarget(a);
            if (!this._is_calendar_element(b)) {
                this.hide()
            }
        }.bind(this))
    },
    _is_calendar_element: function (a) {
        if (a === this.input.getElement()) {
            return true
        }
        if (a.className.search("sc-keep-open") !== -1) {
            return true
        }
        while (a.parentNode) {
            if (a === this.calendar) {
                return true
            }
            a = a.parentNode
        }
        return false
    },
    onSetCurrentDate: function (a) {
        this.on_set_current_date_closures.push(a)
    },
    onDateClick: function (a) {
        this.on_date_click = a
    },
    setOtherCalendar: function (a) {
        this.other_calendar = a
    },
    setCurrentDate: function (a) {
        this.current_date = a;
        for (i = 0; i < this.on_set_current_date_closures.length; i++) {
            this.on_set_current_date_closures[i]()
        }
    },
    getCurrentDate: function () {
        return this.current_date
    },
    selectDate: function (a) {
        this.input.setDate(a);
        if (!this.input.checkAndValidateDate()) {
            return
        }
        this.setCurrentDate(a);
        this.show(a.getFullYear(), a.getMonth())
    },
    setRangeMin: function (b) {
        var a = this.i18n.dateString2Date(b);
        if (a === null) {
            return
        }
        this.options.range.min = b
    },
    setRangeMax: function (b) {
        var a = this.i18n.dateString2Date(b);
        if (a === null) {
            return
        }
        this.options.range.max = b
    },
    isShown: function () {
        return this.calendar && (this.calendar.style.display == "")
    },
    show: function (c, d) {
        if (!euginJsCompatibility.isVisible(this.input.getElement())) {
            return
        }
        if ((c === undefined) || (d === undefined)) {
            var b = this.input.checkDate();
            if (b === false) {
                b = new Date()
            }
            var c = b.getFullYear();
            var d = b.getMonth()
        }
        if (d < 0) {
            c--;
            d = 11
        } else {
            if (d > 11) {
                c++;
                d = 0
            }
        } if (this.calendar === null) {
            this.calendar = this._get_calendar_structure();
            var a = document.getElementsByTagName("body")[0];
            a.appendChild(this.calendar)
        }
        this._refresh(c, d);
        this.calendar.style.display = "";
        this._position_calendar_near(this.input.getElement())
    },
    _get_calendar_structure: function () {
        var a = document.createElement("div");
        a.className = "eugin-calendar";
        a.style.position = (this.options.fixed ? "fixed" : "absolute");
        return a
    },
    _position_calendar_near: function (b) {
        var a = euginJsCompatibility.findPosition(b);
        if (this.options.calendarPosition == "right") {
            this.calendar.style.top = parseInt(a.top) + "px";
            this.calendar.style.left = parseInt(a.left + b.offsetWidth) + "px";
            if (this.calendar.className.search(" sc-right") === -1) {
                this.calendar.className += " sc-right"
            }
        } else {
            if (this.options.calendarPosition == "left") {
                this.calendar.style.top = parseInt(a.top) + "px";
                this.calendar.style.left = parseInt(a.left - this.calendar.offsetWidth) + "px";
                if (this.calendar.className.search(" sc-left") === -1) {
                    this.calendar.className += " sc-left"
                }
            } else {
                this.calendar.style.top = parseInt(a.top + b.offsetHeight) + "px";
                this.calendar.style.left = parseInt(a.left) + "px";
                if (this.calendar.className.search(" sc-bottom") === -1) {
                    this.calendar.className += " sc-bottom"
                }
            }
        }
    },
    hide: function () {
        if (this.calendar) {
            this.calendar.style.display = "none"
        }
    },
    hideOthers: function () {
        var a = euginJsCompatibility.getElementsByClassName(document, "eugin-calendar");
        for (i = 0; i < a.length; i++) {
            if (a[i] != this.calendar) {
                a[i].style.display = "none"
            }
        }
    },
    _refresh: function (d, g) {
        this.calendar.innerHTML = "";
        var e = document.createElement("table");
        e.setAttribute("cellspacing", 0, false);
        e.setAttribute("cellpadding", 0, false);
        e.appendChild(this._get_header(d, g));
        this.calendar.appendChild(e);
        var b = document.createElement("tbody");
        e.appendChild(b);
        var a = new Date(d, g, 1);
        for (row = 0; row < 6; row++) {
            var f = document.createElement("tr");
            b.appendChild(f);
            for (week = 0; week < 7; week++) {
                var h = document.createElement("td");
                var c = (week + this.i18n.getFirstDayOfWeek()) % 7;
                if ((a.getMonth() == g) && (a.getDay() == c)) {
                    h.className = "sc-day sc-keep-open";
                    if (this.getCurrentDate() && (this.getCurrentDate().getTime() == a.getTime())) {
                        h.className += " sc-current"
                    }
                    if (this._is_today(a)) {
                        h.className += " sc-today"
                    }
                    if (this.inRangeDate(a)) {
                        (function (j) {
                            h.onclick = function () {
                                this.input.setDate(j);
                                this.setCurrentDate(j);
                                this.hide();
                                this.options.onSelect(this.input.getElement());
                                this.on_date_click()
                            }.bind(this)
                        }.bind(this))(new Date(a.getTime()))
                    } else {
                        h.className += " sc-disabled"
                    }
                    h.innerHTML = a.getDate();
                    a.setDate(a.getDate() + 1)
                } else {
                    h.className = "sc-other-month"
                }
                f.appendChild(h)
            }
        }
    },
    _is_today: function (b) {
        var a = new Date();
        return b.getDate() === a.getDate() && b.getMonth() === a.getMonth() && b.getFullYear() === a.getFullYear()
    },
    inRangeDate: function (a) {
        return this._check_range_min_date(a) && this._check_range_max_date(a)
    },
    getRangeValidDate: function (a) {
        if (!a) {
            return this.i18n.dateString2Date(this.options.range.min)
        }
        if (isNaN(a.getTime())) {
            return this.i18n.dateString2Date(this.options.range.min)
        }
        if (!this._check_range_min_date(a)) {
            return this.i18n.dateString2Date(this.options.range.min)
        }
        if (!this._check_range_max_date(a)) {
            return this.i18n.dateString2Date(this.options.range.max)
        }
        return a
    },
    _check_range_min_date: function (a) {
        if (this.options.range.min === false) {
            return true
        }
        var b = this.i18n.dateString2Date(this.options.range.min);
        if (b === null) {
            return false
        }
        if (isNaN(b.getTime())) {
            return true
        }
        return a.getTime() >= b.getTime()
    },
    _check_range_max_date: function (a) {
        if (this.options.range.max === false) {
            return true
        }
        var b = this.i18n.dateString2Date(this.options.range.max);
        if (b === null) {
            return false
        }
        if (isNaN(b.getTime())) {
            return true
        }
        return a.getTime() <= b.getTime()
    },
    _get_header: function (j, f) {
        var g = document.createElement("thead");
        var h = document.createElement("tr");
        g.appendChild(h);
        var c = document.createElement("th");
        c.colSpan = 7;
        h.appendChild(c);
        var b = document.createElement("div");
        b.className = "sc-nav";
        c.appendChild(b);
        var l = document.createElement("span");
        l.className = "sc-title";
        l.innerHTML = this.i18n.getMonth(f) + " " + j;
        b.appendChild(l);
        var d = document.createElement("span");
        d.className = "sc-prev";
        b.appendChild(d);
        if (this.options.yearsNavigation) {
            var k = document.createElement("a");
            k.href = "#";
            k.className = "sc-prev-year sc-keep-open";
            k.innerHTML = "<span>&lt;&lt;</span>";
            k.onclick = function () {
                this.show(j - 1, f);
                return false
            }.bind(this);
            d.appendChild(k)
        }
        var k = document.createElement("a");
        k.href = "#";
        k.className = "sc-prev-month sc-keep-open";
        k.innerHTML = "<span>&lt;</span>";
        k.onclick = function () {
            this.show(j, f - 1);
            return false
        }.bind(this);
        d.appendChild(k);
        var e = document.createElement("span");
        e.className = "sc-next";
        b.appendChild(e);
        var k = document.createElement("a");
        k.href = "#";
        k.className = "sc-next-month sc-keep-open";
        k.innerHTML = "<span>&gt;</span>";
        k.onclick = function () {
            this.show(j, f + 1);
            return false
        }.bind(this);
        e.appendChild(k);
        if (this.options.yearsNavigation) {
            var k = document.createElement("a");
            k.href = "#";
            k.className = "sc-next-year sc-keep-open";
            k.innerHTML = "<span>&gt;&gt;</span>";
            k.onclick = function () {
                this.show(j + 1, f);
                return false
            }.bind(this);
            e.appendChild(k)
        }
        var h = document.createElement("tr");
        g.appendChild(h);
        for (week = 0; week < 7; week++) {
            var c = document.createElement("th");
            var m = (week + this.i18n.getFirstDayOfWeek()) % 7;
            c.className = "sc-week-day";
            c.innerHTML = this.i18n.getWeekDay(m);
            h.appendChild(c)
        }
        return g
    }
};

function euginCalendarInput(b, a) {
    this.calendar = b;
    this.input = document.getElementById(a);
    this._init_current_date();
    this._init_events()
}
euginCalendarInput.prototype = {
    _init_current_date: function () {
        var a = this.checkDate();
        if (a !== false) {
            this.calendar.setCurrentDate(a)
        } else {
            this.setDate(this.calendar.getRangeValidDate(this.getDate()));
            this.calendar.setCurrentDate(this.calendar.getRangeValidDate(this.getDate()))
        }
    },
    _init_events: function () {
        this.input.onfocus = function () {
            this.calendar.hideOthers();
            if (!this.calendar.isShown()) {
                this.calendar.show()
            }
        }.bind(this);
        this.input.onblur = function () {
            var a = this.checkAndValidateDate();
            if (a === false) {
                this.setDate(this.calendar.getCurrentDate());
                this._set_validated()
            }
        }.bind(this);
        this.input.onkeyup = function (b) {
            b = euginJsCompatibility.getEvent(b);
            if (this._is_key_neutral(b.keyCode)) {
                return
            }
            if (this._is_key_forbidden(b.keyCode)) {
                this._set_error();
                return
            }
            var a = this.checkAndValidateDate();
            if (a !== false) {
                this.calendar.setCurrentDate(a);
                this.calendar.show(a.getFullYear(), a.getMonth())
            }
        }.bind(this)
    },
    _is_key_neutral: function (a) {
        return (a > 32) && (a < 41)
    },
    _is_key_forbidden: function (a) {
        return ((a < 46) && (a != 8)) || (a > 57)
    },
    getElement: function () {
        return this.input
    },
    setDate: function (a) {
        this.input.value = this.calendar.i18n.date2DateString(a)
    },
    getDate: function () {
        return this.calendar.i18n.dateString2Date(this.input.value)
    },
    checkDate: function () {
        var a = this.getDate();
        if (!a) {
            return false
        }
        if (isNaN(a.getTime())) {
            return false
        }
        if (!this._is_string_well_formed(this.input.value)) {
            return false
        }
        if (!this.calendar.inRangeDate(a)) {
            return false
        }
        return a
    },
    checkAndValidateDate: function () {
        var a = this.checkDate();
        if (a === false) {
            this._set_error();
            return false
        }
        this._set_validated();
        return a
    },
    _is_string_well_formed: function (b) {
        var c = this.calendar.i18n.dateString2Array(b);
        if ((c.day < 1) || (c.day > 31)) {
            return false
        }
        if ((c.month < 1) || (c.month > 12)) {
            return false
        }
        var a = new Date().getFullYear() + 10;
        if ((c.year < 1970) || (c.year > a)) {
            return false
        }
        return true
    },
    _set_error: function () {
        if (this.input.className.indexOf("eugin-calendar-error") !== -1) {
            return
        }
        this.input.className += " eugin-calendar-error"
    },
    _set_validated: function () {
        this.input.className = this.input.className.replace(" eugin-calendar-error", "")
    }
};

function euginCalendarI18n(c, d, a) {
    this.calendar = c;
    this.lang = d;
    this.months = {
it: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
pt: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
ru: ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],
uk: ["січень","лютий","березень","квітень","травень","червень","липень","серпень","вересень","жовтень","листопад","грудень"],
es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septembre","octobre","novembre","diciembre"],
pl: ["styczen","luty","marcek","kwicien","maj","czerwiec","lipiec","sierpien","wrzesien","pazdziernik","listopad","grudzien"],
de: ["Januar","Februar","Marz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
fr: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aoút","Septembre","Octobre","Novembre","Décembre"]
    };
    this.week_days = {
it: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
pt: ["Do", "Se", "Te", "Qu", "Qu", "Se", "S&aacute;"],
ru: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
uk: ["нд", "пн", "вт", "ср", "чт", "пт", "сб"],
es: ["do", "lu", "ma", "mi", "ju", "vi", "sa"],
pl: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
de: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
fr: ["di", "lu", "ma", "me", "je", "ve", "sa"]
    };
    this.first_day_of_week = {
it: 1,
en: 0,
pt: 0,
ru: 1,
uk: 1,
es: 1,
pl: 1,
de: 1,
fr: 1
    };
    this.date_formats = {
it: "%d/%m/%Y",
en: "%d/%m/%Y",
pt: "%d/%m/%Y",
ru: "%d/%m/%Y",
uk: "%d/%m/%Y",
es: "%d/%m/%Y",
pl: "%d/%m/%Y",
de: "%d/%m/%Y",
fr: "%d/%m/%Y"
    };
    for (var b in a) {
        this.date_formats[b] = a[b]
    }
}
euginCalendarI18n.prototype = {
    getMonth: function (a) {
        return this.months[this.lang][a]
    },
    getWeekDay: function (a) {
        return this.week_days[this.lang][a]
    },
    getDateFormat: function () {
        return this.date_formats[this.lang]
    },
    getFirstDayOfWeek: function () {
        return this.first_day_of_week[this.lang]
    },
    date2DateString: function (b) {
        if (!b) {
            return ""
        }
        var e = this.getDateFormat();
        var a = this._format_number(b.getDate(), 2);
        var d = this._format_number(b.getMonth() + 1, 2);
        var c = this._format_number(b.getFullYear(), 4);
        return e.replace("%d", a).replace("%m", d).replace("%Y", c)
    },
    _format_number: function (b, a) {
        var c = "000" + b;
        return c.substr(c.length - a)
    },
    dateString2Array: function (d) {
        if (d === "") {
            return {}
        }
        var e = d.split("/");
        var b = this.getDateFormat().split("/");
        var a = e[b.indexOf("%d")];
        var f = e[b.indexOf("%m")];
        var c = e[b.indexOf("%Y")];
        return {
            day: a,
            month: f,
            year: c
        }
    },
    dateString2Date: function (b) {
        if (!b) {
            return null
        }
        if (b === "") {
            return null
        }
        if (b == "today") {
            var a = new Date();
            return new Date(a.getFullYear(), a.getMonth(), a.getDate())
        }
        var c = this.dateString2Array(b);
        return new Date(c.year, c.month - 1, c.day)
    }
};

function euginCalendarNightsCalculator(a) {
    this.from = a.from;
    this.to = a.to;
    this.nights_summary = document.getElementById(a.nightsNo);
    this.from.onSetCurrentDate(function () {
        this.updateNightsNo()
    }.bind(this));
    this.to.onSetCurrentDate(function () {
        this.updateNightsNo()
    }.bind(this));
    this.updateNightsNo()
}
euginCalendarNightsCalculator.prototype = {
    updateNightsNo: function () {
        var d = euginJsCompatibility.getElementsByClassName(this.nights_summary, "counter")[0];
        var a = euginJsCompatibility.getElementsByClassName(this.nights_summary, "plural")[0];
        var c = this._get_nights_no();
        if (!c) {
            d.innerHTML = "";
            return
        }
        d.innerHTML = c;
    },
    _get_nights_no: function () {
        var c = this.from.getCurrentDate();
        var a = this.to.getCurrentDate();
        var b = a.getTime() - c.getTime();
        if (b < 0) {
            return false
        }
        return Math.round(b / 1000 / 60 / 60 / 24)
    }
};

function euginCalendarConnector(a) {
    this.from = a.from;
    this.to = a.to;
    if (a.minimumInterval === undefined) {
        a.minimumInterval = 1
    }
    if (a.maximumInterval === undefined) {
        a.maximumInterval = -1
    }
    this.options = a;
    this.from.onDateClick(function () {
        var c = this.from.getCurrentDate();
        var b = this.to.getCurrentDate();
        if (!b) {
            b = new Date(c.getTime());
            b.setDate(c.getDate() + this.options.minimumInterval)
        }
        this._connect_calendar();
        if (c.getTime() > b.getTime()) {
            this.to.show()
        }
    }.bind(this));
    this.from.onSetCurrentDate(function () {
        this._set_connected_calendar_range_min_date(this.from.input.getDate());
        this._set_connected_calendar_range_max_date(this.from.input.getDate())
    }.bind(this));
    this._connect_calendar()
}
euginCalendarConnector.prototype = {
    _connect_calendar: function () {
        var b = this.from.input.getDate();
        if (!b) {
            return
        }
        var d = this.to.getCurrentDate();
        var a = this.from.getCurrentDate();
        var c = new Date(b.getTime());
        c.setDate(c.getDate() + this.options.minimumInterval);
        this._set_connected_calendar_range_min_date(b);
        this._set_connected_calendar_range_max_date(b);
        if (a && d && (a.getTime() < d.getTime())) {
            return
        }
        this.to.input.setDate(c);
        this.to.setCurrentDate(c)
    },
    _set_connected_calendar_range_min_date: function (a) {
        var b = new Date(a.getTime());
        b.setDate(b.getDate() + this.options.minimumInterval);
        this.to.setRangeMin(this.from.i18n.date2DateString(b))
    },
    _set_connected_calendar_range_max_date: function (a) {
        if (this.options.maximumInterval < 0) {
            return
        }
        var b = new Date(a.getTime());
        b.setDate(b.getDate() + this.options.maximumInterval);
        this.to.setRangeMax(this.from.i18n.date2DateString(b));
        if (this.to.getCurrentDate().getTime() > b.getTime()) {
            this.to.selectDate(b)
        }
    }
};
var euginJsCompatibility = {};
euginJsCompatibility.findPosition = function (b) {
    var a = 0;
    var c = 0;
    while (b) {
        a += b.offsetLeft;
        c += b.offsetTop;
        b = b.offsetParent
    }
    return {
        left: a,
        top: c
    }
};
euginJsCompatibility.getEvent = function (a) {
    return a || window.event
};
euginJsCompatibility.getEventTarget = function (a) {
    a = euginJsCompatibility.getEvent(a);
    return a.target || window.event.srcElement
};
euginJsCompatibility.getElementsByClassName = function (c, g) {
    var f = c.getElementsByTagName("*");
    var b = [];
    var d = "(^|\\s)" + g + "(\\s|$)";
    for (var a = 0; a < f.length; a++) {
        var h = f[a];
        if (h.className.match && (h.className.match(d))) {
            b[b.length] = h
        }
    }
    return b
};
euginJsCompatibility.addEvent = function (a, b, c) {
    if (a.addEventListener) {
        a.addEventListener(b, c, false)
    } else {
        if (a.attachEvent) {
            a.attachEvent("on" + b, c)
        }
    }
};
euginJsCompatibility.ajax = function (a, c) {
    var b;
    if (window.XMLHttpRequest) {
        b = new XMLHttpRequest()
    } else {
        c(euginBookingIntegration.getFormHTML());
        return
    }
    b.onreadystatechange = function () {
        if ((b.readyState == 4) && (b.status == 200)) {
            c(b.responseText)
        }
    };
    b.open("GET", a, true);
    b.send()
};
euginJsCompatibility.getRandomString = function (c) {
    if (c === undefined) {
        c = 6
    }
    var d = "";
    var a = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var b = 0; b < c; b++) {
        d += a.charAt(Math.floor(Math.random() * a.length))
    }
    return d
};
euginJsCompatibility.isVisible = function (c) {
    var a = c.offsetWidth;
    var b = c.offsetHeight;
    if (a == 0 && b == 0) {
        return false
    }
    if (a > 0 && b > 0) {
        return true
    }
    return c.display != "none"
};
if (!Function.prototype.bind) {
    Function.prototype.bind = function (a) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
        }
        var e = Array.prototype.slice.call(arguments, 1),
            d = this,
            b = function () {},
            c = function () {
                return d.apply(this instanceof b && a ? this : a, e.concat(Array.prototype.slice.call(arguments)))
            };
        b.prototype = this.prototype;
        c.prototype = new b();
        return c
    }
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (c, d) {
        for (var b = (d || 0), a = this.length; b < a; b++) {
            if (this[b] === c) {
                return b
            }
        }
        return -1
    }
};