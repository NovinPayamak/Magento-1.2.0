/**
 * Setup select.
 */
document.observe('dom:loaded', function(event) {
	var select = $('smsnotify_general_local_country');
	var hidden = $('smsnotify_general_local_country-hidden');
	
	if (select && hidden)
	{
		select.childElements().each(function(option, index) {
			if (option.value == hidden.value)
				select.selectedIndex = index;
		});
	}
	
	var select = $('smsnotify_general_min_length_with_prefix');
	var hidden = $('smsnotify_general_min_length_with_prefix-hidden');
	
	if (select && hidden)
	{
		select.childElements().each(function(option, index) {
			if (option.value == hidden.value)
				select.selectedIndex = index;
		});
	}
});


/**
 * Number Filters Util 
 * Library of some useful functions which is missing
 * in the standard JavaScript.
 */
NFU = {
    

    /**
     * Function walks through all element's in the list and calls
     * callback whith item and index as arguments.
     * 
     * If list or callback is not specifie function
     * does nothing.
     */
    each: function(list, callback)
    {    
        if (!list || !callback)
            return;
        
        for (var i=0; i<list.length; i++)
            callback(list[i], i);
    },
    
    
    /**
     * Function returns first item of a list which satisfies a condition.
     * Condition is a function which returns a bool value (true/false).
     * 
     * If the condition is not defined function returns first
     * item of array.
     * 
     * If list is not specified or any child does not satisfy
     * the condition then function returns null.
     */
    first: function(list, condition)
    {
        if (!list)
            return null;
        
        if (!condition)
            condition = function() { return true; }
        
        for (var i=0; i<list.length; i++)
            if (condition(list[i]))
                return list[i];
            
        return null;
    },
    
    
    /**
     * Function returns last item of a list which satisfies a condition.
     * 
     * If the condition is not defined then function returns last
     * item of array.
     * 
     * If the list is not specified or any child does not satisfy
     * the condition then function returns null.
     */
    last: function(list, condition)
    {
        if (!list)
            return null;
        
        if (!condition)
            condition = function() { return true; }
        
        var lastsatisfy = null;
        
        for (var i=0; i<list.length; i++)
            if (condition(list[i]))
                lastsatisfy = list[i];
            
        return lastsatisfy;
    },
    
    
    /**
     * Function walk through all chars in a string and
     * call a callback on each.
     * 
     * You can walk forward (reverse = false) or
     * backward (reverse = true).
     * 
     * If string or the callback is not defined function
     * does nothing.
     */
    eachChars: function(string, reverse, callback)
    {
        if (!string || !callback)
            return;
        
        var start = reverse ? string.length-1 : 0;
        var end   = reverse ? 0 : string.length;
        var step  = reverse ? -1 : +1;
        
        for (i=start; i!=end; i=i+step) {
            callback(string.charAt(i), i);
        }
    },
    
    
    /**
     * Function walks through all childs of an element
     * with specified a tagNam and call a callable
     * on each.
     * 
     * Callable is a function.
     * 
     * If tagName is not specified function walks
     * through all chidls (include text nodes).
     * 
     * If the element or the callable is not specified
     * function does nothing.
     */
    eachChilds: function(element, tagName, callable)
    {
        if (!element || !callable)
            return;
        
        var childs = NFU.getChilds(element, tagName);
        NFU.each(childs, callable);
    },
    
    
    /**
     * Function get first element with tagName which
     * satisfy a condition.
     * 
     * If tagName is not specified function returns
     * any first element which satisfy a condition.
     * 
     * If the condition is not defined function returns
     * first element withot testing.
     * 
     * If element is not specified function does nothing.
     */
    firstChild: function(element, tagName, condition)
    {
        var childs = NFU.getChilds(element, tagName);
        return NFU.first(childs, condition);
    },
    
    
    /**
     * Function get last element with tagName which
     * satisfy a condition.
     * 
     * If tagName is not specified function returns
     * any last element which satisfy a condition.
     * 
     * If the condition is not defined function returns
     * last element withot testing.
     * 
     * If element is not specified function does nothing.
     */
    lastChild: function(element, tagName, condition)
    {
        var childs = NFU.getChilds(element, tagName);
        return NFU.last(childs, condition);
    },
    
    
    /**
     * Function get first parent with tagName.
     * 
     * If element is not define or there is no
     * parent with specified tagName function returns
     * null.
     * 
     * If tagName is not specified method retruns
     * first parent no matter tagName.
     */
    firstParent: function(element, tagName)
    {
        if (!element)
            return null;
        
        var parent = element.parentNode;
        
        while (parent && tagName && parent.tagName != tagName)
            parent = parent.parentNode;
        
        if (parent && tagName && parent.tagName == tagName)
            return parent;
        else
            return null;
    },
    
    
    /**
     * Function rerurns all element's childrens.
     * 
     * Note searching is non-recursive there are returned only
     * childrens in the first "generations".
     * 
     * You can restrict visited childrens by tag name.
     * 
     * If tag name is not specified function returns all
     * childrens (e.g: text nodes)
     * 
     * If element is not specifie function
     * does nothing.
     */
    getChilds: function(element, tagName)
    {
        if (!element)
            return;
        
        var result = [];
        
        for (var i=0; i<element.childNodes.length; i++)
        {
            if (!tagName || (element.childNodes[i].tagName == tagName))
            {
                result.push(element.childNodes[i]);
            }
        }
        
        return result;
    },
    
    
    /**
     * Function rerurns all element's childrens.
     * 
     * Note searching is recursive (deep) there are returned all
     * childrens.
     * 
     * You can restrict visited childrens by tag name.
     * 
     * If tag name is not specified function returns all
     * childrens (e.g: text nodes)
     * 
     * If element is not specifie function
     * does nothing.
     */
    getChildsRecursively: function(element, tagName)
    {
        if (!element)
            return;
        
        var result = [];
        
        for (var i=0; i<element.childNodes.length; i++)
        {
            if (!tagName || (element.childNodes[i].tagName == tagName))
            {
                result.push(element.childNodes[i]);
            }
            
            NFU.each(NFU.getChildsRecursively(element.childNodes[i], tagName), function(child) {
                result.push(child);
            });
        }
        
        return result;
    },
    
    
    /**
     * Function returns all element which satisfy className
     * and tagName.
     * 
     * Argument className is mandatory, if missing function
     * returns empty array.
     * 
     * Argument tagName is optional.
     */
    getElementsByClassName: function(className, tagName)
    {
        if (!className)
            return [];
        
        if (!tagName)
            tagName = '*';
        
        var result = [];
        
        var elements = document.getElementsByTagName(tagName);
        
        for (var i=0; i<elements.length; i++)
            if (NFU.hasClassName(elements[i], className))
                result.push(elements[i]);
               
        return result;
    },
    
    
    /**
     * Function determines whether element's attribute 
     * "className" contains a className or not
     * 
     * element - tested element
     * className - tested className
     * 
     * Function returns true when element's attribute "className"
     * contains className, otherwise function returns false.
     * 
     * If element or className is not defined function returns false.
     */
    hasClassName: function(element, className)
    {    
        if (!element || !className)
            return false;
        
        var reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
        
        return reg.test(element.className);
    },
    
    
    /**
     * Function remove a className from the class attribute
     * of an element.
     * 
     * If element or className is not specified function
     * does nothing.
     */
    removeClassName: function(element, className)
    {
        if (!element || !className)
            return;
        
        element.className = element.className.replace(className, '');
    },
    
    
    /**
     * Function add a className to an element.
     * 
     * If element or className is not specified or element
     * already has className function does nothing.
     */
    addClassName: function(element, className)
    {
        if (!element || !className)
            return false;
        
        if (!NFU.hasClassName(element, className))
            element.className = element.className + " " + className;
    }
    
    
};


