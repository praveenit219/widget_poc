(function(formname, custId) {

    //Initialize widget data
    var host = location.host;
    var formData = [];
    var widgetWrapper = '.embedWidget';

    var travelFormTemplate = '<div class="apiwidgetContainer">';
        travelFormTemplate += '<h4>Travel</h4><p class="widgeterr" id="widgeterr">Please enter valid data to proceed.</p>';
        travelFormTemplate += '<form action="" name="TravelQuoteForm">';
        travelFormTemplate += '<div class="widgetField">';
        travelFormTemplate += '<label>Where</label>';
        travelFormTemplate += '<select name="destination" class="destination" id="destination">';
        travelFormTemplate += '<option value="">Select</option>';
        travelFormTemplate += '<option value="SIN">Singapore</option>';
        travelFormTemplate += '<option value="IND">India</option>';
        travelFormTemplate += '<option value="UK">United Kingdom</option>';
        travelFormTemplate += '<option value="USA">United States</option>' ;
        travelFormTemplate += '<option value="CA">Canada</option>';
        travelFormTemplate += '<option value="NZ">Newzealand</option>';
        travelFormTemplate += '<option value="AUS">Australia</option>';
        travelFormTemplate += '</select>';
        travelFormTemplate += '</div>';
        travelFormTemplate += '<div class="widgetField">';
        travelFormTemplate += '<label>When</label>';
        travelFormTemplate += '<input type="date" name="csd" id="csd" class="csd"/>';
        travelFormTemplate += '<input type="date" name="ced" id="ced" class="ced"/>';
        travelFormTemplate += '</div>';
        travelFormTemplate += '<div class="widgetField">';
        travelFormTemplate += '<label>Who</label>';
        travelFormTemplate += '<select name="travelType" class="travelType" id="travelType">';
        travelFormTemplate += '<option value="">Select</option>';
        travelFormTemplate += '<option value="Individual">Individual</option>';
        travelFormTemplate += '<option value="Family">Family</option>';
        travelFormTemplate += '<option value="Group">Group</option>';
        travelFormTemplate += '</select>';
        travelFormTemplate += '</div>';
        travelFormTemplate += '<div class="widgetField">';
        travelFormTemplate += '<input type="button" name="travelQuoteSubmit" value="Get Quote"/>';
        travelFormTemplate += '</div>';
        travelFormTemplate += '</form>';
        travelFormTemplate += '</div>';

    var custmerFormsTemplate = '<div class="apiwidgetContainer">';
        custmerFormsTemplate += '<h4>Customer Forms</h4>';
        custmerFormsTemplate += '<p class="widgeterr" id="widgeterr">Please enter valid data to proceed.</p>';
        custmerFormsTemplate += '<form action="" name="CustomerForms">';
        custmerFormsTemplate += '<div class="widgetField">';
        custmerFormsTemplate += ' <label>Salutation</label>';
        custmerFormsTemplate += '<select name="salution" class="salution" id="salution">';
        custmerFormsTemplate += ' <option value="">Select</option>';
        custmerFormsTemplate += '<option value="Single">Mr</option>';
        custmerFormsTemplate += '<option value="Annual">Mrs</option>';
        custmerFormsTemplate += '<option value="Annual">Ms</option>';
        custmerFormsTemplate += ' <option value="Annual">Mdm</option>';
        custmerFormsTemplate += ' </select>';
        custmerFormsTemplate += '</div>';
        custmerFormsTemplate += '<div class="widgetField">';
        custmerFormsTemplate += '<label>Name</label>';
        custmerFormsTemplate += '<input type="text" name="givenname" id="givenname" value=""/>';
        custmerFormsTemplate += ' </div>';
        custmerFormsTemplate += '<div class="widgetField">';
        custmerFormsTemplate += '  <label>NRIC/Passport Number</label>';
        custmerFormsTemplate += ' <input type="text" name="nric" id="nric" value=""/>';
        custmerFormsTemplate += ' </div>';
        custmerFormsTemplate += '<div class="widgetField">';
        custmerFormsTemplate += '<label>Email</label>';
        custmerFormsTemplate += ' <input type="email" name="email" id="email" value=""/>';
        custmerFormsTemplate += ' </div>';
        custmerFormsTemplate += '<div class="widgetField">';
        custmerFormsTemplate += ' <label>Contact Number</label>';
        custmerFormsTemplate += '<input type="contact" name="contact" id="email" value=""/>';
        custmerFormsTemplate += '</div>';
        custmerFormsTemplate += '<div class="widgetField">';
        custmerFormsTemplate += ' <input type="button" name="customerFormsSubmit" value="Submit"/>';
        custmerFormsTemplate += ' </div>';
        custmerFormsTemplate += '</form>';
        custmerFormsTemplate += '</div>';

    var widgetTemplateURL = {
        //'trvlforms': 'http://' + host + '/apiwidgets/travelapi.html',
        //'custforms': 'http://' + host + '/apiwidgets/custforms.html',
        'trvlforms': travelFormTemplate,
        'custforms':custmerFormsTemplate
    };
    var widgetSubmitURL = {
        'trvlforms': 'https://tridentspringrequestresponse.herokuapp.com/trident/requestResponse/travelInsurance',
        'custforms': 'https://tridentspringrequestresponse.herokuapp.com/trident/requestResponse/travelInsurance'
    };

    var mockResponse = {
        'trvlforms': '<div class="widgetresponse"><p><b>Discount applied</b></p> <p> Percentage: 30% </p>' +
            '<p>Plan Type: Travel Lite </p> <p>Amount: 231.60</p> <p> Currency: SGD </p><p><input type="button" class="tryagin" value="Quote again"/></p></div>',
        'custforms': '<div class="widgetresponse"><span>Thank you for contact us.</span><p><input type="button" class="tryagin" value="Try Again"/></p></div>'
    };

    //Methods for construct widget template
    var getHTML = function(htmlparams) {

       /* if (!window.XMLHttpRequest) return;
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (htmlparams.callback && typeof(htmlparams.callback) === 'function') {
                htmlparams.callback(this.responseXML, htmlparams.widgetcls, htmlparams.widgetname);
            }
        }
        xhr.open('GET', htmlparams.widgetUrl, true);
        xhr.responseType = 'document';
        xhr.send();*/

        if (htmlparams.callback && typeof(htmlparams.callback) === 'function') {
                htmlparams.callback(widgetTemplateURL[htmlparams.widgetname], htmlparams.widgetcls, htmlparams.widgetname);
            }
    };

    //Submit callback for widget form

    var submitCallback = function(response, widgetClass, widget) {

        var widgetContainers = document.querySelectorAll('.' + widgetClass);
        for (var i = 0; i < widgetContainers.length; ++i) {
            var widgetContainer = widgetContainers[i];
            widgetContainer.innerHTML = response;
        }

        var widgetFormInputs = document.querySelectorAll('.' + widgetClass + ' form input');
        var widgetSubmitButton = widgetFormInputs[widgetFormInputs.length - 1];
        if (!widgetSubmitButton) {
            return;
        }
        if (widgetSubmitButton.addEventListener) {
            widgetSubmitButton.addEventListener('click', widgetFormSubmit.bind(this, {
                'widgetcls': widgetClass,
                'widget': widget
            }));
        } else if (widgetSubmitButton.attachEvent) {
            widgetSubmitButton.attachEvent('onclick', widgetFormSubmit.bind(this, {
                'widgetcls': widgetClass,
                'widget': widget
            }));
        } else {
            widgetSubmitButton.onclick = widgetFormSubmit.bind(this, {
                'widgetcls': widgetClass,
                'widget': widget
            });
        }
    };

    var widgetFormSubmit = function(widgetinfo) {

        var widgetForm = document.querySelectorAll('.' + widgetinfo.widgetcls + ' form');
        var errorDiv = document.querySelectorAll('.' + widgetinfo.widgetcls + ' .widgeterr');
        var widgetwrapper = document.querySelectorAll('.' + widgetinfo.widgetcls);

        getWidgetFormData(widgetForm[0]);

        var data = new FormData();

        if (formData.length > 0) {

            errorDiv[0].style.display = 'none';
            widgetwrapper[0].style.border = "1px solid green";
            for (var i = 0; i < formData.length; i++) {
                data.append(formData[i].field, formData[i].value);
            }
           /* if (!window.XMLHttpRequest) return;
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                console.log(xhr.responseText);
            }
            xhr.onerror = function() {
                console.log(xhr.responseText);
            }
            xhr.open('POST', widgetSubmitURL[widgetinfo.widget], true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send(data);*/

            var widgetContainers = document.querySelectorAll('.' + widgetinfo.widgetcls);
            for (var i = 0; i < widgetContainers.length; ++i) {
                var widgetContainer = widgetContainers[i];
                widgetContainer.style.display = "block";
                widgetContainer.innerHTML = mockResponse[widgetinfo.widget];

                var widgettryagainBtns = document.querySelectorAll('.' + widgetinfo.widgetcls + ' .widgetresponse  .tryagin');
                var widgettrygainBtn = widgettryagainBtns[widgettryagainBtns.length - 1];
                if (!widgettrygainBtn) {
                    return;
                }
                var htmlParams = {
                    'widgetUrl': widgetTemplateURL[widgetinfo.widget],
                    'callback': submitCallback,
                    'widgetcls': widgetinfo.widgetcls,
                    'widgetname': widgetinfo.widget
                };
                if (widgettrygainBtn.addEventListener) {
                    widgettrygainBtn.addEventListener('click', getHTML.bind(this, htmlParams));
                } else if (widgettrygainBtn.attachEvent) {
                    widgettrygainBtn.attachEvent('onclick', getHTML.bind(this, htmlParams));
                } else {
                    widgettrygainBtn.onclick = getHTML.bind(this, htmlParams);
                }
            }
        } else {
            errorDiv[0].style.display = 'block';
            widgetwrapper[0].style.border = "1px solid #bd2624";
        }
    };

    var injectStyles = function() {

        var css = ".apiwidgetContainer,.widgetResponse { margin:0.5em;float:left;width:100%;max-width:100%;padding:0.5em;}";
        css += ".widgetResponse { display:none; padding:0.5em;}";
        css += ".apiwidgetContainer .widgetField { width:100%;float:left;margin:0 0 0.5em 0;}";
        css += ".apiwidgetContainer label { width:20%;float:left;word-wrap:break-word;}";
        css += ".apiwidgetContainer select,.apiwidgetContainer input { width:71%;float:left;}";
        css += ".apiwidgetContainer input[type='submit'] { width:auto;float:left;}";
        css += ".apiwidgetContainer input[type='date'] { width:35%;float:left; margin-right:5px;}";
        css += ".tryagin {margin:0.5em;}";
        css += ".widgeterr {display:none;padding:0.3em;background:#bd2624; color:#FFF;}";
        css += ".embedWidget { background : #FFF;border:1px solid green; border-radius:5px; min-width:400px; float:left;max-width:550px; margin:0 1em 0 0;padding:0.5em;}";

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        var head = document.head || document.querySelector('head');
        head.appendChild(style);
    }

    var initwidget = function() {

        var widgetContainers = document.querySelectorAll(widgetWrapper);
        for (var i = 0; i < widgetContainers.length; ++i) {
            var widgetContainer = widgetContainers[i];
            var widget = widgetContainer.dataset.widget;
            var widgetClass = 'widget_' + widget;
            var classList = widgetContainer.className.split(" ");
            if (classList.indexOf(widgetClass) == -1) {
                widgetContainer.className += " " + widgetClass;
            }
            if (widget) {
                if (widgetTemplateURL.hasOwnProperty(widget)) {
                    var htmlParams = {
                        'widgetUrl': widgetTemplateURL[widget],
                        'callback': submitCallback,
                        'widgetcls': widgetClass,
                        'widgetname': widget
                    };
                    getHTML(htmlParams);
                } else {
                    widgetContainer.innerHTML = "Widget not found."
                }
            } else {
                widgetContainer.innerHTML = "Please mention widget name.";
            }
        }

        injectStyles();
    };

    var getWidgetFormData = function(widgetForm) {

        if (!widgetForm || widgetForm.nodeName !== "FORM") {
            return;
        }
        var i, j, q = [];
        for (i = widgetForm.elements.length - 1; i >= 0; i = i - 1) {
            if (widgetForm.elements[i].name === "") {
                continue;
            }
            switch (widgetForm.elements[i].nodeName) {
                case 'INPUT':
                    switch (widgetForm.elements[i].type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                            //case 'button':
                            // case 'reset':
                            //case 'submit':
                            if (widgetForm.elements[i].value) {
                                q.push({
                                    'field': widgetForm.elements[i].name,
                                    'value': encodeURIComponent(widgetForm.elements[i].value)
                                });
                            }

                            break;
                        case 'checkbox':
                        case 'radio':
                            if (form.elements[i].checked) {
                                q.push({
                                    'field': widgetForm.elements[i].name,
                                    'value': encodeURIComponent(widgetForm.elements[i].value)
                                });
                            }
                            break;
                    }
                    break;
                case 'file':
                    break;
                case 'TEXTAREA':
                    if (widgetForm.elements[i].value) {
                        q.push({
                            'field': widgetForm.elements[i].name,
                            'value': encodeURIComponent(widgetForm.elements[i].value)
                        });
                    }
                    break;
                case 'SELECT':
                    switch (widgetForm.elements[i].type) {
                        case 'select-one':
                            if (widgetForm.elements[i].value) {
                                q.push({
                                    'field': widgetForm.elements[i].name,
                                    'value': encodeURIComponent(widgetForm.elements[i].value)
                                });
                            }
                            break;
                        case 'select-multiple':
                            for (j = widgetForm.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (widgetForm.elements[i].options[j].selected) {
                                    q.push({
                                        'field': widgetForm.elements[i].name,
                                        'value': encodeURIComponent(widgetForm.elements[i].options[j].value)
                                    });
                                }
                            }
                            break;
                    }
                    break;
                case 'BUTTON':
                    switch (widgetForm.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            //q.push(widgetForm.elements[i].name + "=" + encodeURIComponent(widgetForm.elements[i].value));
                            break;
                    }
                    break;
            }
        }
        return formData = q;
        //formData = q.join("&");
    }

    initwidget();

}());
