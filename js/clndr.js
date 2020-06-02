
;(function ( $, window, document, undefined ) {

  // Esta es la plantilla de calendario predeterminada.
  var clndrTemplate = "<div class='clndr-controls'>" +
    "<div class='clndr-control-button'><p class='clndr-previous-button'>previous</p></div><div class='month'><%= month %> <%= year %></div><div class='clndr-control-button rightalign'><p class='clndr-next-button'>next</p></div>" +
    "</div>" +
  "<table class='clndr-table' border='0' cellspacing='0' cellpadding='0'>" +
    "<thead>" +
    "<tr class='header-days'>" +
    "<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>" +
      "<td class='header-day'><%= daysOfTheWeek[i] %></td>" +
    "<% } %>" +
    "</tr>" +
    "</thead>" +
    "<tbody>" +
    "<% for(var i = 0; i < numberOfRows; i++){ %>" +
      "<tr>" +
      "<% for(var j = 0; j < 7; j++){ %>" +
      "<% var d = j + i * 7; %>" +
      "<td class='<%= days[d].classes %>'><div class='day-contents'><%= days[d].day %>" +
      "</div></td>" +
      "<% } %>" +
      "</tr>" +
    "<% } %>" +
    "</tbody>" +
  "</table>";

  var pluginName = 'clndr';

  var defaults = {
    template: clndrTemplate,
    weekOffset: 0,
    startWithMonth: null,
    clickEvents: {
      click: null,
      nextMonth: null,
      previousMonth: null,
      nextYear: null,
      previousYear: null,
      today: null,
      onMonthChange: null,
      onYearChange: null
    },
    targets: {
      nextButton: 'clndr-next-button',
      previousButton: 'clndr-previous-button',
      nextYearButton: 'clndr-next-year-button',
      previousYearButton: 'clndr-previous-year-button',
      todayButton: 'clndr-today-button',
      day: 'day',
      empty: 'empty'
    },
    events: [],
    extras: null,
    dateParameter: 'date',
    multiDayEvents: null,
    doneRendering: null,
    render: null,
    daysOfTheWeek: null,
    showAdjacentMonths: true,
    adjacentDaysChangeMonth: false,
    ready: null,
    constraints: null
  };

  // The actual plugin constructor
  function Clndr( element, options ) {
    this.element = element;

    // Fusionar las opciones predeterminadas con las opciones proporcionadas por el usuario
    this.options = $.extend(true, {}, defaults, options);

    // Si hay eventos, debemos ejecutarlos a través de nuestra función addMomentObjectToEvents
    // Que agregará un objeto de fecha que podemos utilizar para hacer la vida más fácil. Esto sólo es necesario
    // cuando se proporcionan eventos en la instanciación, ya que nuestra función setEvents utiliza addMomentObjectToEvents.
    if(this.options.events.length) {
      if(this.options.multiDayEvents) {
        this.options.events = this.addMultiDayMomentObjectsToEvents(this.options.events);
      } else {
        this.options.events = this.addMomentObjectToEvents(this.options.events);
      }
    }

    // Este objeto almacenará una referencia al mes actual.
    //  Es un objeto de momento, que nos permite empujarlo un poco si es necesario.
    //Esto servirá como base para cambiar entre meses y es el go-to
    // Internamente si queremos saber en qué mes estamos actualmente.
    if(this.options.startWithMonth) {
      this.month = moment(this.options.startWithMonth).startOf('month');
    } else {
      this.month = moment().startOf('month');
    }

    // Si tenemos restricciones establecidas, asegúrese de que el mes está dentro de ellos.
    if(this.options.constraints) {
      // Compruebe primero si la fecha de inicio existe y es posterior a ahora.
      if(this.options.constraints.startDate) {
        var startMoment = moment(this.options.constraints.startDate);
        if(this.month.isBefore(startMoment, 'month')) {
          this.month.set('month', startMoment.month());
          this.month.set('year', startMoment.year());
        }
      }
      // Asegúrese de que el mes (ya sea modificado o no) es antes de la fecha de finalización
      if(this.options.constraints.endDate) {
        var endMoment = moment(this.options.constraints.endDate);
        if(this.month.isAfter(endMoment, 'month')) {
          this.month.set('month', endMoment.month()).set('year', endMoment.year());
        }
      }
    }

    this._defaults = defaults;
    this._name = pluginName;

    // Algunos primeros inicialización -> día de la semana de compensación,
    // Compilación de plantillas, creación y almacenamiento de algunos elementos que necesitaremos más tarde,
    // Y manejo de eventos para el controlador.
    this.init();
  }

  Clndr.prototype.init = function () {
    // Cree los días de la semana usando el ajuste de idioma actual del momento
    this.daysOfTheWeek = this.options.daysOfTheWeek || [];
    if(!this.options.daysOfTheWeek) {
      this.daysOfTheWeek = [];
      for(var i = 0; i < 7; i++) {
        this.daysOfTheWeek.push( moment().weekday(i).format('dd').charAt(0) );
      }
    }
    // Barajar la semana si hay un desplazamiento
    if(this.options.weekOffset) {
      this.daysOfTheWeek = this.shiftWeekdayLabels(this.options.weekOffset);
    }

    // Prueba rápida y sucia para asegurarse de que la representación es posible.
    if( !$.isFunction(this.options.render) ) {
      this.options.render = null;
      if (typeof _ === 'undefined') {
        throw new Error("Underscore was not found. Please include underscore.js OR provide a custom render function.");
      }
      else {
        //Vamos a seguir adelante y usar subrayado aquí si no se ha proporcionado ningún método de renderizado.
        this.compiledClndrTemplate = _.template(this.options.template);
      }
    }

    //Crear el elemento padre que mantendrá el complemento y guárdelo para más tarde
    $(this.element).html("<div class='clndr'></div>");
    this.calendarContainer = $('.clndr', this.element);

    // Adjuntar controladores de eventos para clics en botones / celdas
    this.bindEvents();

    // Hacer un render normal de la plantilla de calendario
    this.render();

    //Si se ha proporcionado una devolución de llamada lista, llámelo.
    if(this.options.ready) {
      this.options.ready.apply(this, []);
    }
  };

  Clndr.prototype.shiftWeekdayLabels = function(offset) {
    var days = this.daysOfTheWeek;
    for(var i = 0; i < offset; i++) {
      days.push( days.shift() );
    }
    return days;
  };

  // Aquí es donde ocurre la magia. Dado un objeto de momento que representa el mes actual,
  // Se crea una matriz de objetos calendarDay que contiene eventos apropiados y
  // Clases dependiendo de la circunstancia.
  Clndr.prototype.createDaysObject = function(currentMonth) {
    // Esta matriz tendrá números para toda la cuadrícula (incluso los espacios en blanco)
    daysArray = [];
    var date = currentMonth.startOf('month');

    // Filtrar la lista de eventos (si existe) a eventos que están ocurriendo el mes pasado, este mes y el próximo mes (dentro de la vista de cuadrícula actual)
    this.eventsLastMonth = [];
    this.eventsThisMonth = [];
    this.eventsNextMonth = [];

    if(this.options.events.length) {

      // PARKING DEL EVENTO MULTIDIA
      // Si estamos usando eventos de varios días, el inicio o final debe ser en el mes actual
      if(this.options.multiDayEvents) {
        this.eventsThisMonth = $(this.options.events).filter( function() {
          return this._clndrStartDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM")
          || this._clndrEndDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM");
        }).toArray();

        if(this.options.showAdjacentMonths) {
          var lastMonth = currentMonth.clone().subtract('months', 1);
          var nextMonth = currentMonth.clone().add('months', 1);
          this.eventsLastMonth = $(this.options.events).filter( function() {
            return this._clndrStartDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM")
          || this._clndrEndDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM");
          }).toArray();

          this.eventsNextMonth = $(this.options.events).filter( function() {
            return this._clndrStartDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM")
          || this._clndrEndDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM");
          }).toArray();
        }
      }

      // PARKING DEL EVENTO DE UN SOLO DIA
      // Si utilizamos eventos de un solo día, utilice _clndrDateObject
      else {
        this.eventsThisMonth = $(this.options.events).filter( function() {
          return this._clndrDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM");
        }).toArray();

        // Filtrar los meses adyacentes también, si la opción es verdadera
        if(this.options.showAdjacentMonths) {
          var lastMonth = currentMonth.clone().subtract('months', 1);
          var nextMonth = currentMonth.clone().add('months', 1);
          this.eventsLastMonth = $(this.options.events).filter( function() {
            return this._clndrDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM");
          }).toArray();

          this.eventsNextMonth = $(this.options.events).filter( function() {
            return this._clndrDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM");
          }).toArray();
        }
      }
    }

    // Si diff es mayor que 0, tendremos que rellenar los últimos días del mes anterior
    // Para tener en cuenta las casillas vacías de la cuadrícula.
    // También tenemos que tener en cuenta el parámetro weekOffset
    var diff = date.weekday() - this.options.weekOffset;
    if(diff < 0) diff += 7;

    if(this.options.showAdjacentMonths) {
      for(var i = 0; i < diff; i++) {
        var day = moment([currentMonth.year(), currentMonth.month(), i - diff + 1]);
        daysArray.push( this.createDayObject(day, this.eventsLastMonth) );
      }
    } else {
      for(var i = 0; i < diff; i++) {
        daysArray.push( this.calendarDay({ classes: this.options.targets.empty + " last-month" }) );
      }
    }

    //Ahora empujamos todos los días en un mes
    var numOfDays = date.daysInMonth();
    for(var i = 1; i <= numOfDays; i++) {
      var day = moment([currentMonth.year(), currentMonth.month(), i]);
      daysArray.push(this.createDayObject(day, this.eventsThisMonth) )
    }

    // ...Y si hay cajas en blanco, rellene las
    // Con los primeros días del mes siguiente
    if(this.options.showAdjacentMonths) {
      i = 1;
      while(daysArray.length % 7 !== 0) {
        var day = moment([currentMonth.year(), currentMonth.month(), numOfDays + i]);
        daysArray.push( this.createDayObject(day, this.eventsNextMonth) );
        i++;
      }
    } else {
      i = 1;
      while(daysArray.length % 7 !== 0) {
        daysArray.push( this.calendarDay({ classes: this.options.targets.empty + " next-month" }) );
        i++;
      }
    }

    return daysArray;
  };

  Clndr.prototype.createDayObject = function(day, monthEvents) {
    var eventsToday = [];
    var now = moment();
    var self = this;

    var j = 0, l = monthEvents.length;
    for(j; j < l; j++) {
      // Tenga en cuenta que los eventos aquí ya pasaron la prueba mes / año.
      //Ahora todo lo que tenemos que comparar es el momento.date (), que devuelve el día del mes.
      if(self.options.multiDayEvents) {
        var start = monthEvents[j]._clndrStartDateObject;
        var end = monthEvents[j]._clndrEndDateObject;
        // Si hoy es el mismo día de inicio o después del inicio, y
        // Si hoy es el mismo día que el final o antes del final ...
        // Semántica woohoo!
        if( ( day.isSame(start, 'day') || day.isAfter(start, 'day') ) &&
          ( day.isSame(end, 'day') || day.isBefore(end, 'day') ) ) {
          eventsToday.push( monthEvents[j] );
        }
      } else {
        if( monthEvents[j]._clndrDateObject.date() == day.date() ) {
          eventsToday.push( monthEvents[j] );
        }
      }
    }

    var extraClasses = "";

    if(now.format("YYYY-MM-DD") == day.format("YYYY-MM-DD")) {
       extraClasses += " today";
       // FECHA DEL DÍA DE HOY;
       MedicalAppointmentsToday(now.format("YYYY-MM-DD"));
       citasHoy(now.format("YYYY-MM-DD"));
    }
    if(day.isBefore(now, 'day')) {
      extraClasses += " past";
    }
    if(eventsToday.length) {
       extraClasses += " event";
    }
    if(this.month.month() > day.month()) {
       extraClasses += " adjacent-month";

       this.month.year() === day.year()
           ? extraClasses += " last-month"
           : extraClasses += " next-month";

    } else if(this.month.month() < day.month()) {
       extraClasses += " adjacent-month";

       this.month.year() === day.year()
           ? extraClasses += " next-month"
           : extraClasses += " last-month";
    }

    // Si hay restricciones, necesitamos agregar la clase inactiva a los días fuera de ellos
    if(this.options.constraints) {
      if(this.options.constraints.startDate && day.isBefore(moment( this.options.constraints.startDate ))) {
        extraClasses += " inactive";
      }
      if(this.options.constraints.endDate && day.isAfter(moment( this.options.constraints.endDate ))) {
        extraClasses += " inactive";
      }
    }

    //  Validar la fecha del momento
    if (!day.isValid() && day.hasOwnProperty('_d') && day._d != undefined) {
        day = moment(day._d);
    }

    // Nos estamos alejando de usar IDs a favor de las clases, ya que cuando
    // Usando múltiples calendarios en una página estamos violando técnicamente la
    // Unicidad de IDs.
    extraClasses += " calendar-day-" + day.format("YYYY-MM-DD");

    return this.calendarDay({
      day: day.date(),
      classes: this.options.targets.day + extraClasses,
      events: eventsToday,
      date: day
    }); 
  };

  Clndr.prototype.render = function() {
    // Deshágase del conjunto anterior de partes del calendario.
    // TODO: Averiguar si esta es la manera correcta de garantizar la recolección de basura adecuada?
    this.calendarContainer.children().remove();
    //Obtener una serie de días y espacios en blanco
    var days = this.createDaysObject(this.month);
    //Esto es para evitar un problema de alcance / denominación entre this.month y data.month
    var currentMonth = this.month;

    var data = {
      daysOfTheWeek: this.daysOfTheWeek,
      numberOfRows: Math.ceil(days.length / 7),
      days: days,
      month: this.month.format('MMMM'),
      year: this.month.year(),
      eventsThisMonth: this.eventsThisMonth,
      eventsLastMonth: this.eventsLastMonth,
      eventsNextMonth: this.eventsNextMonth,
      extras: this.options.extras
    };

    // Procesar el calendario con los datos anteriores y enlazar eventos a sus elementos
    if(!this.options.render) {
      this.calendarContainer.html(this.compiledClndrTemplate(data));
    } else {
      this.calendarContainer.html(this.options.render.apply(this, [data]));
    }

    // Si hay restricciones, necesitamos agregar la clase 'inactiva' a los controles
    if(this.options.constraints) {
      // En aras de la claridad sólo vamos a eliminar todas las clases inactivas y volver a aplicarlas cada procesamiento.
      for(target in this.options.targets) {
        if(target != this.options.targets.day) {
          this.element.find('.' + this.options.targets[target]).toggleClass('inactive', false);
        }
      }

      var start = null;
      var end = null;

      if(this.options.constraints.startDate) {
        start = moment(this.options.constraints.startDate);
      }
      if(this.options.constraints.endDate) {
        end = moment(this.options.constraints.endDate);
      }
      // Tratar primero con los controles de mes.
      // Estamos en el mes de inicio?
      if(start && this.month.isSame( start, 'month' )) {
        this.element.find('.' + this.options.targets.previousButton).toggleClass('inactive', true);
      }
      // are we at the end month?
      if(end && this.month.isSame( end, 'month' )) {
        this.element.find('.' + this.options.targets.nextButton).toggleClass('inactive', true);
      }
      // Estamos en el mes final?
      if(start && moment(start).subtract('years', 1).isBefore(moment(this.month).subtract('years', 1)) ) {
        this.element.find('.' + this.options.targets.previousYearButton).toggleClass('inactive', true);
      }
      // ¿Qué tal el próximo año?
      if(end && moment(end).add('years', 1).isAfter(moment(this.month).add('years', 1)) ) {
        this.element.find('.' + this.options.targets.nextYearButton).toggleClass('inactive', true);
      }
      //¿hoy? Podríamos poner esto en init (), pero queremos apoyar al usuario cambiando las restricciones en una instancia viva.
      if(( start && start.isAfter( moment(), 'month' ) ) || ( end && end.isBefore( moment(), 'month' ) )) {
        this.element.find('.' + this.options.targets.today).toggleClass('inactive', true);
      }
    }


    if(this.options.doneRendering) {
      this.options.doneRendering.apply(this, []);
    }
  };

  Clndr.prototype.bindEvents = function() {
    var $container = $(this.element);
    var self = this;

    // Orientar los elementos del día y darles los eventos de clic
    $container.on('click', '.'+this.options.targets.day, function(event) {
      if(self.options.clickEvents.click) {
        var target = self.buildTargetObject(event.currentTarget, true);
        self.options.clickEvents.click.apply(self, [target]);
      }
      // Si adjacentDaysChangeMonth está activado, necesitamos cambiar el mes aquí.
      if(self.options.adjacentDaysChangeMonth) {
        if($(event.currentTarget).is(".last-month")) {
          self.backActionWithContext(self);
        } else if($(event.currentTarget).is(".next-month")) {
          self.forwardActionWithContext(self);
        }
      }
    });
    // Apunte las casillas vacías del calendario también
    $container.on('click', '.'+this.options.targets.empty, function(event) {
      if(self.options.clickEvents.click) {
        var target = self.buildTargetObject(event.currentTarget, false);
        self.options.clickEvents.click.apply(self, [target]);
      }
      if(self.options.adjacentDaysChangeMonth) {
        if($(event.currentTarget).is(".last-month")) {
          self.backActionWithContext(self);
        } else if($(event.currentTarget).is(".next-month")) {
          self.forwardActionWithContext(self);
        }
      }
    });

    // Enlazar los botones anterior, siguiente y actual
    $container
      .on('click', '.'+this.options.targets.previousButton, { context: this }, this.backAction)
      .on('click', '.'+this.options.targets.nextButton, { context: this }, this.forwardAction)
      .on('click', '.'+this.options.targets.todayButton, { context: this }, this.todayAction)
      .on('click', '.'+this.options.targets.nextYearButton, { context: this }, this.nextYearAction)
      .on('click', '.'+this.options.targets.previousYearButton, { context: this }, this.previousYearAction);
  }

  // Si el usuario ha proporcionado una devolución de llamada de clics, nos gustaría darles algo agradable para trabajar.
  // BuildTargetObject toma el elemento DOM al que se hizo clic y devuelve un objeto con
  // El elemento DOM, los eventos y la fecha (si los dos últimos existen). Actualmente se basa en el id,
  // Sin embargo, sería bueno usar un atributo de datos en el futuro.
  Clndr.prototype.buildTargetObject = function(currentTarget, targetWasDay) {
    // Este es nuestro objeto objetivo predeterminado, suponiendo que llegamos a un día vacío sin eventos.
    var target = {
      element: currentTarget,
      events: [],
      date: null
    };
    // ¿Hicimos clic en un día o simplemente un cuadro vacío?
    if(targetWasDay) {
      var dateString;

      // Nuestro identificador está en la lista de classNames. ¡Encuéntralo!
      var classNameIndex = currentTarget.className.indexOf('calendar-day-');
      if(classNameIndex !== 0) {
        // Nuestro identificador único tiene siempre 23 caracteres.
        // Si esto se siente un poco wonky, que es probablemente porque es.
        // Abierto a sugerencias sobre cómo mejorar este tipo.
        dateString = currentTarget.className.substring(classNameIndex + 13, classNameIndex + 23);
        target.date = moment(dateString);
      } else {
        target.date = null;
      }

      // ¿Tenemos eventos?
      if(this.options.events) {
        // Son algunos de los eventos que suceden hoy?
        if(this.options.multiDayEvents) {
          target.events = $.makeArray( $(this.options.events).filter( function() {
            // Filtrar las fechas hasta las que coinciden.
            return ( ( target.date.isSame(this._clndrStartDateObject, 'day') || target.date.isAfter(this._clndrStartDateObject, 'day') ) &&
              ( target.date.isSame(this._clndrEndDateObject, 'day') || target.date.isBefore(this._clndrEndDateObject, 'day') ) );
          }) );
        } else {
          target.events = $.makeArray( $(this.options.events).filter( function() {
            // Filtrar las fechas hasta las que coinciden.
            return this._clndrDateObject.format('YYYY-MM-DD') == dateString;
          }) );
        }
      }
    }

    return target;
  }

  // Los manejadores de clics en bindEvents necesitan un contexto, por lo que son wrappers
  // A las funciones reales. Todo: ¿mejor manera de manejar esto?
  Clndr.prototype.forwardAction = function(event) {
    var self = event.data.context;
    self.forwardActionWithContext(self);
  };

  Clndr.prototype.backAction = function(event) {
    var self = event.data.context;
    self.backActionWithContext(self);
  };

  // Estos se llaman directamente, excepto para los manejadores de clics bindEvent,
  // Donde forwardAction y backAction proxy a estos chicos.
  Clndr.prototype.backActionWithContext = function(self) {
    // Antes de hacer cualquier cosa, compruebe si hay una clase inactiva en el control de mes.
    //Si lo hace, queremos volver y no tomar ninguna acción.
    if(self.element.find('.' + self.options.targets.previousButton).hasClass('inactive')) {
      return;
    }

    // Está restando un mes va a cambiar el año?
    var yearChanged = !self.month.isSame( moment(self.month).subtract('months', 1), 'year');
    self.month.subtract('months', 1);

    self.render();

    if(self.options.clickEvents.previousMonth) {
      self.options.clickEvents.previousMonth.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onMonthChange) {
      self.options.clickEvents.onMonthChange.apply( self, [moment(self.month)] );
    }
    if(yearChanged) {
      if(self.options.clickEvents.onYearChange) {
        self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
      }
    }
  };

  Clndr.prototype.forwardActionWithContext = function(self) {
    //Antes de hacer cualquier cosa, compruebe si hay una clase inactiva en el control de mes.
    // Si lo hace, queremos volver y no tomar ninguna acción.
    if(self.element.find('.' + self.options.targets.nextButton).hasClass('inactive')) {
      return;
    }

    // Está agregando un mes va a cambiar el año?
    var yearChanged = !self.month.isSame( moment(self.month).add('months', 1), 'year');
    self.month.add('months', 1);

    self.render();

    if(self.options.clickEvents.nextMonth) {
      self.options.clickEvents.nextMonth.apply(self, [moment(self.month)]);
    }
    if(self.options.clickEvents.onMonthChange) {
      self.options.clickEvents.onMonthChange.apply(self, [moment(self.month)]);
    }
    if(yearChanged) {
      if(self.options.clickEvents.onYearChange) {
        self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
      }
    }
  };

  Clndr.prototype.todayAction = function(event) {
    var self = event.data.context;

    // Cambiamos los meses cuando el botón de hoy fue golpeado?
    var monthChanged = !self.month.isSame(moment(), 'month');
    var yearChanged = !self.month.isSame(moment(), 'year');

    self.month = moment().startOf('month');

    // Disparar el controlador de eventos de hoy, independientemente de si el mes ha cambiado.
    if(self.options.clickEvents.today) {
      self.options.clickEvents.today.apply( self, [moment(self.month)] );
    }

    if(monthChanged) {
      // No hay necesidad de volver a hacer si no cambiamos meses.
      self.render();

      self.month = moment();
      // Dispara la devolución de llamada onMonthChange
      if(self.options.clickEvents.onMonthChange) {
        self.options.clickEvents.onMonthChange.apply( self, [moment(self.month)] );
      }
      // Tal vez el fuego de la devolución de llamada onYearChange?
      if(yearChanged) {
        if(self.options.clickEvents.onYearChange) {
          self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
        }
      }
    }
  };

  Clndr.prototype.nextYearAction = function(event) {
    var self = event.data.context;
    // Antes de hacer cualquier cosa, compruebe si hay una clase inactiva en el control de mes.
    // Si lo hace, queremos volver y no tomar ninguna acción.
    if(self.element.find('.' + self.options.targets.nextYearButton).hasClass('inactive')) {
      return;
    }

    self.month.add('years', 1);
    self.render();

    if(self.options.clickEvents.nextYear) {
      self.options.clickEvents.nextYear.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onMonthChange) {
      self.options.clickEvents.onMonthChange.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onYearChange) {
      self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
    }
  };

  Clndr.prototype.previousYearAction = function(event) {
    var self = event.data.context;
    // Antes de hacer cualquier cosa, compruebe si hay una clase inactiva en el control de mes.
    // Si lo hace, queremos volver y no tomar ninguna acción.
    if(self.element.find('.' + self.options.targets.previousYear).hasClass('inactive')) {
      return;
    }

    self.month.subtract('years', 1);
    self.render();

    if(self.options.clickEvents.previousYear) {
      self.options.clickEvents.previousYear.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onMonthChange) {
      self.options.clickEvents.onMonthChange.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onYearChange) {
      self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
    }
  };

  Clndr.prototype.forward = function(options) {
    this.month.add('months', 1);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onMonthChange) {
        this.options.clickEvents.onMonthChange.apply( this, [moment(this.month)] );
      }

      // Entramos en un nuevo año
      if (this.month.month() === 0 && this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }

    return this;
  }

  Clndr.prototype.back = function(options) {
    this.month.subtract('months', 1);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onMonthChange) {
        this.options.clickEvents.onMonthChange.apply( this, [moment(this.month)] );
      }

      // Nos fuimos todo el camino de vuelta al año anterior
      if (this.month.month() === 11 && this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }

    return this;
  }

  // Nombres alternativos para mayor comodidad
  Clndr.prototype.next = function(options) {
    this.forward(options);
    return this;
  }

  Clndr.prototype.previous = function(options) {
    this.back(options);
    return this;
  }

  Clndr.prototype.setMonth = function(newMonth, options) {
    // Acepta 0 - 11 o un nombre de mes completo / parcial, p. "Jan", "Febrero", "Mar"
    this.month.month(newMonth);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onMonthChange) {
        this.options.clickEvents.onMonthChange.apply( this, [moment(this.month)] );
      }
    }
    return this;
  }

  Clndr.prototype.nextYear = function(options) {
    this.month.add('year', 1);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }
    return this;
  }

  Clndr.prototype.previousYear = function(options) {
    this.month.subtract('year', 1);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }
    return this;
  }

  Clndr.prototype.setYear = function(newYear, options) {
    this.month.year(newYear);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }
    return this;
  }

  Clndr.prototype.setEvents = function(events) {
    // Pasar por cada evento y agregar un objeto momento
    if(this.options.multiDayEvents) {
      this.options.events = this.addMultiDayMomentObjectsToEvents(events);
    } else {
      this.options.events = this.addMomentObjectToEvents(events);
    }

    this.render();
    return this;
  };

  Clndr.prototype.addEvents = function(events) {
    // Pasar por cada evento y agregar un objeto momento
    if(this.options.multiDayEvents) {
      this.options.events = $.merge(this.options.events, this.addMultiDayMomentObjectsToEvents(events));
    } else {
      this.options.events = $.merge(this.options.events, this.addMomentObjectToEvents(events));
    }

    this.render();
    return this;
  };

  Clndr.prototype.addMomentObjectToEvents = function(events) {
    var self = this;
    var i = 0, l = events.length;
    for(i; i < l; i++) {
      // Cosas un _clndrDateObject en cada evento, que realmente, realmente no debe ser
      // Sobreponiendo cualquier objeto existente ... Hombre que sería raro.
      events[i]._clndrDateObject = moment( events[i][self.options.dateParameter] );
    }
    return events;
  }

  Clndr.prototype.addMultiDayMomentObjectsToEvents = function(events) {
    var self = this;
    var i = 0, l = events.length;
    for(i; i < l; i++) {
      events[i]._clndrStartDateObject = moment( events[i][self.options.multiDayEvents.startDate] );
      events[i]._clndrEndDateObject = moment( events[i][self.options.multiDayEvents.endDate] );
    }
    return events;
  }

  Clndr.prototype.calendarDay = function(options) {
    var defaults = { day: "", classes: this.options.targets.empty, events: [], date: null };
    return $.extend({}, defaults, options);
  }

  $.fn.clndr = function(options) {
    if( !$.data( this, 'plugin_clndr') ) {
      var clndr_instance = new Clndr(this, options);
      $.data(this, 'plugin_clndr', clndr_instance);
      return clndr_instance;
    }
  }

})( jQuery, window, document );


/*********************************************************************
********************** LISTAR CITAS HOME *****************************
**********************************************************************/

function MedicalAppointmentsToday(data){
  $rol= $('.nomb_doc').attr('id');
  $.ajax({
    url: 'php/entrar.php',
    type: 'POST',
    data: {adm_today: data, rol:$rol},
    beforeSend:function(){
        
    },
    success:function(html){
        $('#citas_hoy').html(html);
        
    },
    error:function(html){

    }
  })
}

/*********************************************************************
********************** NUMERO CITAS HOY ******************************
**********************************************************************/

function citasHoy(fecha){
  $rol= $('.nomb_doc').attr('id');
  $.ajax({
    url: 'php/entrar.php',
    type: 'POST',
    data: {tot_cit: fecha, doc: $rol},
    beforeSend:function(){
      
    },
    success:function(html){
      $('div#citas_pendientes').html(html);
        //$('#citas_hoy').html(html);
      },
      error:function(html){

      }
    })
  
}