/**
 * 
 */
function FilterTable(id, filters)
{
    /* this instance */
    var self = this;
    
    
    /* if of element TABLE represented this filters */
    this.id = id;
    
    
    /* instance of ancestor object */
    this.filters = filters;
    
    
    /* TABLE element represented this filters */
    this.table = document.getElementById(id);
    /* ROW element which is template for making another rows */
    this.template_row = document.getElementById(id+'-template');
    /* INPUT fields where are stored serialized values */
    this.field = document.getElementById(id+'-field');
    /* SELECT element with countries (you can switch the lists of filters by this) */
    this.country_select =  document.getElementById(this.id+'-country');
    
    
    /**
     * Internal data.
     * Here are stored rows for all countries. This is important
     * because there may be filters for not selected country.
     * 
     * {
     *  country1 => [row1, row2, ...], 
     *  country2 => [row1, row2, ...]
     *  ...
     * }
     */
    this.data = {};
        
    
    /**
     * Add filter to table for a country. If the country
     * is not specified function gets current displayed country.
     * 
     * This function makes a TR element for filter and
     * insert it to internal this.data.
     * 
     * If there is displayed the country which is 
     * the inserted filter assigned for then the row
     * is appended to table.
     * 
     * Function does not validate filter.
     * Function does not check the duplicity.
     */
    this.addFilter = function(filter, country)
    {
        // country is not specified, get current displayed
        if (!country)
            country = this.getCurrentCountry();
        
        // create new row by template
        var newrow = this.template_row.cloneNode(true);
        
        // clear some attributes
        newrow.id = "";
        newrow.style.display = "";
       
        // fill data
        NFU.each(NFU.getChildsRecursively(newrow, 'SPAN'), function(span) {
            if (NFU.hasClassName(span, 'value'))
                span.innerHTML = filter;
            if (NFU.hasClassName(span, 'prefix'))
                span.innerHTML = self.filters.getDialingCode(country);
        });

        // assign new row to data
        if (this.data[country])
            this.data[country].push(newrow);
        else
            this.data[country] = [newrow];

        // display row immediatly for current country
        if (country == this.getCurrentCountry())
            this.table.appendChild(newrow);
      
        // update input field with serialized data
        this.updateField();
    };
    
    
    /**
     * Update existed row by a new filter value.
     * 
     * Function expected exactly TR element (they
     * are stored in this.data).
     */
    this.updateFilter = function(element, filter)
    {
        // search span 'value' and update them
        NFU.each(NFU.getChildsRecursively(element, 'SPAN'), function(span) {
            if (NFU.hasClassName(span, 'value'))
                span.innerHTML = filter;
        });
        
        // update input field with serialized data
        this.updateField();
    };
    
    
    /**
     * Remove a filter specified by its TR tag or some of
     * its children (row).
     * 
     * If TR tag is not found function does nothing
     */
    this.removeFilter = function(row)
    {
        // search parent TR
        if (row.tagName != 'TR')
            row = NFU.firstParent(row, 'TR');
        if (row.tagName != 'TR')
            return;
        
        // remove row from internal data
        for (var country in this.data) {
            var index = this.data[country].indexOf(row);
            if (index != -1)
                this.data[country].splice(index, 1);
        }
        
        // remove from table immediatly
        row.parentNode.removeChild(row);
        // update input field with serialized data
        this.updateField();
    };
    
    
    /**
     * Extract the filter value from a row.
     * 
     * This function works for all instances same way.
     */
    this.getValueByRow = function(row)
    {
        var val = "";
        
        // search value as HTML of SPAN 'value'
        NFU.each(NFU.getChildsRecursively(row, 'SPAN'), function(span) {
            if (NFU.hasClassName(span, 'value')) {
                val = span.innerHTML;
            }
        });
        
        return val;
    };
    

    /**
     * Get current the displayed country.
     * Value is get from this.country_select.
     */
    this.getCurrentCountry = function()
    {
        return this.country_select.options[this.country_select.selectedIndex].value;
    };
    
    
    /**
     * Change country. This function is an event handler of 
     * event "change" of this.country_select.
     * 
     * Function removes all rows from TABLE (not from this.data)
     * and again add all rows for new country.
     */
    this.changeCountry = function()
    {
        // get current displayed country
        var country = this.getCurrentCountry();
        // remove all TR from table
        this.removeAllRows();
        
        // walk through internal data and add rows
        // for the new displayed country
        if (this.data[country]) {
            NFU.each(this.data[country], function(row) {
                self.addExistedRow(row);
            });
        }
        
        // set class name for table
        if (this.data[country])
        	NFU.removeClassName(this.filters.div, 'empty-filter');
        else
        	NFU.addClassName(this.filters.div, 'empty-filter');
    };

    
    /**
     * Function removes all TR elements from TABLE 
     * (except template row).
     * 
     * Function removes only TR elements not rows 
     * from this.data.
     */
    this.removeAllRows = function()
    {
        NFU.eachChilds(this.table, 'TR', function(row) {
            if (!NFU.hasClassName(row, this.id+'-template'))
                row.parentNode.removeChild(row);
        });
    };
    
    
    /**
     * Function adds an existed row (TR) element
     * to TABLE.
     */
    this.addExistedRow = function(row)
    {
        this.table.appendChild(row);
    };
    
    
    /**
     * Function updates INPUT fields with serialized values
     * from this.data values.
     * 
     * Function also adds className 'has-filter' to OPTIONs of this.country_select
     * whih have some filters and removes this className from OPTIONs without filters.
     * 
     * Filters will be sorted so that countries with filters preceeds the countries
     * without filters.
     * 
     * Format: 
     * 
     * COUNTRY_CODE1,DIAL1,FILTER1;COUNTRY_CODE2,DIAL2,FILTER2;COUNTRY_CODE3,DIAL3,FILTER3 ...
     */
    this.updateField = function()
    {
        var vals = [];
        
        // get values for each country
        for (var country in this.data) {
            NFU.each(this.data[country], function(row) {
                vals.push(country+','+self.getValueByRow(row));
            });
        }
        
        // set serialized values
        this.field.value = vals.join(';');
        
        // remember selected countries
        var selected = '';
        
        NFU.eachChilds(this.country_select, 'OPTION', function(option)
        {
            if (option.selected)
            	selected = option.value;
        });
                
        var with_filters = [];
        var without_filters = [];
        
        // remove filters
        NFU.eachChilds(this.country_select, 'OPTION', function(option)
        {    
            if (self.data[option.value] && self.data[option.value].length > 0)
                with_filters.push(option);
            else
                without_filters.push(option);
                        
            self.country_select.removeChild(option);
        });
        
        // sort both lists
        var sort_func = function sort(i1, i2) { 
            return i1.innerHTML < i2.innerHTML ? -1 : i1.innerHTML > i2.innerHTML 
        };
        
        with_filters.sort(sort_func);
        without_filters.sort(sort_func);
        
        // append countries with filters
        NFU.each(with_filters, function(option) {
            NFU.addClassName(option, 'has-filter');
            if (option.value == selected)
            	option.selected = true;
            self.country_select.appendChild(option);        
        });
        
        // append countries without filters
        NFU.each(without_filters, function(option) {
            NFU.removeClassName(option, 'has-filter');
            self.country_select.appendChild(option);        
        });
        
        // select
        NFU.eachChilds(this.country_select, 'OPTION', function(option, index) {
        	if (option.value == selected)
        		self.country_select.selectedIndex = index;
        });
        
        // set class name for table
        if (this.field.value)
        	NFU.removeClassName(this.filters.div, 'empty-filter');
        else
        	NFU.addClassName(this.filters.div, 'empty-filter');
    };
    
    
    /**
     * Function get value from this.field and parses it 
     * and fills the filter rows by this.
     * 
     * Format:
     * 
     * COUNTRY_CODE1,DIAL1,FILTER1;COUNTRY_CODE2,DIAL2,FILTER2;COUNTRY_CODE3,DIAL3,FILTER3 ...
     */
    this.loadValue = function()
    {
        // get value
        var val = this.field.value;
        
        // set class name for table
        if (val)
        	NFU.removeClassName(this.filters.div, 'empty-filter');
        else
        	NFU.addClassName(this.filters.div, 'empty-filter');
        
        // if there is no value does nothing
        if (!val)
            return;
        
        // clear internal data
        this.data = {};
        // remove all TR elements
        this.removeAllRows();
        
        // validator for filter pattern
        var validator = new RegExp('^[0-9\?]{0,15}[0-9\?*](-[0-9\?]{0,15}[0-9\?*])?$');
        
        var vals = val.split(';');

        // walk through all rows
        NFU.each(vals, function(val) {
            
            // split to parts
            var parts = val.split(',');
            
            // if number of parts does not corespond skip row
            if (parts.length != 3)
                return;
            
            // extract values
            var country = parts[0];
            var dial    = parts[1];
            var filter  = parts[2];
            
            // test filter
            if (!validator.test(filter))
                return;

            // all is right, add filter
            self.addFilter(filter, country+','+dial);
        });
    };
};


