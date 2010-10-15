jQuery(function($) {
	var fb = $('#colorpicker').farbtastic('#color');

	var set = {};
	var card = $('#card');

	var name_i = $('#form .name input');
	var name_o = $('#name .value');
	set.name = (function() {
		var width = 44;
		return function() {
			var str = name_i.val();
			var len = str.length;
			var num = width / len - 3;
			if (num < 0) {
				num = 0;
			}
			name_o.text(str);
			name_o.css({
				'letter-spacing' : num.toString(10) + 'mm',
				'padding-left'   : (num / 2).toString(10) + 'mm'
			  });
		};
	})();
	name_i.keyup(set.name);

	var address1_i = $('#form .address1 input[type="text"]');
	var address1_o = $('#address1 .value');
	set.address1 = function() {
		address1_o.text(address1_i.val());
	};
	address1_i.keyup(set.address1);

	var addressable_i = $('#form .address1 input[type="checkbox"]');
	set.addressable = (function() {
		var className = 'non-address';
		return function() {
			if (addressable_i[0].checked) {
				card.removeClass(className);
			} else {
				card.addClass(className);
			}
		};
	})();
	addressable_i.change(set.addressable);

	var address2_i = $('#form .address2 input');
	var address2_o = $('#address2 .value');
	set.address2 = function() {
		address2_o.text(address2_i.val());
	};
	address2_i.keyup(set.address2);

	var limitation_i = $('#form .limitation input');
	var limitation_o = $('#limitation .value');
	set.limitation = function() {
		limitation_o.text(limitation_i.val());
	};
	limitation_i.keyup(set.limitation);

	var licensecode_i = $('#form .licensecode input');
	var licensecode_o = $('#licensecode .value');
	set.licensecode = (function() {
		var re = /(\d{4})(\d{4})(\d{4})/;
		var check_digit = $('#check_digit');
		var check = function(digit) {
			if (digit.length !== 12) {
				return false;
			}
			var d = [];
			for (var c, i = 0; c = digit.charAt(i); i++) {
				d.push(c);
			}
			var R = (
				d[0] * 5 +
				d[1] * 4 +
				d[2] * 3 +
				d[3] * 2 +
				d[4] * 7 +
				d[5] * 6 +
				d[6] * 5 +
				d[7] * 4 +
				d[8] * 3 +
				d[9] * 2
				) % 11;
			return parseInt(d[10], 10) === (11 - R) % 10;
		};
		return function() {
			var str = licensecode_i.val();
			licensecode_o.html(str.replace(re, '$1<em>$2</em>$3'));
			check_digit.text(check(str));
		};
	})();
	licensecode_i.keyup(set.licensecode);

	var replace = (function() {
		var re = /^([一-龠]{2}(?: \d|0\d|\d{2}))(年)( ?(?: \d|0\d|\d{2}) ?)(月)( ?(?: \d|0\d|\d{2}) ?)(日(?:生|　\d+)?)$/;
		return function(str) {
			return str.replace(re, '<em>$1</em>$2<em>$3</em>$4<em>$5</em>$6');
		};
	})();

	var birthdate_i = $('#form .birthdate input');
	var birthdate_o = $('#birthdate .value');
	set.birthdate = function() {
		birthdate_o.html( replace(birthdate_i.val()) );
	};
	birthdate_i.keyup(set.birthdate);

	var issue_i = $('#form .issue input');
	var issue_o = $('#issue .value');
	set.issue = function() {
		issue_o.html( replace(issue_i.val()) );
	};
	issue_i.keyup(set.issue);

	var date1_i = $('#form .date1 input');
	var date1_o = $('#date1 .value');
	set.date1 = function() {
		date1_o.html( replace(date1_i.val()) );
	};
	date1_i.keyup(set.date1);

	var date2_i = $('#form .date2 input');
	var date2_o = $('#date2 .value');
	set.date2 = function() {
		date2_o.html( replace(date2_i.val()) );
	};
	date2_i.keyup(set.date2);

	var date3_i = $('#form .date3 input');
	var date3_o = $('#date3 .value');
	set.date3 = function() {
		date3_o.html( replace(date3_i.val()) );
	};
	date3_i.keyup(set.date3);

	var condition_i = $('#form .condition textarea');
	var condition_o = $('#condition .value');
	set.condition = function() {
		condition_o.text(condition_i.val());
	};
	condition_i.keyup(set.condition);

	var commission_i = $('#form .commission input');
	var commission_o = $('#commission .value');
	set.commission = (function() {
		var re = /公安委員会/;
		return function() {
			commission_o.text(commission_i.val().replace(re, '\n$&'));
		};
	})();

	var signet_i = $('#form .commission input');
	var signet_o = $('#signet .value');
	set.signet = function() {
		var arr = [];
		var str = signet_i.val();
		for (var c, i = 0; c = str.charAt(i); i++) {
			arr.push(c);
			if (i % 3 === 2) {
				arr.push('\n');
			}
		}
		signet_o.text(arr.join('') + '印');
	};

	commission_i.keyup(function() {
		set.commission();
		set.signet();
	});

	var color_i = [];
	var color_o = $('#limitation');
	color_i.push( $( '#color'       ) );
	color_i.push( $( '#color_green' ) );
	color_i.push( $( '#color_blue'  ) );
	color_i.push( $( '#color_gold'  ) );
	set.color_text = function() {
		color_o.css({ 'background-color': this.value });
	};
	color_i[0].keyup(set.color_text);
	fb.mouseup  ( function() { color_i[0].keyup(); });
	fb.mousemove( function() { color_i[0].keyup(); });
	set.color_radio = function() {
		var color;
		switch (true) {
		  case color_i[1][0].checked: color = '#85cb28' ; break;
		  case color_i[2][0].checked: color = '#50bce7' ; break;
		  case color_i[3][0].checked: color = '#8f7b62' ; break;
		}
		color_i[0].val(color).keyup();
	};
	for (var c, i = 1; c = color_i[i]; i++) {
		c.change(set.color_radio);
	}

	var grade_i = $('#form .grade input');
	var grade_o = $('#grade');
	set.grade = function() {
		if (grade_i[0].checked) {
			grade_o.show();
		} else {
			grade_o.hide();
		}
	};
	grade_i.change(set.grade);

	var ic_i = $('#form .ic input');
	set.ic = (function() {
		var className = 'non-ic';
		return function() {
			if (ic_i[0].checked) {
				card.removeClass(className);
			} else {
				card.addClass(className);
			}
		};
	})();
	ic_i.change(set.ic);

	var lic_class_is = $('#form .lic_class input');
	var lic_class_os = $('#lic_class .value');
	lic_class_is.each(function(i) {
		var method = 'lic_class_' + i;
		var lic_class_i = $(lic_class_is[i]);
		var lic_class_o = $(lic_class_os[i]);
		set[method] = function() {
			lic_class_o.text(lic_class_i.val());
		};
		lic_class_i.keyup(set[method]);
	});

	for (var fn in set) {
		set[fn]();
	}
});