/**
 * 
 */
function FilterDialog(id, filters) {
    
    /* this instance */
    var self = this;
    
    
    /* if of element TABLE represented this filters */
    this.id = id;
    
    
    /* instance of ancestor object */
    this.filters = filters;
    
    /* DIV dialog */
    this.div = document.getElementById(id);
    /* DIV with digits in first row (pattern, left side of interval) */
    this.digits1 = document.getElementById(this.id+'-digits-1');
    /* DIV with digits in second row (right side of interval) */
    this.digits2 = document.getElementById(this.id+'-digits-2');
    /* INPUT radio for PATTERN */
    this.type1   = document.getElementById(this.id+'-type-1');
    /* INPUT radio for RANGE */
    this.type2   = document.getElementById(this.id+'-type-2');

    
    /**
     * Set a fliter value to dialog.
     * 
     * Function setup radiobuttons and set digits.
     * 
     * If filter is not specified then there will be used
     * '*' value.
     */
    this.setValue = function(filter)
    {
        if (!filter)
            filter = '*';
               
        this.clear();
       
        // parse filter value
        var parts   = filter.split('-');
        var isRange = parts.length == 2;
        
        this.setType(isRange);
        this.setDigits(this.digits1, parts[0]);
        
        if (isRange)
            this.setDigits(this.digits2, parts[1]);
    };
       
    
    /**
     * Clear dialog (analogy set to '*').
     */
    this.clear = function()
    {
        this.setType(false);
        this.setDigits(this.digits1, '*');
        this.setDigits(this.digits2, '*');
    };
    
    
    /**
     * Set filter type (RANGE or PATTERN).
     * 
     * Function set radion buttons and show/hide
     * the div with second digits (right side of inteval).
     */
    this.setType = function(isRange)
    {
        if (isRange) {
            this.type1.checked = "";
            this.type2.checked = "checked";
            this.digits2.style.display = 'block';
        } else {
            this.type1.checked = "checked";
            this.type2.checked = "";
            this.digits2.style.display = 'none';
        }
    };
       
    
    /**
     * Set digits.
     */
    this.setDigits = function(digits, value)
    {  
        // set first digit to '*', it also removes
        // all followed digits
        var firstSelect = NFU.firstChild(digits, 'SELECT');
        firstSelect.selectedIndex = 0;
        self.selectDigit(firstSelect);
        
        // now walk through filter value and select 
        // correspond digits
        NFU.eachChars(value, false, function(char) {
            lastSelect = NFU.lastChild(digits, 'SELECT');
            // 0 - *, 1-10 - digits [0-9], 11 - ?
            lastSelect.selectedIndex = (char == '?') ? 11 : new Number(char)+1;
            self.selectDigit(lastSelect);
        });
    };
    
    
    /**
     * Select single digit. Elem is SELECT represented
     * the position for the digit.
     */
    this.selectDigit = function(elem)
    {
        // get parent element for adding/removing digits
        var parent = elem.parentNode;
        // count of digits helps to determine whether
        // selected digits is last or not
        var count_select = NFU.getChilds(parent, 'SELECT').length;

        // get last child and last select
        // last child may be a text node i.e last child != last select
        var lastChild  = NFU.lastChild(parent);
        var lastSelect = NFU.lastChild(parent, 'SELECT');
        
        // user choose '*' and there is a digit (SELECT)
        // so we have to remove all followed digits (SELECTs)
        if (elem.value == '*' && count_select > 0) {
            while (lastChild && lastChild != elem) {
                parent.removeChild(lastChild);
                lastChild = NFU.lastChild(parent);
            }
        // user choose a digit or ? for non-last select 
        // (there is max 16 digits because phone numbers)
        // so we have to add next digits
        } else if (elem == lastSelect && count_select < 16) {
            var select = document.createElement('SELECT');
            this.filters.initOptions(select, this.filters.digits, '*');
            select.onclick = function() { self.selectDigit(select); };
            parent.appendChild(select);
        }
    };
    
    
    /**
     * Get completely value.
     */
    this.getValue = function()
    {    
        // is selected range or pattern
        var isRange = this.type2.checked;
        
        // build serialize digits
        var val1 = "";
        var val2 = "";
            
        NFU.eachChilds(this.digits1, 'SELECT', function(select) {
            NFU.eachChilds(select, 'OPTION', function(option) {
                if (option.selected)
                    val1 += option.innerHTML;
            });
        });

        if (isRange)
        {
            NFU.eachChilds(this.digits2, 'SELECT', function(select) {
                NFU.eachChilds(select, 'OPTION', function(option) {
                    if (option.selected)
                        val2 += option.innerHTML;
                });
            });
        }
        
        // validate interval
        if (isRange)
        {
            // first remove '*' from text
            // then chang '?' to '0' for left side and to '9' for right side
            var vval1 = val1.replace('*', '').replace('?', '0');
            var vval2 = val2.replace('*', '').replace('?', '9');
                
            // provide that both values have same sizes
            if (vval1.length > vval2.length)
                while (vval1.length > vval2.length)
                    vval2 = vval2 + '9';
                    
            if (vval2.length > vval1.length)
                while (vval2.length > vval1.length)
                    vval1 = vval1 + '0';
                
            // cast to number
            var num1 = new Number(vval1);
            var num2 = new Number(vval2);
                
            // test
            if (num1 >= num2)
            {
                alert('Inccorect inteval. Left side ('+val1+') is greater than right side ('+val2+')');
                return false;
            }
        }
        
        return isRange ? val1 + '-' + val2 : val1;
    };
    

    /**
     * Function shows dialog.
     */
    this.show = function() {
        this.div.style.display = 'block';
    };
    
    
    /**
     * Function hides dialog
     */
    this.hide = function() {
        this.div.style.display = 'none';
    };
    
};


/**
 */
function NumberFilters(id)
{
    /* this instance */
    var self = this;
    
    
    /* prefix id */
    this.prefix_id = id;
    
    /* */
    this.div = document.getElementById(id);
    
    /* TABLE with include filters */
    this.filterTable = new FilterTable(id+'-filterTable', this);
    /* TABLE with exclude filters */
    //this.exclude = new FilterTable(id+'-exclude', this);
    /* DIALOG for set/edit filter */
    this.dialog  = new FilterDialog(id+'-dialog', this);
    
    /* filter table current edited in dialog */
    this.openFilter = null;
    /* filter table row current edited in dialog */
    this.openRow = null;
      
    
    /**
     * 
     */
    this.openDialog = function(filterTable, row)
    {
        if (row)
            row = NFU.firstParent(row, 'TR');
        
        this.openFilter = filterTable;
        this.openRow = row;
        
        var value = row ? filterTable.getValueByRow(row) : '*';
        
        this.dialog.setValue(value);
        this.dialog.show();
    };
    
        
    /**
     * Save dialog. User confirms his choice.
     */
    this.saveDialog = function()
    {
        var value = this.dialog.getValue();
        
        if (!value)
            return;
        
        if (this.openRow)
            this.openFilter.updateFilter(this.openRow, value);
        else
            this.openFilter.addFilter(value);
        
        this.openRow = null;
        this.openFilter = null;
        
        this.dialog.hide();
    };
    
    
    /**
     * Close dialog without saving.
     * This does only hide the dialog.
     */
    this.closeDialog = function()
    {
        this.dialog.hide();
    };
  
    
    /**
     * Load values froh hidden INPUTs to filter table.
     */
    this.loadValues = function()
    {
    	this.filterTable.loadValue();
    	
    	this.filterTable.country_select.selectedIndex = 0;
    	this.filterTable.changeCountry();
    	
        //this.include.loadValue();
        //this.exclude.loadValue();
    };
    
    
    /**
     * Init SELECT from sources.
     */
    this.initSelects = function(className, sources, defaultValue, label_callback)
    {
        var self    = this;
        var selects = NFU.getElementsByClassName(className, 'SELECT');

        NFU.each(selects, function(select) {
            if (select.options.length == 0) {
                self.initOptions(select, sources, defaultValue, label_callback);
            }
        });
    };
    
    
    /**
     * 
     */
    this.initOptions = function(select, sources, defaultValue, label_callback)
    {
        NFU.each(sources, function(source) {
            var parts = source.split(':');
            var index = parts[0];
            var value = parts[1];
            var label = (label_callback) ? label_callback(index, value) : value;
            
            var option = new Option(label, index);
            if (defaultValue == index)
                option.selected = true;
            select.options[select.options.length] = option;
        });
    };
    
    
    /**
     * Function returns dialing codes for a country.
     */
    this.getDialingCode = function(country)
    {
        var parts = country.split(',');
        return parts[1];
    };
 
   
    this.country_codes = [
        'AFG,93:Afghanistan',
        'ALB,355:Albania',
        'DZA,213:Algeria',
        'ASM,1684:American Samoa',
        'AND,376:Andorra',
        'AGO,244:Angola',
        'AIA,1264:Anguilla',
        'ATA,672:Antarctica',
        'ATG,1268:Antigua and Barbuda',
        'ARG,54:Argentina',
        'ARM,374:Armenia',
        'ABW,297:Aruba',
        'AUS,61:Australia',
        'AUT,43:Austria',
        'AZE,994:Azerbaijan',
        'BHS,1242:Bahamas',
        'BHR,973:Bahrain',
        'BGD,880:Bangladesh',
        'BRB,1246:Barbados',
        'BLR,375:Belarus',
        'BEL,32:Belgium',
        'BLZ,501:Belize',
        'BEN,229:Benin',
        'BMU,1441:Bermuda',
        'BTN,975:Bhutan',
        'BOL,591:Bolivia',
        'BIH,387:Bosnia and Herzegovina',
        'BWA,267:Botswana',
        'BRA,55:Brazil',
        'VGB,1284:British Virgin Islands',
        'BRN,673:Brunei',
        'BGR,359:Bulgaria',
        'BFA,226:Burkina Faso',
        'MMR,95:Burma (Myanmar)',
        'BDI,257:Burundi',
        'KHM,855:Cambodia',
        'CMR,237:Cameroon',
        'CAN,1:Canada',
        'CPV,238:Cape Verde',
        'CYM,1345:Cayman Islands',
        'CAF,236:Central African Republic',
        'TCD,235:Chad',
        'CHL,56:Chile',
        'CHN,86:China',
        'CXR,61:Christmas Island',
        'CCK,61:Cocos (Keeling) Islands',
        'COL,57:Colombia',
        'COM,269:Comoros',
        'COK,682:Cook Islands',
        'CRC,506:Costa Rica',
        'HRV,385:Croatia',
        'CUB,53:Cuba',
        'CYP,357:Cyprus',
        'CZE,420:Czech Republic',
        'COD,243:Democratic Republic of the Congo',
        'DNK,45:Denmark',
        'DJI,253:Djibouti',
        'DMA,1767:Dominica',
        'DOM,1809:Dominican Republic',
        'ECU,593:Ecuador',
        'EGY,20:Egypt',
        'SLV,503:El Salvador',
        'GNQ,240:Equatorial Guinea',
        'ERI,291:Eritrea',
        'EST,372:Estonia',
        'ETH,251:Ethiopia',
        'FLK,500:Falkland Islands',
        'FRO,298:Faroe Islands',
        'FJI,679:Fiji',
        'FIN,358:Finland',
        'FRA,33:France',
        'PYF,689:French Polynesia',
        'GAB,241:Gabon',
        'GMB,220:Gambia',
        'GEO,995:Georgia',
        'DEU,49:Germany',
        'GHA,233:Ghana',
        'GIB,350:Gibraltar',
        'GRC,30:Greece',
        'GRL,299:Greenland',
        'GRD,1473:Grenada',
        'GUM,1671:Guam',
        'GTM,502:Guatemala',
        'GIN,224:Guinea',
        'GNB,245:Guinea-Bissau',
        'GUY,592:Guyana',
        'HTI,509:Haiti',
        'VAT,39:Holy See (Vatican City)',
        'HND,504:Honduras',
        'HKG,852:Hong Kong',
        'HUN,36:Hungary',
        'IS,354:Iceland',
        'IND,91:India',
        'IDN,62:Indonesia',
        'IRN,98:Iran',
        'IRQ,964:Iraq',
        'IRL,353:Ireland',
        'IMN,44:Isle of Man',
        'ISR,972:Israel',
        'ITA,39:Italy',
        'CIV,225:Ivory Coast',
        'JAM,1876:Jamaica',
        'JPN,81:Japan',
        'JOR,962:Jordan',
        'KAZ,7:Kazakhstan',
        'KEN,254:Kenya',
        'KIR,686:Kiribati',
        'KWT,965:Kuwait',
        'KGZ,996:Kyrgyzstan',
        'LAO,856:Laos',
        'LVA,371:Latvia',
        'LBN,961:Lebanon',
        'LSO,266:Lesotho',
        'LBR,231:Liberia',
        'LBY,218:Libya',
        'LIE,423:Liechtenstein',
        'LTU,370:Lithuania',
        'LUX,352:Luxembourg',
        'MAC,853:Macau',
        'MKD,389:Macedonia',
        'MDG,261:Madagascar',
        'MWI,265:Malawi',
        'MYS,60:Malaysia',
        'MDV,960:Maldives',
        'MLI,223:Mali',
        'MLT,356:Malta',
        'MHL,692:Marshall Islands',
        'MRT,222:Mauritania',
        'MUS,230:Mauritius',
        'MYT,262:Mayotte',
        'MEX,52:Mexico',
        'FSM,691:Micronesia',
        'MDA,373:Moldova',
        'MCO,377:Monaco',
        'MNG,976:Mongolia',
        'MNE,382:Montenegro',
        'MSR,1664:Montserrat',
        'MAR,212:Morocco',
        'MOZ,258:Mozambique',
        'NAM,264:Namibia',
        'NRU,674:Nauru',
        'NPL,977:Nepal',
        'NLD,31:Netherlands',
        'ANT,599:Netherlands Antilles',
        'NCL,687:New Caledonia',
        'NZL,64:New Zealand',
        'NIC,505:Nicaragua',
        'NER,227:Niger',
        'NGA,234:Nigeria',
        'NIU,683:Niue',
        'NFK,672:Norfolk Island',
        'PRK,850:North Korea',
        'MNP,1670:Northern Mariana Islands',
        'NOR,47:Norway',
        'OMN,968:Oman',
        'PAK,92:Pakistan',
        'PLW,680:Palau',
        'PAN,507:Panama',
        'PNG,675:Papua New Guinea',
        'PRY,595:Paraguay',
        'PER,51:Peru',
        'PHL,63:Philippines',
        'PCN,870:Pitcairn Islands',
        'POL,48:Poland',
        'PRT,351:Portugal',
        'PRI,1:Puerto Rico',
        'QAT,974:Qatar',
        'COG,242:Republic of the Congo',
        'ROU,40:Romania',
        'RUS,7:Russia',
        'RWA,250:Rwanda',
        'BLM,590:Saint Barthelemy',
        'SHN,290:Saint Helena',
        'KNA,1869:Saint Kitts and Nevis',
        'LCA,1758:Saint Lucia',
        'MAF,1599:Saint Martin',
        'SPM,508:Saint Pierre and Miquelon',
        'VCT,1784:Saint Vincent and the Grenadines',
        'WSM,685:Samoa',
        'SMR,378:San Marino',
        'STP,239:Sao Tome and Principe',
        'SAU,966:Saudi Arabia',
        'SEN,221:Senegal',
        'SRB,381:Serbia',
        'SYC,248:Seychelles',
        'SLE,232:Sierra Leone',
        'SGP,65:Singapore',
        'SVK,421:Slovakia',
        'SVN,386:Slovenia',
        'SLB,677:Solomon Islands',
        'SOM,252:Somalia',
        'ZAF,27:South Africa',
        'KOR,82:South Korea',
        'ESP,34:Spain',
        'LKA,94:Sri Lanka',
        'SDN,249:Sudan',
        'SUR,597:Suriname',
        'SWZ,268:Swaziland',
        'SWE,46:Sweden',
        'CHE,41:Switzerland',
        'SYR,963:Syria',
        'TWN,886:Taiwan',
        'TJK,992:Tajikistan',
        'TZA,255:Tanzania',
        'THA,66:Thailand',
        'TLS,670:Timor-Leste',
        'TGO,228:Togo',
        'TKL,690:Tokelau',
        'TON,676:Tonga',
        'TTO,1868:Trinidad and Tobago',
        'TUN,216:Tunisia',
        'TUR,90:Turkey',
        'TKM,993:Turkmenistan',
        'TCA,1649:Turks and Caicos Islands',
        'TUV,688:Tuvalu',
        'UGA,256:Uganda',
        'UKR,380:Ukraine',
        'ARE,971:United Arab Emirates',
        'GBR,44:United Kingdom',
        'USA,1:United States',
        'URY,598:Uruguay',
        'VIR,1340:US Virgin Islands',
        'UZB,998:Uzbekistan',
        'VUT,678:Vanuatu',
        'VEN,58:Venezuela',
        'VNM,84:Vietnam',
        'WLF,681:Wallis and Futuna',
        'YEM,967:Yemen',
        'ZMB,260:Zambia',
        'ZWE,263:Zimbabwe'
    ];
    
    this.max_digits_without_prefix = [
        "0:0",
        "1:1",
        "2:2",
        "3:3",
        "4:4",
        "5:5",
        "6:6",
        "7:7",
        "8:8",
        "9:9",
       "10:10",
       "11:11",
       "12:12",
       "13:13",
       "14:14",
       "15:15"
    ];
    
    this.digits = [
        "*:*", // any digit (a number of)
        "0:0",
        "1:1",
        "2:2",
        "3:3",
        "4:4",
        "5:5",
        "6:6",
        "7:7",
        "8:8",
        "9:9",
        "?:?"  // any digit (single)
    ];
    
    
    // intialize procedure    
    this.initSelects('max-number-for-prefix', this.max_digits_without_prefix, 9);
    this.initSelects('digits', this.digits, '*');
    this.initSelects('country-codes', this.country_codes, null, function(code, country_name) {
        return country_name + " ("+self.getDialingCode(code)+")";
    });
    
    this.loadValues();
     
};