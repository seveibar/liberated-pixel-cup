function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 === (void 0) ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.list_1 = list;
  t1.i_2 = 0;
  this.forEach$1(new $.Closure88(t1));
  return t1.list_1;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(f, 1, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key === (void 0)) && !(key === $.CTC2)) {
      f.$call$2(key, $.index(this._values, i));
    }
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        var key = $.index(this._keys, i);
        if (!(key === (void 0)) && !(key === $.CTC2)) {
          f.$call$2(key, $.index(this._values, i));
        }
        ++i;
      }
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 length$0: function() { return this.get$length().$call$0(); },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  }
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) === (void 0) || $.index(this._keys, index) === $.CTC2) {
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  }
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      this._numberOfEntries = 0;
      this._numberOfDeleted = 0;
      var length$ = $.get$length(this._keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        $.indexSet(this._keys, i, (void 0));
        $.indexSet(this._values, i, (void 0));
        ++i;
      }
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(newCapacity, 1, capacity, 0, 0);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._grow$1$bailout(newCapacity, 2, capacity, oldKeys, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._grow$1$bailout(newCapacity, 3, capacity, oldKeys, oldValues);
  this._keys = $.List(newCapacity);
  var t1 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; i < capacity; ++i) {
    t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 === (void 0) || t2 === $.CTC2) {
      continue;
    }
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t3 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t3);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      break;
    case 2:
      capacity = env0;
      oldKeys = env1;
      break;
    case 3:
      capacity = env0;
      oldKeys = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.List(newCapacity);
      var t1 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t1, ({E: 'V'}));
      this._values = t1;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          if (key === (void 0) || key === $.CTC2) {
            break c$0;
          }
          var value = $.index(oldValues, i);
          var newIndex = this._probeForAdding$1(key);
          $.indexSet(this._keys, newIndex, key);
          $.indexSet(this._values, newIndex, value);
        }
        ++i;
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree)) {
    this._grow$1($.get$length(this._keys));
  }
 },
 _probeForLookup$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    }
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash;
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash;
      } else {
        if ($.ltB(insertionIndex, 0) && $.CTC2 === existingKey) {
          insertionIndex = hash;
        }
      }
    }
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var existingKey = $.index(this._keys, hash);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash;
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash;
          } else {
            if ($.ltB(insertionIndex, 0) && $.CTC2 === existingKey) {
              insertionIndex = hash;
            }
          }
        }
        var numberOfProbes0 = numberOfProbes + 1;
        hash = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
        numberOfProbes = numberOfProbes0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t1 = $.List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 length$0: function() { return this.get$length().$call$0(); },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 some$1: function(f) {
  return $.some(this._backingMap.getKeys$0(), f);
 },
 forEach$1: function(f) {
  var t1 = ({});
  t1.f_13 = f;
  $.forEach(this._backingMap, new $.Closure115(t1));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  if (typeof length$ !== 'number') return this._advance$0$bailout(1, length$);
  var entry = (void 0);
  do {
    var t1 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t1;
    if ($.geB(t1, length$)) {
      break;
    }
    entry = $.index(this._entries, this._nextValidIndex);
  } while ((entry === (void 0) || entry === $.CTC2));
 },
 _advance$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._entries);
    case 1:
      state = 0;
      var entry = (void 0);
      L0: while (true) {
        var t1 = $.add(this._nextValidIndex, 1);
        this._nextValidIndex = t1;
        if ($.geB(t1, length$)) {
          break;
        }
        entry = $.index(this._entries, this._nextValidIndex);
        if (!(entry === (void 0) || entry === $.CTC2)) break L0;
      }
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC3);
  }
  var res = $.index(this._entries, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._nextValidIndex, $.get$length(this._entries))) {
    return false;
  }
  if ($.index(this._entries, this._nextValidIndex) === $.CTC2) {
    this._advance$0();
  }
  return $.lt(this._nextValidIndex, $.get$length(this._entries));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object",
 key$1: function(arg0) { return this.key.$call$1(arg0); }
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 length$0: function() { return this.get$length().$call$0(); },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  var t1 = ({});
  t1.f_12 = f;
  $.forEach(this._list, new $.Closure45(t1));
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.list_12 = list;
  t1.index_2 = 0;
  $.forEach(this._list, new $.Closure89(t1));
  return t1.list_12;
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry === (void 0)) {
    return;
  }
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  if (this._map.containsKey$1(key) === true) {
    $.index(this._map, key).get$element().set$value(value);
  } else {
    $.addLast(this._list, $.KeyValuePair$2(key, value));
    $.indexSet(this._map, key, this._list.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$0();
  var t1 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = (void 0);
  this._previous = (void 0);
  return this._element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$1(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
 }
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC10);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC10);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$1(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 some$1: function(f) {
  var entry = this._sentinel.get$_next();
  for (; !(entry === this._sentinel); ) {
    var nextEntry = entry.get$_next();
    if (f.$call$1(entry.get$_element()) === true) {
      return true;
    }
    entry = nextEntry;
  }
  return false;
 },
 forEach$1: function(f) {
  var entry = this._sentinel.get$_next();
  for (; !(entry === this._sentinel); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  this._sentinel.set$_next(t1);
  t1 = this._sentinel;
  this._sentinel.set$_previous(t1);
 },
 isEmpty$0: function() {
  return this._sentinel.get$_next() === this._sentinel;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.Closure44(t1));
  return t1.counter_1;
 },
 length$0: function() { return this.get$length().$call$0(); },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$0();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC3);
  }
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  return !(this._currentEntry.get$_next() === this._sentinel);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) {
    return '';
  }
  if ($.get$length(this._buffer) === 1) {
    return $.index(this._buffer, 0);
  }
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str === (void 0) || $.isEmpty(str) === true) {
    return this;
  }
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 length$0: function() { return this.get$length().$call$0(); },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_lib3_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 },
 start$0: function() {
  return this._lib3_start;
 },
 get$start: function() { return new $.Closure116(this, 'start$0'); }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._next)) {
      return true;
    }
  }
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC3);
  }
  var next = this._next;
  this._next = (void 0);
  return next;
 }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 }
};

$$.Closure117 = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.ConstantMap = {"":
 ["_lib2_keys?", "_jsObject", "length?"],
 super: "Object",
 clear$0: function() {
  return this._throwImmutable$0();
 },
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
 },
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC9);
 },
 toString$0: function() {
  return $.mapToString(this);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 getKeys$0: function() {
  return this._lib2_keys;
 },
 forEach$1: function(f) {
  var t1 = ({});
  t1.f_1 = f;
  $.forEach(this._lib2_keys, new $.Closure43(this, t1));
 },
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true) {
    return;
  }
  return $.jsPropertyAccess(this._jsObject, key);
 },
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__')) {
    return false;
  }
  return $.jsHasOwnProperty(this._jsObject, key);
 },
 length$0: function() { return this.length.$call$0(); },
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["set?", "tags?", "tag?"],
 super: "Object",
 set$2: function(arg0, arg1) { return this.set.$call$2(arg0, arg1); }
};

$$.StringMatch = {"":
 ["pattern?", "str", "_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
 start$0: function() {
  return this._start;
 },
 get$start: function() { return new $.Closure116(this, 'start$0'); }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_index"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._index);
 }
};

$$.IllegalAccessException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0) {
      sb.add$1(', ');
    }
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$1('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0) {
      sb.add$1(', ');
    }
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$1('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, $.get$length(t1))) break L0;
        if (i > 0) {
          sb.add$1(', ');
        }
        sb.add$1($.index(t1, i));
        ++i;
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 === (void 0)) {
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      } else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$1('');
        i = 0;
        L1: while (true) {
          if (!$.ltB(i, $.get$length(t1))) break L1;
          if (i > 0) {
            sb.add$1(', ');
          }
          sb.add$1($.index(t1, i));
          ++i;
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.BadNumberFormatException = {"":
 ["_s"],
 super: "Object",
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.S(this._s) + '\'';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if ($.eqNullB(t1)) {
    return this.get$exceptionName();
  } else {
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
  }
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.Game = {"":
 ["context?", "canvas"],
 super: "Object",
 loadFinish$0: function() {
  $.world.startCycle$1(this.context);
 },
 Game$0: function() {
  $.classMap = $.makeLiteralMap(['spawn', new $.Closure(), 'avatar', new $.Closure2(), 'node', new $.Closure3()]);
  $.tagEvents = $.makeLiteralMap(['citizen', $.makeLiteralMap(['init', new $.Closure4(), 'die', new $.Closure5()]), 'traveler', $.makeLiteralMap(['init', new $.Closure6(), 'collide', new $.Closure7(), 'update', new $.Closure8()]), 'homebound', $.makeLiteralMap(['init', new $.Closure9(), 'update', new $.Closure10(), 'collide', new $.Closure11()]), 'lost', $.makeLiteralMap(['update', new $.Closure12()]), 'corpse', $.makeLiteralMap(['init', new $.Closure13(), 'update', new $.Closure14()]), 'following', $.makeLiteralMap(['update', new $.Closure15()]), 'wander', $.makeLiteralMap(['collide', new $.Closure16(), 'init', new $.Closure17(), 'update', new $.Closure18()]), 'nice', $.makeLiteralMap(['init', new $.Closure19(), 'update', new $.Closure20()]), 'mean', $.makeLiteralMap(['init', new $.Closure21(), 'update', new $.Closure22()]), 'hostile-wander', $.makeLiteralMap(['init', new $.Closure23(), 'update', new $.Closure24()]), 'hostile', $.makeLiteralMap(['init', new $.Closure25(), 'update', new $.Closure26(), 'kill', new $.Closure27()]), 'nestbound', $.makeLiteralMap(['init', new $.Closure28(), 'update', new $.Closure29()])]);
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Notification'}));
  $.notifications = t1;
  $.BLANK_IMAGE = $.ImageElement((void 0), (void 0), (void 0));
  $.tags = $.makeLiteralMap([]);
  $.tagMap = $.tags;
  $.animationMap = $.HashMapImplementation$0();
  $.event = $.UIManager$0();
  this.canvas = $.document().query$1('#canvas');
  t1 = $.toInt($.div($.window().get$innerWidth(), $.RESOLUTION));
  this.canvas.set$width(t1);
  t1 = $.toInt($.div($.window().get$innerHeight(), $.RESOLUTION));
  this.canvas.set$height(t1);
  this.context = this.canvas.getContext$1('2d');
  $.SCREEN_WIDTH = this.canvas.get$width();
  $.SCREEN_HEIGHT = this.canvas.get$height();
  $.RENDER_DISTANCE = $.toInt($.div($.mul($.add($.SCREEN_WIDTH, $.SCREEN_HEIGHT), 2), 4));
  $.world = $.World$0();
  $.print('Loading World');
  $.load('game.json', new $.Closure30(this));
 }
};

$$.PathNode = {"":
 ["start?", "house", "path?", "y", "x"],
 super: "Vec2"
};

$$.Path = {"":
 ["points?", "end", "start?"],
 super: "Object",
 Path$5: function(s, e, points, houseStart, houseEnd) {
  this.start = $.PathNode$fromVec2$4(s, this, houseStart, true);
  this.end = $.PathNode$fromVec2$4(e, this, houseEnd, false);
 }
};

$$.GameObject = {"":
 ["markedForRemoval?", "type=", "id", "prop?", "tags?", "y", "x"],
 super: "Vec2",
 removeTag$1: function(tag) {
  var index = $.indexOf$1(this.tags, tag);
  if (!$.eqB(index, -1)) {
    $.removeRange(this.tags, index, 1);
  }
 },
 hasTag$1: function(tag) {
  return !$.eqB($.indexOf$1(this.tags, tag), -1);
 },
 remove$0: function() {
  $.forEach(this.tags, new $.Closure64(this));
  var onscene = $.world.get$onscene();
  var offscene = $.world.get$offscene();
  var objects = $.world.get$objects();
  var index = $.indexOf$1(onscene, this);
  if (!$.eqB(index, -1)) {
    $.removeRange(onscene, index, 1);
  } else {
    index = $.indexOf$1(offscene, this);
    if (!$.eqB(index, -1)) {
      $.removeRange(offscene, index, 1);
    }
  }
  index = $.indexOf$1(objects, this);
  if (!$.eqB(index, -1)) {
    $.removeRange(objects, index, 1);
  }
 },
 markForRemoval$0: function() {
  this.remove$0();
 },
 fireTagEvent$1: function(event$) {
  var t1 = ({});
  t1.event_1 = event$;
  $.forEach(this.tags, new $.Closure90(this, t1));
 },
 debugRender$2: function(c, sep) {
  c.set$fillStyle('#fff');
  var string = '(' + $.S($.div($.toInt($.mul(this.x, 10)), 10.0)) + ',' + $.S($.div($.toInt($.mul(this.y, 10)), 10.0)) + ')';
  c.fillText$3(string, $.mul(-0.5, c.measureText$1(string).get$width()), $.mul(-0.5, sep) + 10);
  string = $.toString(this.tags);
  c.fillText$3(string, $.mul(-0.5, c.measureText$1(string).get$width()), $.mul(0.5, sep) + 10);
 },
 debugRender$1: function(c) {
  return this.debugRender$2(c,80)
},
 debugRender$1: function(c) {
  return this.debugRender$2(c,80)
},
 debugRender$1: function(c) {
  return this.debugRender$2(c,80)
},
 render$1: function(c) {
  c.save$0();
  c.translate$2(this.x, this.y);
  this.debugRender$1(c);
  c.restore$0();
 },
 setProperty$2: function(k, v) {
    switch (k) {
    case 'x':
      this.x = v;
      break;
    case 'y':
      this.y = v;
      break;
    case 'animation':
      this.animation = $.index($.animationMap, v);
      break;
    case 'type':
      break;
    case 'imageIndex':
      this.image = $.world.getItemImage$1(v);
      break;
    case 'tag':
      $.forEach(v, new $.Closure63(this));
      break;
    case 'freq':
      this.freq = v;
      this.timeToSpawn = v;
      break;
    case 'limit':
      this.limit = v;
      break;
    case 'night-only':
      this.nightOnly = v;
      break;
    case 'emit':
    case 'emission':
      this.emission = v;
      break;
    case 'emit-properties':
    case 'emission-properties':
      this.emission_properties = v;
      break;
    case 'id':
      this.id = v;
      break;
    default:
      $.indexSet(this.prop, k, v);
      break;
  }
 },
 loadProperties$1: function(properties) {
  $.forEach(properties, new $.Closure62(this));
 },
 operator$index$1: function(k) {
  return $.index(this.prop, k);
 },
 operator$indexSet$2: function(k, v) {
  $.indexSet(this.prop, k, v);
 },
 GameObject$3: function(a, xx, yy) {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this.tags = t1;
  this.prop = $.HashMapImplementation$0();
  this.loadProperties$1(a);
 }
};

$$.SpawnPoint = {"":
 ["emission_properties", "emission", "nightOnly", "timeToSpawn", "amountSpawned", "limit", "freq", "markedForRemoval", "type", "id", "prop", "tags", "y", "x"],
 super: "GameObject",
 render$1: function(c) {
  c.save$0();
  c.translate$2(this.x, this.y);
  this.debugRender$2(c, 20);
  c.restore$0();
 },
 update$0: function() {
  if (this.nightOnly === true) {
    if (this.nightOnly === true) {
      var t1 = $.gtB($.world.get$time(), 21) || $.ltB($.world.get$time(), 5);
    } else {
      t1 = false;
    }
  } else {
    t1 = true;
  }
  if (t1 && $.gtB(this.freq, 0) && $.ltB(this.amountSpawned, this.limit)) {
    this.timeToSpawn = $.sub(this.timeToSpawn, 1);
    if ($.leB(this.timeToSpawn, 0)) {
      t1 = $.world;
      var t2 = this.emission;
      var ob = t1.spawnObject$2(t2, !$.eqNullB(this.emission_properties) ? this.emission_properties : $.makeLiteralMap([]));
      ob.set$x(this.x);
      ob.set$y(this.y);
      this.timeToSpawn = this.freq;
      this.amountSpawned = $.add(this.amountSpawned, 1);
    }
  }
 }
};

$$.Avatar = {"":
 ["animation", "attackRadius?", "speech", "sayTime=", "speaking=", "alive?", "health", "currentAttackTime=", "attackTime?", "attackDirection=", "_attacking", "velocity?", "currentFrame=", "currentOrientation!", "currentAnimation", "markedForRemoval", "type", "id", "prop", "tags", "y", "x"],
 super: "GameObject",
 render$1: function(c) {
  c.save$0();
  c.translate$2(this.x, this.y);
  this.debugRender$1(c);
  this.animation.render$4(c, this.currentAnimation, this.currentOrientation, $.toInt($.div(this.currentFrame, 5)));
  c.set$fillStyle('#f00');
  c.fillRect$4(-25.0, -25, 50.0, 5);
  c.set$fillStyle('#0f0');
  c.fillRect$4(-25.0, -25, $.mul($.div(this.health, 100.0), 50.0), 5);
  if (this.speaking === true) {
    c.set$globalAlpha($.mul(c.get$globalAlpha(), 0.75));
    c.set$font('14px Arial');
    var bubbleWidth = $.add(c.measureText$1(this.speech).get$width(), 20);
    c.set$strokeStyle('#000');
    c.set$fillStyle('#fff');
    c.fillRect$4(8, -42, bubbleWidth, 30);
    c.strokeRect$4(8, -42, bubbleWidth, 30);
    c.set$fillStyle('#000');
    c.fillText$3(this.speech, 16, -22);
    c.set$globalAlpha($.div(c.get$globalAlpha(), 0.75));
  }
  c.restore$0();
 },
 say$1: function(text) {
  this.speaking = true;
  this.speech = text;
  this.sayTime = 600;
 },
 hurt$1: function(damage) {
  this.health = $.sub(this.health, damage);
  if (this.alive === true && $.leB(this.health, 0)) {
    this.currentFrame = 0;
    this.currentAnimation = 3;
    this.currentOrientation = 0;
    $.add$1(this.tags, 'corpse');
    $.addTag(this, 'corpse');
    this.fireTagEvent$1('die');
    $.index($.index($.tagEvents, 'corpse'), 'init').$call$1(this);
    this.alive = false;
    var i = $.sub($.get$length(this.tags), 1);
    if (typeof i !== 'number') return this.hurt$1$bailout(damage, 1, i, 0, 0);
    for (; i >= 0; --i) {
      var tag = $.index(this.tags, i);
      if ($.removalOnDeath.containsKey$1(tag) === true && $.index($.removalOnDeath, tag) === true) {
        $.removeRange(this.tags, i, 1);
        var u = $.sub($.get$length($.index($.tagMap, tag)), 1);
        if (typeof u !== 'number') return this.hurt$1$bailout(damage, 2, tag, i, u);
        for (; u >= 0; --u) {
          if ($.eqB($.index($.index($.tagMap, tag), u), this)) {
            $.removeRange($.index($.tagMap, tag), u, 1);
            break;
          }
        }
      }
    }
  }
 },
 hurt$1$bailout: function(damage, state, env0, env1, env2) {
  switch (state) {
    case 1:
      i = env0;
      break;
    case 2:
      tag = env0;
      i = env1;
      u = env2;
      break;
  }
  switch (state) {
    case 0:
      this.health = $.sub(this.health, damage);
    case 1:
    case 2:
      if (state == 1 || state == 2 || (state == 0 && (this.alive === true && $.leB(this.health, 0)))) {
        switch (state) {
          case 0:
            this.currentFrame = 0;
            this.currentAnimation = 3;
            this.currentOrientation = 0;
            $.add$1(this.tags, 'corpse');
            $.addTag(this, 'corpse');
            this.fireTagEvent$1('die');
            $.index($.index($.tagEvents, 'corpse'), 'init').$call$1(this);
            this.alive = false;
            var i = $.sub($.get$length(this.tags), 1);
          case 1:
            state = 0;
          case 2:
            L0: while (true) {
              switch (state) {
                case 0:
                  if (!$.geB(i, 0)) break L0;
                  var tag = $.index(this.tags, i);
                case 2:
                  if (state == 2 || (state == 0 && ($.removalOnDeath.containsKey$1(tag) === true && $.index($.removalOnDeath, tag) === true))) {
                    switch (state) {
                      case 0:
                        $.removeRange(this.tags, i, 1);
                        var u = $.sub($.get$length($.index($.tagMap, tag)), 1);
                      case 2:
                        state = 0;
                        L1: while (true) {
                          if (!$.geB(u, 0)) break L1;
                          if ($.eqB($.index($.index($.tagMap, tag), u), this)) {
                            $.removeRange($.index($.tagMap, tag), u, 1);
                            break;
                          }
                          u = $.sub(u, 1);
                        }
                    }
                  }
                  i = $.sub(i, 1);
              }
            }
        }
      }
  }
 },
 get$attacking: function() {
  return this._attacking;
 },
 set$attacking: function(b) {
  this._attacking = b;
  this.currentAnimation = b === true ? 2 : 1;
 },
 Avatar$1: function(properties) {
  this.velocity = $.Vec2$2(0, 0);
  $.add$1(this.tags, 'avatar');
  $.addTag(this, 'avatar');
 }
};

$$.Item = {"":
 ["image", "markedForRemoval", "type", "id", "prop", "tags", "y", "x"],
 super: "GameObject",
 render$1: function(c) {
  c.save$0();
  c.translate$2(this.x, this.y);
  this.debugRender$1(c);
  c.drawImage$3(this.image, -16, -16);
  c.restore$0();
 }
};

$$.HiddenCanvas = {"":
 ["context?", "canvas"],
 super: "Object",
 getImage$1: function(callback) {
  var t1 = ({});
  t1.callback_14 = callback;
  t1.img_2 = $.Element$tag('img');
  var dataURL = this.canvas.toDataURL$1('image/png');
  $.add$1(t1.img_2.get$on().get$load(), new $.Closure51(t1));
  t1.img_2.set$src(dataURL);
  return t1.img_2;
 },
 HiddenCanvas$2: function(width, height) {
  this.canvas = $.Element$tag('canvas');
  this.canvas.set$width(width);
  this.canvas.set$height(height);
  this.context = this.canvas.getContext$1('2d');
 }
};

$$.Vec2 = {"":
 ["y=", "x="],
 super: "Object",
 getDirection$0: function() {
  if ($.eqB(this.y, 0)) {
    var t1 = 0;
  } else {
    if ($.gtB($.abs(this.x), $.abs(this.y))) {
      t1 = $.eqB(this.x, 0) ? 0 : $.toInt($.add($.round($.div(this.x, $.abs(this.x))), 2));
    } else {
      t1 = $.toInt($.add($.round($.div(this.y, $.abs(this.y))), 1));
    }
  }
  return t1;
 },
 toString$0: function() {
  return '(' + $.S(this.x) + ',' + $.S(this.y) + ')';
 },
 at$2: function(tx, ty) {
  return $.eqB(this.x, tx) && $.eqB(this.y, ty);
 },
 zero$0: function() {
  this.multiplyScalar$1(0);
  return this;
 },
 clone$0: function() {
  return $.Vec2$2(this.x, this.y);
 },
 distanceTo$1: function(v) {
  return $.sqrt(this.distanceToSquared$1(v));
 },
 distanceToSquared$1: function(v) {
  var dx = $.sub(v.get$x(), this.x);
  var dy = $.sub(v.get$y(), this.y);
  return $.add($.mul(dx, dx), $.mul(dy, dy));
 },
 normalize$0: function() {
  return this.divideScalar$1(this.length$0());
 },
 length$0: function() {
  return $.sqrt(this.lengthSq$0());
 },
 get$length: function() { return new $.Closure116(this, 'length$0'); },
 lengthSq$0: function() {
  return $.add($.mul(this.x, this.x), $.mul(this.y, this.y));
 },
 negateY$0: function() {
  this.multiplyY$1(-1);
  return this;
 },
 negateX$0: function() {
  this.multiplyX$1(-1);
  return this;
 },
 divideScalar$1: function(a) {
  if ($.eqB(a, 0)) {
    var a = 0.0001;
  }
  this.x = $.div(this.x, a);
  this.y = $.div(this.y, a);
  return this;
 },
 multiplyY$1: function(a) {
  this.y = $.mul(this.y, a);
  return this;
 },
 multiplyX$1: function(a) {
  this.x = $.mul(this.x, a);
  return this;
 },
 multiplyScalar$1: function(a) {
  this.x = $.mul(this.x, a);
  this.y = $.mul(this.y, a);
  return this;
 },
 sub$1: function(v) {
  this.x = $.sub(this.x, v.get$x());
  this.y = $.sub(this.y, v.get$y());
  return this;
 },
 subTo$2: function(a, b) {
  this.x = $.sub(this.x, a);
  this.y = $.sub(this.y, b);
  return this;
 },
 addTo$2: function(a, b) {
  this.x = $.add(this.x, a);
  this.y = $.add(this.y, b);
  return this;
 },
 add$1: function(v) {
  this.x = $.add(this.x, v.get$x());
  this.y = $.add(this.y, v.get$y());
  return this;
 },
 set$2: function(x, y) {
  this.x = x;
  this.y = y;
  return this;
 },
 get$set: function() { return new $.Closure118(this, 'set$2'); },
 Vec2$2: function(x, y) {
  this.x = x;
  this.y = y;
 }
};

$$.Camera = {"":
 ["_actualZoom", "_targetZoom", "tweenSpeed", "y", "x"],
 super: "Vec2",
 update$0: function() {
  this._actualZoom = $.sub(this._actualZoom, $.div($.sub(this._actualZoom, this._targetZoom), this.tweenSpeed));
 },
 get$animatedZoom: function() {
  return this._actualZoom;
 },
 get$zoom: function() {
  return this._targetZoom;
 },
 set$zoom: function(value) {
  this._targetZoom = value;
 },
 Camera$3: function(x, y, zoom) {
  this.x = x;
  this.y = y;
  this._actualZoom = zoom;
  this._targetZoom = zoom;
 }
};

$$.UIManager = {"":
 ["keyMap", "mouse_position?", "onClick?", "onKeyPress?", "mouseDown=", "keyList"],
 super: "Object",
 mouseAt$2: function(x, y) {
  this.mouse_position.set$2(x, y);
 },
 mouseUpAt$2: function(x, y) {
  this.mouseDown = false;
  this.mouseAt$2(x, y);
 },
 mouseDownAt$2: function(x, y) {
  this.mouseDown = true;
  this.mouseAt$2(x, y);
 },
 key$1: function(identifier) {
  return $.index(this.keyList, $.index(this.keyMap, identifier));
 },
 get$key: function() { return new $.Closure119(this, 'key$1'); },
 setKey$2: function(keyCode, value) {
  $.indexSet(this.keyList, keyCode, value);
 },
 UIManager$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Function'}));
  this.onKeyPress = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Function'}));
  this.onClick = t1;
  this.mouse_position = $.Vec2$2(0.0, 0.0);
  t1 = $.List(255);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this.keyList = t1;
  for (var i = 0; i < 255; ++i) {
    $.indexSet(this.keyList, i, 0);
  }
  $.add$1($.window().get$on().get$keyDown(), new $.Closure36(this));
  $.add$1($.window().get$on().get$keyUp(), new $.Closure37(this));
  $.add$1($.window().get$on().get$mouseDown(), new $.Closure38(this));
  $.add$1($.window().get$on().get$mouseUp(), new $.Closure39(this));
  $.add$1($.window().get$on().get$mouseMove(), new $.Closure40(this));
 }
};

$$.Color = {"":
 ["_b", "_g", "_r"],
 super: "Object",
 clone$0: function() {
  return $.Color$3(this.get$r(), this.get$g(), this.get$b());
 },
 blend$2: function(color, w) {
  if (typeof w !== 'number') return this.blend$2$bailout(color, w, 1, w);
  var t1 = this.get$r();
  var t2 = 1 - w;
  this.set$r($.toInt($.add($.mul(t1, t2), $.mul(color.get$r(), w))));
  this.set$g($.toInt($.add($.mul(this.get$g(), t2), $.mul(color.get$g(), w))));
  this.set$b($.toInt($.add($.mul(this.get$b(), t2), $.mul(color.get$b(), w))));
 },
 blend$2$bailout: function(color, w, state, env0) {
  switch (state) {
    case 1:
      w = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      this.set$r($.toInt($.add($.mul(this.get$r(), $.sub(1, w)), $.mul(color.get$r(), w))));
      this.set$g($.toInt($.add($.mul(this.get$g(), $.sub(1, w)), $.mul(color.get$g(), w))));
      this.set$b($.toInt($.add($.mul(this.get$b(), $.sub(1, w)), $.mul(color.get$b(), w))));
  }
 },
 subtract$1: function(x) {
  if (typeof x !== 'number') return this.subtract$1$bailout(x, 1, x);
  this.set$r($.sub(this.get$r(), x));
  this.set$g($.sub(this.get$g(), x));
  this.set$b($.sub(this.get$b(), x));
  return this;
 },
 subtract$1$bailout: function(x, state, env0) {
  switch (state) {
    case 1:
      x = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      this.set$r($.sub(this.get$r(), x));
      this.set$g($.sub(this.get$g(), x));
      this.set$b($.sub(this.get$b(), x));
      return this;
  }
 },
 toString$0: function() {
  var s = $.toRadixString($.or($.or($.shl(this.get$r(), 16), $.shl(this.get$g(), 8)), this.get$b()), 16);
  if (typeof s !== 'string') return this.toString$0$bailout(1, s);
  for (; s.length < 6; ) {
    s = '0' + s;
  }
  return '#' + s;
 },
 toString$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      s = env0;
      break;
  }
  switch (state) {
    case 0:
      var s = $.toRadixString($.or($.or($.shl(this.get$r(), 16), $.shl(this.get$g(), 8)), this.get$b()), 16);
    case 1:
      state = 0;
      L0: while (true) {
        if (!$.ltB($.get$length(s), 6)) break L0;
        s = '0' + $.S(s);
      }
      return '#' + $.S(s);
  }
 },
 get$b: function() {
  return this._b;
 },
 set$b: function(x) {
  if ($.gtB(x, 255)) {
    var t1 = 255;
  } else {
    t1 = $.ltB(x, 0) ? 0 : x;
  }
  this._b = t1;
 },
 get$g: function() {
  return this._g;
 },
 set$g: function(x) {
  if ($.gtB(x, 255)) {
    var t1 = 255;
  } else {
    t1 = $.ltB(x, 0) ? 0 : x;
  }
  this._g = t1;
 },
 get$r: function() {
  return this._r;
 },
 set$r: function(x) {
  if ($.gtB(x, 255)) {
    var t1 = 255;
  } else {
    t1 = $.ltB(x, 0) ? 0 : x;
  }
  this._r = t1;
 },
 Color$3: function(r, g, b) {
  this.set$r(r);
  this.set$g(g);
  this.set$b(b);
 },
 Color$fromString$1: function(s) {
  var ar = $.splitChars(s);
  if ($.eqB($.get$length(s), 4)) {
    this.set$r($.parseInt('0x' + $.S($.index(ar, 1))));
    this.set$r($.add($.shl(this.get$r(), 4), this.get$r()));
    this.set$g($.parseInt('0x' + $.S($.index(ar, 2))));
    this.set$g($.add($.shl(this.get$g(), 4), this.get$g()));
    this.set$b($.parseInt('0x' + $.S($.index(ar, 3))));
    this.set$b($.add($.shl(this.get$b(), 4), this.get$b()));
  } else {
    if ($.eqB($.get$length(s), 7)) {
      this.set$r($.parseInt('0x' + $.S($.index(ar, 1)) + $.S($.index(ar, 2))));
      this.set$g($.parseInt('0x' + $.S($.index(ar, 3)) + $.S($.index(ar, 4))));
      this.set$b($.parseInt('0x' + $.S($.index(ar, 5)) + $.S($.index(ar, 6))));
    }
  }
 }
};

$$.TileManager = {"":
 ["location", "renderChunkCoordinates", "renderChunks"],
 super: "Object",
 generateTileChunk$3: function(sx, sy, callback) {
  return $.loadImage($.S(this.location) + '/' + $.S($.toInt($.div(sx, 8))) + 'x' + $.S($.toInt($.div(sy, 8))) + '.png', callback);
 },
 generateTileChunk$2: function(sx,sy) {
  return this.generateTileChunk$3(sx,sy,(void 0))
},
 render$2: function(c, camera) {
  var tx = $.sub(camera.get$x(), $.div($.div($.SCREEN_WIDTH, 2), camera.get$animatedZoom()));
  var ty = $.sub(camera.get$y(), $.div($.div($.SCREEN_HEIGHT, 2), camera.get$animatedZoom()));
  tx = $.sub(tx, $.mod($.toInt(tx), 256));
  if (typeof tx !== 'number') return this.render$2$bailout(c, camera, 1, ty, tx, 0, 0);
  ty = $.sub(ty, $.mod($.toInt(ty), 256));
  if (typeof ty !== 'number') return this.render$2$bailout(c, camera, 2, tx, ty, 0, 0);
  var txi = $.toInt(tx / 256);
  if (typeof txi !== 'number') return this.render$2$bailout(c, camera, 3, tx, ty, txi, 0);
  var tyi = $.toInt(ty / 256);
  if (typeof tyi !== 'number') return this.render$2$bailout(c, camera, 4, tx, ty, txi, tyi);
  for (var i = -1; $.ltB(i, $.add($.div($.div($.SCREEN_WIDTH, 256), camera.get$animatedZoom()), 1)); ++i) {
    for (var t1 = i * 256, t2 = txi + i, t3 = $.mod(t2, 10), t1 = tx + t1, t4 = t2 * 8, u = -1; $.ltB(u, $.add($.div($.div($.SCREEN_HEIGHT, 256), camera.get$animatedZoom()), 1)); ++u) {
      var t5 = tyi + u;
      var index = t3 + $.mod(t5, 10) * 10;
      if (!$.eqNullB($.index(this.renderChunkCoordinates, index)) && $.index(this.renderChunkCoordinates, index).at$2(t2, t5) === true && !$.eqNullB($.index(this.renderChunks, index))) {
        c.drawImage$3($.index(this.renderChunks, index), t1, ty + u * 256);
      } else {
        $.indexSet(this.renderChunkCoordinates, index, $.Vec2$2(t2, t5));
        $.indexSet(this.renderChunks, index, this.generateTileChunk$2(t4, t5 * 8));
      }
    }
  }
 },
 render$2$bailout: function(c, camera, state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      ty = env0;
      tx = env1;
      break;
    case 2:
      tx = env0;
      ty = env1;
      break;
    case 3:
      tx = env0;
      ty = env1;
      txi = env2;
      break;
    case 4:
      tx = env0;
      ty = env1;
      txi = env2;
      tyi = env3;
      break;
  }
  switch (state) {
    case 0:
      var tx = $.sub(camera.get$x(), $.div($.div($.SCREEN_WIDTH, 2), camera.get$animatedZoom()));
      var ty = $.sub(camera.get$y(), $.div($.div($.SCREEN_HEIGHT, 2), camera.get$animatedZoom()));
      tx = $.sub(tx, $.mod($.toInt(tx), 256));
    case 1:
      state = 0;
      ty = $.sub(ty, $.mod($.toInt(ty), 256));
    case 2:
      state = 0;
      var txi = $.toInt($.div(tx, 256));
    case 3:
      state = 0;
      var tyi = $.toInt($.div(ty, 256));
    case 4:
      state = 0;
      var i = -1;
      L0: while (true) {
        if (!$.ltB(i, $.add($.div($.div($.SCREEN_WIDTH, 256), camera.get$animatedZoom()), 1))) break L0;
        var t1 = i * 256;
        var u = -1;
        L1: while (true) {
          if (!$.ltB(u, $.add($.div($.div($.SCREEN_HEIGHT, 256), camera.get$animatedZoom()), 1))) break L1;
          var index = $.add($.mod($.add(txi, i), 10), $.mul($.mod($.add(tyi, u), 10), 10));
          if (!$.eqNullB($.index(this.renderChunkCoordinates, index)) && $.index(this.renderChunkCoordinates, index).at$2($.add(txi, i), $.add(tyi, u)) === true && !$.eqNullB($.index(this.renderChunks, index))) {
            c.drawImage$3($.index(this.renderChunks, index), $.add(tx, t1), $.add(ty, u * 256));
          } else {
            $.indexSet(this.renderChunkCoordinates, index, $.Vec2$2($.add(txi, i), $.add(tyi, u)));
            $.indexSet(this.renderChunks, index, this.generateTileChunk$2($.mul($.add(txi, i), 8), $.mul($.add(tyi, u), 8)));
          }
          ++u;
        }
        ++i;
      }
  }
 },
 TileManager$1: function(location$) {
  this.renderChunks = $.HashMapImplementation$0();
  this.renderChunkCoordinates = $.HashMapImplementation$0();
 }
};

$$.OverlayManager = {"":
 ["dusk_night", "night_dawn", "SUNSET", "SUNRISE"],
 super: "Object",
 render$2: function(c, camera) {
  var time = $.world.get$time();
  var t1 = this.SUNRISE;
  if ($.gtB(time, $.sub(t1, 1)) && $.ltB(time, $.add(t1, 1))) {
    var p = $.sub(1, $.div($.sub($.add(t1, 1), time), 2));
    c.set$globalAlpha(0.75 - p * 0.75);
    t1 = this.night_dawn;
    var color1 = $.Color$fromString$1($.index(t1, $.toInt($.floor($.mul(p, $.sub($.get$length(t1), 1))))));
    color1.blend$2($.Color$fromString$1($.index(t1, $.toInt($.ceil($.mul(p, $.sub($.get$length(t1), 1)))))), $.sub($.mul(p, $.sub($.get$length(t1), 1)), $.floor($.mul(p, $.sub($.get$length(t1), 1)))));
    color1.subtract$1(128);
    c.set$fillStyle(color1.toString$0());
    c.fillRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
  } else {
    if ($.ltB(time, $.sub(t1, 1)) || $.gtB(time, $.add(this.SUNSET, 1))) {
      if ($.ltB(time, $.sub(t1, 1))) {
        time = $.add(time, 24);
      }
      var ASUNRISE = $.add(t1, 23);
      var ASUNSET = $.add(this.SUNSET, 1);
      p = $.div($.sub(ASUNRISE, time), $.sub(ASUNRISE, ASUNSET));
      c.set$globalAlpha(0.75);
      var sunset = $.Color$fromString$1($.index(this.night_dawn, 0));
      t1 = this.dusk_night;
      sunset.blend$2($.Color$fromString$1($.index(t1, $.sub($.get$length(t1), 1))), p);
      sunset.subtract$1(128);
      c.set$fillStyle(sunset.toString$0());
      c.fillRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
    } else {
      t1 = this.SUNSET;
      if ($.gtB(time, $.sub(t1, 1)) && $.ltB(time, $.add(t1, 1))) {
        p = $.sub(1, $.div($.sub($.add(t1, 1), time), 2));
        c.set$globalAlpha(p * 0.75);
        t1 = this.dusk_night;
        color1 = $.Color$fromString$1($.index(t1, $.toInt($.floor($.mul(p, $.sub($.get$length(t1), 1))))));
        color1.blend$2($.Color$fromString$1($.index(t1, $.toInt($.ceil($.mul(p, $.sub($.get$length(t1), 1)))))), $.sub($.mul(p, $.sub($.get$length(t1), 1)), $.floor($.mul(p, $.sub($.get$length(t1), 1)))));
        color1.subtract$1(128);
        c.set$fillStyle(color1.toString$0());
        c.fillRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
      }
    }
  }
  c.set$globalAlpha(1);
 }
};

$$.MenuButton = {"":
 ["height=", "width=", "action", "text!", "y", "x"],
 super: "Vec2",
 render$1: function(c) {
  c.save$0();
  c.set$font('18px Arial');
  if ($.eqNullB(this.width)) {
    this.width = $.add(c.measureText$1(this.text).get$width(), 20);
  }
  c.translate$2(this.x, this.y);
  c.set$fillStyle('#fff');
  c.fillRect$4($.div($.neg(this.width), 2), $.div($.neg(this.height), 2), this.width, this.height);
  c.set$fillStyle('#000');
  c.fillText$3(this.text, $.add($.div($.neg(this.width), 2), 10), 0);
  c.restore$0();
 },
 clickAt$2: function(px, py) {
  return $.ltB($.abs($.sub(px, this.x)), $.div(this.width, 2)) && $.ltB($.abs($.sub(py, this.y)), $.div(this.height, 2));
 },
 action$0: function() { return this.action.$call$0(); }
};

$$.MenuInterface = {"":
 ["buttons", "renderFunction", "data", "type="],
 super: "Object",
 renderOptionsMenu$1: function(c) {
  var t1 = ({});
  t1.c_12 = c;
  $.forEach(this.buttons, new $.Closure99(t1));
 },
 get$renderOptionsMenu: function() { return new $.Closure119(this, 'renderOptionsMenu$1'); },
 render$1: function(c) {
  c.save$0();
  this.renderFunction$1(c);
  c.restore$0();
 },
 clickAt$2: function(x, y) {
  var t1 = ({});
  t1.y_2 = y;
  t1.x_1 = x;
  t1.returner_3 = false;
  $.some(this.buttons, new $.Closure100(t1));
  return t1.returner_3;
 },
 renderFunction$1: function(arg0) { return this.renderFunction.$call$1(arg0); },
 MenuInterface$2: function(type, data) {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'MenuButton'}));
  this.buttons = t1;
    switch (this.type) {
    case 'options':
      this.renderFunction = this.get$renderOptionsMenu();
      var options = $.index(this.data, 'options');
      for (var i = 0; $.ltB(i, $.get$length(options)); ++i) {
        var name$ = $.index($.index(options, i), 'name');
        var func = $.index($.index(options, i), 'func');
        $.add$1(this.buttons, $.MenuButton$4(name$, func, $.div($.SCREEN_WIDTH, 8), $.add($.div($.SCREEN_HEIGHT, 8), i * 40)));
      }
      $.add$1(this.buttons, $.MenuButton$4('Exit', new $.Closure98(), $.div($.SCREEN_WIDTH, 8), $.add($.div($.SCREEN_HEIGHT, 8), $.mul($.get$length(options), 40))));
      break;
  }
 }
};

$$.World = {"":
 ["player?", "dayCount", "awakePopulation=", "totalPopulation=", "night_mode", "dayLength", "time?", "pathnodes?", "paths?", "itemImages!", "collisionMap", "map_width", "offscene?", "onscene?", "objects?", "camera", "overlay", "menuInterfaces?", "topTileManager", "bottomTileManager", "currentMapTree?", "mapsTree", "dataTree?"],
 super: "Object",
 render$1: function(c) {
  var t1 = ({});
  t1.c_1 = c;
  t1.c_1.setTransform$6(1, 0, 0, 1, 0, 0);
  t1.c_1.clearRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
  t1.c_1.save$0();
  t1.c_1.translate$2($.div($.SCREEN_WIDTH, 2), $.div($.SCREEN_HEIGHT, 2));
  t1.c_1.scale$2(this.camera.get$animatedZoom(), this.camera.get$animatedZoom());
  t1.c_1.translate$2($.neg(this.camera.get$x()), $.neg(this.camera.get$y()));
  t1.c_1.set$font('12px Arial');
  this.bottomTileManager.render$2(t1.c_1, this.camera);
  $.forEach(this.onscene, new $.Closure71(t1));
  t1.c_1.set$globalAlpha(0.5);
  $.forEach(this.paths, new $.Closure72(t1));
  this.topTileManager.render$2(t1.c_1, this.camera);
  t1.c_1.restore$0();
  this.overlay.render$2(t1.c_1, this.camera);
  $.forEach(this.menuInterfaces, new $.Closure73(t1));
  $.renderNotifications(t1.c_1);
 },
 damageBubble$3: function(point, radius, damage) {
  var t1 = ({});
  t1.damage_3 = damage;
  t1.point_1 = point;
  t1.radius_2 = radius;
  var attacked = $.List((void 0));
  $.setRuntimeTypeInfo(attacked, ({E: 'Avatar'}));
  t1.attacked_4 = attacked;
  $.forEach($.index($.tags, 'actor'), new $.Closure91(t1));
  return t1.attacked_4;
 },
 update$0: function() {
  if (this.night_mode === true && $.gtB(this.time, 6.5) && $.ltB(this.time, 21)) {
    this.night_mode = false;
    this.dayCount = $.add(this.dayCount, 1);
    $.notify('Day ' + $.S(this.dayCount));
    $.notify('Total Population : ' + $.S(this.totalPopulation));
    if ($.tags.containsKey$1('lost') === true) {
      $.forEach($.index($.tags, 'lost'), new $.Closure78());
    }
    if ($.tags.containsKey$1('following') === true) {
      $.forEach($.index($.tags, 'following'), new $.Closure79());
    }
    if ($.tags.containsKey$1('zombie') === true) {
      $.forEach($.index($.tags, 'zombie'), new $.Closure80());
    }
  } else {
    if (this.night_mode !== true) {
      var t1 = $.gtB(this.time, 21) || $.ltB(this.time, 6.5);
    } else {
      t1 = false;
    }
    if (t1) {
      this.night_mode = true;
      $.forEach($.index($.tags, 'wander'), new $.Closure81());
      $.notify('Lost Citizens : ' + $.S($.get$length($.index($.tags, 'lost'))));
    }
  }
  if (this.night_mode !== true && $.gtB(this.time, 16) && $.rpat(5) === true) {
    var citizen = $.index($.index($.tags, 'wander'), $.toInt($.mul($.get$length($.index($.tags, 'wander')), $.random())));
    if (citizen.hasTag$1('ai') === true && citizen.hasTag$1('lost') !== true && citizen.hasTag$1('citizen') === true) {
      if ($.ltB($.random(), 0.9)) {
        $.switchTag(citizen, 'wander', 'homebound');
        $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(citizen);
      } else {
        $.add$1(citizen.get$tags(), 'lost');
        $.addTag(citizen, 'lost');
      }
    }
  }
  if (this.night_mode !== true && $.ltB(this.time, 12) && $.ltB(this.awakePopulation, this.totalPopulation)) {
    var house = $.index($.index($.tags, 'house'), $.toInt($.mul($.get$length($.index($.tags, 'house')), $.random())));
    this.spawnObject$2('citizen', $.makeLiteralMap(['tag', ['friendly', $.ltB($.random(), 0.5) ? 'wander' : 'traveler', 'ai'], 'x', house.get$x(), 'y', house.get$y(), 'home', house]));
    this.awakePopulation = $.add(this.awakePopulation, 1);
  }
  if (this.night_mode === true && $.rpat(60) === true && $.tags.containsKey$1('lost') === true && $.gtB($.get$length($.index($.tags, 'lost')), 0)) {
    t1 = $.index($.index($.tags, 'lost'), $.toInt($.mul($.get$length($.index($.tags, 'lost')), $.random())));
    var t2 = $.toInt($.mul(5, $.random()));
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
    t1.say$1($.CTC29[t2]);
  }
  var player = $.index($.index($.tags, 'player'), 0);
  var inc = $.Vec2$2($.sub($.event.key$1('d'), $.event.key$1('a')), $.sub($.event.key$1('s'), $.event.key$1('w')));
  inc.normalize$0().multiplyScalar$1(2 * (1 + $.mul(4, $.event.key$1('shift'))));
  $.add$1(player.get$velocity(), inc);
  if ($.event.get$mouseDown() === true) {
    player.set$attacking(true);
    player.set$attackDirection($.event.get$mouse_position().clone$0().subTo$2($.div($.SCREEN_WIDTH, 2), $.div($.SCREEN_HEIGHT, 2)).normalize$0());
  } else {
    player.set$attacking(false);
  }
  t1 = this.camera;
  t1.set$x($.sub(t1.get$x(), $.div($.sub(this.camera.get$x(), $.add(player.get$x(), $.mul(player.get$velocity().get$x(), 5))), 5)));
  t1 = this.camera;
  t1.set$y($.sub(t1.get$y(), $.div($.sub(this.camera.get$y(), $.add(player.get$y(), $.mul(player.get$velocity().get$y(), 5))), 5)));
  t1 = this.camera;
  t1.set$zoom($.add(t1.get$zoom(), $.div($.sub($.event.key$1('up'), $.event.key$1('down')), 10.0)));
  this.camera.update$0();
  if ($.tags.containsKey$1('uninit') === true) {
    $.forEach($.index($.tags, 'uninit'), new $.Closure82());
    t1 = $.tags;
    t2 = $.List((void 0));
    $.setRuntimeTypeInfo(t2, ({E: 'GameObject'}));
    $.indexSet(t1, 'uninit', t2);
  }
  for (t1 = $.iterator($.tags.getKeys$0()); t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    var lst = $.index($.tags, t2);
    if (typeof lst !== 'string' && (typeof lst !== 'object'||lst.constructor !== Array)) return this.update$0$bailout(1, t1, lst, 0);
    var i = $.toInt($.mul($.random(), lst.length));
    if (typeof i !== 'number') return this.update$0$bailout(2, lst, t1, i);
    var iter = 0;
    for (; iter < lst.length / 16; ++iter, ++i) {
      var index = $.mod(i, lst.length);
      if (index !== (index | 0)) throw $.iae(index);
      t2 = lst.length;
      if (index < 0 || index >= t2) throw $.ioore(index);
      if (lst[index].get$markedForRemoval() === true) {
        $.removeRange(lst, index, 1);
      }
    }
  }
  i = $.toInt($.mul($.get$length(this.objects), $.random()));
  if (typeof i !== 'number') return this.update$0$bailout(3, i, 0, 0);
  iter = 0;
  for (; $.ltB(iter, $.div($.get$length(this.objects), 16)); ++iter, ++i) {
    index = $.mod(i, $.get$length(this.objects));
    if ($.index(this.objects, index).get$markedForRemoval() === true) {
      $.removeRange(this.objects, index, 1);
    }
  }
  $.forEach(this.objects, new $.Closure83());
  if ($.tags.containsKey$1('actor') === true) {
    $.forEach($.index($.tags, 'actor'), new $.Closure84(this));
  }
  if ($.tags.containsKey$1('spawn') === true) {
    $.forEach($.index($.tags, 'spawn'), new $.Closure85());
  }
  this.sortScreenObjects$0();
  this.time = $.mod($.add(this.time, $.div(24, this.dayLength)), 24);
 },
 update$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      lst = env1;
      break;
    case 2:
      lst = env0;
      t1 = env1;
      i = env2;
      break;
    case 3:
      i = env0;
      break;
  }
  switch (state) {
    case 0:
      if (this.night_mode === true && $.gtB(this.time, 6.5) && $.ltB(this.time, 21)) {
        this.night_mode = false;
        this.dayCount = $.add(this.dayCount, 1);
        $.notify('Day ' + $.S(this.dayCount));
        $.notify('Total Population : ' + $.S(this.totalPopulation));
        if ($.tags.containsKey$1('lost') === true) {
          $.forEach($.index($.tags, 'lost'), new $.Closure78());
        }
        if ($.tags.containsKey$1('following') === true) {
          $.forEach($.index($.tags, 'following'), new $.Closure79());
        }
        if ($.tags.containsKey$1('zombie') === true) {
          $.forEach($.index($.tags, 'zombie'), new $.Closure80());
        }
      } else {
        if (this.night_mode !== true) {
          var t1 = $.gtB(this.time, 21) || $.ltB(this.time, 6.5);
        } else {
          t1 = false;
        }
        if (t1) {
          this.night_mode = true;
          $.forEach($.index($.tags, 'wander'), new $.Closure81());
          $.notify('Lost Citizens : ' + $.S($.get$length($.index($.tags, 'lost'))));
        }
      }
      if (this.night_mode !== true && $.gtB(this.time, 16) && $.rpat(5) === true) {
        var citizen = $.index($.index($.tags, 'wander'), $.toInt($.mul($.get$length($.index($.tags, 'wander')), $.random())));
        if (citizen.hasTag$1('ai') === true && citizen.hasTag$1('lost') !== true && citizen.hasTag$1('citizen') === true) {
          if ($.ltB($.random(), 0.9)) {
            $.switchTag(citizen, 'wander', 'homebound');
            $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(citizen);
          } else {
            $.add$1(citizen.get$tags(), 'lost');
            $.addTag(citizen, 'lost');
          }
        }
      }
      if (this.night_mode !== true && $.ltB(this.time, 12) && $.ltB(this.awakePopulation, this.totalPopulation)) {
        var house = $.index($.index($.tags, 'house'), $.toInt($.mul($.get$length($.index($.tags, 'house')), $.random())));
        this.spawnObject$2('citizen', $.makeLiteralMap(['tag', ['friendly', $.ltB($.random(), 0.5) ? 'wander' : 'traveler', 'ai'], 'x', house.get$x(), 'y', house.get$y(), 'home', house]));
        this.awakePopulation = $.add(this.awakePopulation, 1);
      }
      if (this.night_mode === true && $.rpat(60) === true && $.tags.containsKey$1('lost') === true && $.gtB($.get$length($.index($.tags, 'lost')), 0)) {
        t1 = $.index($.index($.tags, 'lost'), $.toInt($.mul($.get$length($.index($.tags, 'lost')), $.random())));
        var t2 = $.toInt($.mul(5, $.random()));
        if (t2 !== (t2 | 0)) throw $.iae(t2);
        if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
        t1.say$1($.CTC29[t2]);
      }
      var player = $.index($.index($.tags, 'player'), 0);
      var inc = $.Vec2$2($.sub($.event.key$1('d'), $.event.key$1('a')), $.sub($.event.key$1('s'), $.event.key$1('w')));
      inc.normalize$0().multiplyScalar$1(2 * (1 + $.mul(4, $.event.key$1('shift'))));
      $.add$1(player.get$velocity(), inc);
      if ($.event.get$mouseDown() === true) {
        player.set$attacking(true);
        player.set$attackDirection($.event.get$mouse_position().clone$0().subTo$2($.div($.SCREEN_WIDTH, 2), $.div($.SCREEN_HEIGHT, 2)).normalize$0());
      } else {
        player.set$attacking(false);
      }
      t1 = this.camera;
      t1.set$x($.sub(t1.get$x(), $.div($.sub(this.camera.get$x(), $.add(player.get$x(), $.mul(player.get$velocity().get$x(), 5))), 5)));
      t1 = this.camera;
      t1.set$y($.sub(t1.get$y(), $.div($.sub(this.camera.get$y(), $.add(player.get$y(), $.mul(player.get$velocity().get$y(), 5))), 5)));
      t1 = this.camera;
      t1.set$zoom($.add(t1.get$zoom(), $.div($.sub($.event.key$1('up'), $.event.key$1('down')), 10.0)));
      this.camera.update$0();
      if ($.tags.containsKey$1('uninit') === true) {
        $.forEach($.index($.tags, 'uninit'), new $.Closure82());
        t1 = $.tags;
        t2 = $.List((void 0));
        $.setRuntimeTypeInfo(t2, ({E: 'GameObject'}));
        $.indexSet(t1, 'uninit', t2);
      }
      t1 = $.iterator($.tags.getKeys$0());
    case 1:
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!(t1.hasNext$0() === true)) break L0;
            t2 = t1.next$0();
            var lst = $.index($.tags, t2);
          case 1:
            state = 0;
            var i = $.toInt($.mul($.random(), $.get$length(lst)));
          case 2:
            state = 0;
            var iter = 0;
            L1: while (true) {
              if (!$.ltB(iter, $.div($.get$length(lst), 16))) break L1;
              var index = $.mod(i, $.get$length(lst));
              if ($.index(lst, index).get$markedForRemoval() === true) {
                $.removeRange(lst, index, 1);
              }
              ++iter;
              i = $.add(i, 1);
            }
        }
      }
      i = $.toInt($.mul($.get$length(this.objects), $.random()));
    case 3:
      state = 0;
      iter = 0;
      L2: while (true) {
        if (!$.ltB(iter, $.div($.get$length(this.objects), 16))) break L2;
        index = $.mod(i, $.get$length(this.objects));
        if ($.index(this.objects, index).get$markedForRemoval() === true) {
          $.removeRange(this.objects, index, 1);
        }
        ++iter;
        i = $.add(i, 1);
      }
      $.forEach(this.objects, new $.Closure83());
      if ($.tags.containsKey$1('actor') === true) {
        $.forEach($.index($.tags, 'actor'), new $.Closure84(this));
      }
      if ($.tags.containsKey$1('spawn') === true) {
        $.forEach($.index($.tags, 'spawn'), new $.Closure85());
      }
      this.sortScreenObjects$0();
      this.time = $.mod($.add(this.time, $.div(24, this.dayLength)), 24);
  }
 },
 sortScreenObjects$0: function() {
  var iter = $.toInt($.mul($.random(), $.get$length(this.offscene)));
  if (typeof iter !== 'number') return this.sortScreenObjects$0$bailout(1, iter);
  var times = 0;
  for (; $.ltB(times, $.add($.div($.get$length(this.offscene), 16), 1)); ++iter, ++times) {
    var i = $.mod(iter, $.get$length(this.offscene));
    if ($.ltB($.index(this.offscene, i).distanceTo$1(this.player), $.RENDER_DISTANCE)) {
      $.add$1(this.onscene, $.index(this.offscene, i));
      $.removeRange(this.offscene, i, 1);
    } else {
      if ($.index(this.offscene, i).get$markedForRemoval() === true) {
        $.removeRange(this.offscene, i, 1);
      }
    }
  }
  iter = $.toInt($.mul($.random(), $.get$length(this.onscene)));
  if (typeof iter !== 'number') return this.sortScreenObjects$0$bailout(2, iter);
  times = 0;
  for (; $.ltB(times, $.div($.get$length(this.onscene), 16)); ++iter, ++times) {
    i = $.mod(iter, $.get$length(this.onscene));
    if ($.gtB($.index(this.onscene, i).distanceTo$1(this.player), $.RENDER_DISTANCE)) {
      $.add$1(this.offscene, $.index(this.onscene, i));
      $.removeRange(this.onscene, i, 1);
    } else {
      if ($.index(this.onscene, i).get$markedForRemoval() === true) {
        $.removeRange(this.onscene, i, 1);
      }
    }
  }
  for (iter = 0; iter < $.add(1, $.div($.get$length(this.onscene), 4)); ++iter) {
    var i0 = $.toInt($.mul($.random(), $.get$length(this.onscene)));
    var i1 = $.mod($.toInt($.sub($.add(i0, $.mul($.random(), 6)), 3)), $.get$length(this.onscene));
    if ($.gtB(i0, i1)) {
      var t0 = i0;
      i0 = i1;
      i1 = t0;
    }
    if (!$.eqB(i0, i1)) {
      var a0 = $.index(this.onscene, i0);
      var a1 = $.index(this.onscene, i1);
      if ($.gtB(a0.get$y(), a1.get$y())) {
        $.indexSet(this.onscene, i0, a1);
        $.indexSet(this.onscene, i1, a0);
      }
    }
  }
 },
 sortScreenObjects$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      iter = env0;
      break;
    case 2:
      iter = env0;
      break;
  }
  switch (state) {
    case 0:
      var iter = $.toInt($.mul($.random(), $.get$length(this.offscene)));
    case 1:
      state = 0;
      var times = 0;
      L0: while (true) {
        if (!$.ltB(times, $.add($.div($.get$length(this.offscene), 16), 1))) break L0;
        var i = $.mod(iter, $.get$length(this.offscene));
        if ($.ltB($.index(this.offscene, i).distanceTo$1(this.player), $.RENDER_DISTANCE)) {
          $.add$1(this.onscene, $.index(this.offscene, i));
          $.removeRange(this.offscene, i, 1);
        } else {
          if ($.index(this.offscene, i).get$markedForRemoval() === true) {
            $.removeRange(this.offscene, i, 1);
          }
        }
        iter = $.add(iter, 1);
        ++times;
      }
      iter = $.toInt($.mul($.random(), $.get$length(this.onscene)));
    case 2:
      state = 0;
      times = 0;
      L1: while (true) {
        if (!$.ltB(times, $.div($.get$length(this.onscene), 16))) break L1;
        i = $.mod(iter, $.get$length(this.onscene));
        if ($.gtB($.index(this.onscene, i).distanceTo$1(this.player), $.RENDER_DISTANCE)) {
          $.add$1(this.offscene, $.index(this.onscene, i));
          $.removeRange(this.onscene, i, 1);
        } else {
          if ($.index(this.onscene, i).get$markedForRemoval() === true) {
            $.removeRange(this.onscene, i, 1);
          }
        }
        iter = $.add(iter, 1);
        ++times;
      }
      iter = 0;
      L2: while (true) {
        if (!(iter < $.add(1, $.div($.get$length(this.onscene), 4)))) break L2;
        var i0 = $.toInt($.mul($.random(), $.get$length(this.onscene)));
        var i1 = $.mod($.toInt($.sub($.add(i0, $.mul($.random(), 6)), 3)), $.get$length(this.onscene));
        if ($.gtB(i0, i1)) {
          var t0 = i0;
          i0 = i1;
          i1 = t0;
        }
        if (!$.eqB(i0, i1)) {
          var a0 = $.index(this.onscene, i0);
          var a1 = $.index(this.onscene, i1);
          if ($.gtB(a0.get$y(), a1.get$y())) {
            $.indexSet(this.onscene, i0, a1);
            $.indexSet(this.onscene, i1, a0);
          }
        }
        ++iter;
      }
  }
 },
 pickUpItem$1: function(item) {
  $.print('TODO : MAKE PICK UP ITEM');
 },
 getItemImage$1: function(index) {
  if (!$.eqNullB(this.itemImages)) {
    return $.index(this.itemImages, index);
  } else {
    return $.BLANK_IMAGE;
  }
 },
 startCycle$1: function(context) {
  var t1 = ({});
  t1.context_10 = context;
  this.player = $.index($.index($.tags, 'player'), 0);
  this.sortScreenObjects$0();
  this.camera.set$2(this.player.get$x(), this.player.get$y());
  var debugPathNodes = $.List((void 0));
  $.setRuntimeTypeInfo(debugPathNodes, ({E: 'Vec2'}));
  t1.debugPathNodes_11 = debugPathNodes;
  $.add$1($.event.get$onKeyPress(), new $.Closure68(this, t1));
  $.add$1($.event.get$onClick(), new $.Closure69(this));
  new $.Closure70(this, t1).$call$1(0);
 },
 getClosePathNodes$1: function(v) {
  var t1 = ({});
  t1.v_1 = v;
  var cnodes = $.List((void 0));
  $.setRuntimeTypeInfo(cnodes, ({E: 'PathNode'}));
  t1.cnodes_2 = cnodes;
  $.forEach(this.pathnodes, new $.Closure114(t1));
  return t1.cnodes_2;
 },
 addObject$1: function(instance) {
  $.add$1(this.objects, instance);
  $.add$1(this.offscene, instance);
 },
 collisionAtVec2$1: function(v) {
  return this.collisionAt$2(v.get$x(), v.get$y());
 },
 collisionAt$2: function(x, y) {
  var x = $.toInt($.div(x, 32));
  var y = $.toInt($.add($.div(y, 32), 0.5));
  return $.index(this.collisionMap, $.add(x, $.mul(y, this.map_width)));
 },
 fmtCollisionMap$1: function(data) {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'bool'}));
  this.collisionMap = t1;
  var chars = $.splitChars(data);
  if (typeof chars !== 'string' && (typeof chars !== 'object'||chars.constructor !== Array)) return this.fmtCollisionMap$1$bailout(data, 1, chars);
  for (var cir = 0; $.ltB(cir, $.mul($.get$length(data), 4)); ++cir) {
    var ci = $.toInt(cir / 4);
    var bseq = $.mod(cir, 4);
    if (ci !== (ci | 0)) throw $.iae(ci);
    t1 = chars.length;
    if (ci < 0 || ci >= t1) throw $.ioore(ci);
    var hexMap = $.CTC28.operator$index$1(chars[ci]);
    if (!$.eqNullB(hexMap)) {
      t1 = this.collisionMap;
      $.add$1(t1, $.eqB($.index(hexMap, bseq), 1) && true);
    }
  }
  this.map_width = $.toInt($.ceil($.sqrt($.get$length(this.collisionMap))));
  $.print('Collision Map Loaded, Size : ' + $.S($.get$length(this.collisionMap)));
 },
 fmtCollisionMap$1$bailout: function(data, state, env0) {
  switch (state) {
    case 1:
      chars = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.List((void 0));
      $.setRuntimeTypeInfo(t1, ({E: 'bool'}));
      this.collisionMap = t1;
      var chars = $.splitChars(data);
    case 1:
      state = 0;
      var cir = 0;
      L0: while (true) {
        if (!$.ltB(cir, $.mul($.get$length(data), 4))) break L0;
        var ci = $.toInt(cir / 4);
        var bseq = $.mod(cir, 4);
        var hexMap = $.CTC28.operator$index$1($.index(chars, ci));
        if (!$.eqNullB(hexMap)) {
          t1 = this.collisionMap;
          $.add$1(t1, $.eqB($.index(hexMap, bseq), 1) && true);
        }
        ++cir;
      }
      this.map_width = $.toInt($.ceil($.sqrt($.get$length(this.collisionMap))));
      $.print('Collision Map Loaded, Size : ' + $.S($.get$length(this.collisionMap)));
  }
 },
 unpackObjects$1: function(list) {
  var t1 = ({});
  t1.list_3 = list;
  var box_0 = ({});
  for (box_0.i_1 = 0; $.ltB(box_0.i_1, $.get$length(t1.list_3)); box_00 = ({}), box_00.i_1 = box_0.i_1, box_00.i_1 = $.add(box_00.i_1, 1), box_0 = box_00) {
        switch ($.index($.index(t1.list_3, box_0.i_1), 'type')) {
      case 'animation':
        $.indexSet($.animationMap, $.index($.index(t1.list_3, box_0.i_1), 'name'), $.Animation$1($.index(t1.list_3, box_0.i_1)));
        break;
      case 'avatar':
        $.indexSet($.classMap, $.index($.index(t1.list_3, box_0.i_1), 'name'), new $.Closure52(box_0, t1));
        break;
      case 'item':
        $.indexSet($.classMap, $.index($.index(t1.list_3, box_0.i_1), 'name'), new $.Closure53(box_0, t1));
        break;
      case 'node':
        $.indexSet($.classMap, $.index($.index(t1.list_3, box_0.i_1), 'name'), new $.Closure54(box_0, t1));
        break;
      default:
        $.print('Type not found: ' + $.S($.index($.index(t1.list_3, box_0.i_1), 'type')));
        break;
    }
  }
  var box_00;
 },
 unpackMapPaths$1: function(lst) {
  $.forEach(lst, new $.Closure67(this));
 },
 unpackMapObjects$1: function(rol) {
  if (typeof rol !== 'string' && (typeof rol !== 'object'||rol.constructor !== Array)) return this.unpackMapObjects$1$bailout(rol, 1, rol);
  for (var i = 0; i < rol.length; ++i) {
    var t1 = rol.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = $.index(rol[i], 'type');
    var t3 = rol.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    this.spawnObject$2(t2, rol[i]);
  }
 },
 unpackMapObjects$1$bailout: function(rol, state, env0) {
  switch (state) {
    case 1:
      rol = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, $.get$length(rol))) break L0;
        this.spawnObject$2($.index($.index(rol, i), 'type'), $.index(rol, i));
        ++i;
      }
  }
 },
 spawnObject$2: function(type, props) {
  var ob = $.index($.classMap, type).$call$1(props);
  ob.set$type(type);
  $.add$1(ob.get$tags(), type);
  $.add$1(ob.get$tags(), 'uninit');
  $.addTag(ob, type);
  $.addTag(ob, 'uninit');
  this.addObject$1(ob);
  return ob;
 },
 loadMap$2: function(name$, callback) {
  var t1 = ({});
  t1.callback_18 = callback;
  var map = $.index(this.mapsTree, name$);
  this.currentMapTree = map;
  this.unpackMapObjects$1($.index(map, 'objects'));
  this.unpackMapPaths$1($.index(map, 'paths'));
  this.bottomTileManager = $.TileManager$1('map_bottom');
  this.topTileManager = $.TileManager$1('map_top');
  $.loadFile($.index(map, 'collision-map'), new $.Closure65(this, t1));
 },
 load$2: function(json, callback) {
  var t1 = ({});
  t1.callback_12 = callback;
  $.print('Beginning Parse');
  this.dataTree = $.parse(json);
  var objectList = $.index(this.dataTree, 'objects');
  this.mapsTree = $.index(this.dataTree, 'maps');
  $.print('Unpacking Game');
  this.unpackObjects$1(objectList);
  $.print('Data Parsed, Loading Test Map');
  $.loadSplitImage('items.png', new $.Closure47(this, t1), 32, 32);
 },
 get$load: function() { return new $.Closure118(this, 'load$2'); },
 World$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'GameObject'}));
  this.objects = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'GameObject'}));
  this.onscene = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'GameObject'}));
  this.offscene = t1;
  this.camera = $.Camera$3(0, 0, 1);
  this.overlay = $.OverlayManager$0();
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'MenuInterface'}));
  this.menuInterfaces = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Path'}));
  this.paths = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'PathNode'}));
  this.pathnodes = t1;
 }
};

$$.FrameMap = {"":
 ["frames", "positions", "orientations"],
 super: "Object",
 getImage$2: function(orientation, position) {
  var t1 = this.frames;
  var t2 = this.positions;
  return $.index(t1, $.add($.mul(t2, orientation), $.mod(position, t2)));
 },
 render$3: function(c, orientation, position) {
  c.drawImage$3(this.getImage$2(orientation, position), 0, 0);
 }
};

$$.Animation = {"":
 ["frameMapIndex?"],
 super: "Object",
 render$4: function(c, animation, orientation, frame) {
  c.save$0();
  c.translate$2(-32, -32);
  var fmap = $.index(this.frameMapIndex, animation);
  if (!$.eqNullB(fmap)) {
    fmap.render$3(c, orientation, frame);
  }
  c.restore$0();
 },
 loadDeathAnimation$2: function(path, callback) {
  var t1 = ({});
  t1.callback_15 = callback;
  $.loadSplitImage(path, new $.Closure59(t1), 64, 64);
 },
 loadSlashAnimation$2: function(path, callback) {
  var t1 = ({});
  t1.callback_16 = callback;
  $.loadSplitImage(path, new $.Closure60(t1), 64, 64);
 },
 loadWalkAnimation$2: function(path, callback) {
  var t1 = ({});
  t1.callback_17 = callback;
  $.loadSplitImage(path, new $.Closure61(t1), 64, 64);
 },
 loadProperties$1: function(properties) {
  $.forEach(properties, new $.Closure55(this));
 },
 Animation$1: function(properties) {
  var t1 = $.List(4);
  $.setRuntimeTypeInfo(t1, ({E: 'FrameMap'}));
  this.frameMapIndex = t1;
  this.loadProperties$1(properties);
 }
};

$$.Notification = {"":
 ["ay", "y=", "timeLeft", "text!"],
 super: "Object",
 render$1: function(c) {
  var t1 = $.ltB(this.timeLeft, 60) ? $.div(this.timeLeft, 60) : 1;
  c.set$globalAlpha($.mul(0.5, t1));
  c.set$fillStyle('#000');
  c.set$font('18px Arial');
  c.fillRect$4(0, $.sub($.SCREEN_HEIGHT, this.ay), $.add(c.measureText$1(this.text).get$width(), 20), 32);
  c.set$fillStyle('#fff');
  c.fillText$3(this.text, 10, $.add($.sub($.SCREEN_HEIGHT, this.ay), 20));
  this.ay = $.sub(this.ay, $.div($.sub(this.ay, this.y), 10));
  c.set$globalAlpha(1);
  t1 = this.timeLeft;
  this.timeLeft = $.sub(t1, 1);
  return $.le(t1, 0);
 }
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this._get$1('error');
 }
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$load: function() {
  return this._get$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this._get$1('error');
 }
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DeprecatedPeerConnectionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this._get$1('open');
 },
 open$2: function(arg0, arg1) { return this.get$open().$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.get$open().$call$3(arg0, arg1, arg2); }
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$readyStateChange: function() {
  return this._get$1('readystatechange');
 },
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$load: function() {
  return this._get$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$keyUp: function() {
  return this._get$1('keyup');
 },
 get$keyDown: function() {
  return this._get$1('keydown');
 },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$load: function() {
  return this._get$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$keyUp: function() {
  return this._get$1('keyup');
 },
 get$keyDown: function() {
  return this._get$1('keydown');
 },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this._get$1('open');
 },
 open$2: function(arg0, arg1) { return this.get$open().$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.get$open().$call$3(arg0, arg1, arg2); },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 _get$1: function(type) {
  return $._EventListenerListImpl$2(this._ptr, type);
 },
 operator$index$1: function(type) {
  return this._get$1($.toLowerCase(type));
 }
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$load: function() {
  return this._get$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this._get$1('error');
 }
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$load: function() {
  return this._get$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this._get$1('error');
 }
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this._get$1('error');
 }
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this._get$1('error');
 }
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this._get$1('error');
 }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this._get$1('open');
 },
 open$2: function(arg0, arg1) { return this.get$open().$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.get$open().$call$3(arg0, arg1, arg2); }
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$load: function() {
  return this._get$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$keyUp: function() {
  return this._get$1('keyup');
 },
 get$keyDown: function() {
  return this._get$1('keydown');
 },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$start: function() {
  return this._get$1('start');
 },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this._get$1('open');
 },
 open$2: function(arg0, arg1) { return this.get$open().$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.get$open().$call$3(arg0, arg1, arg2); },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$load: function() {
  return this._get$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$keyUp: function() {
  return this._get$1('keyup');
 },
 get$keyDown: function() {
  return this._get$1('keydown');
 },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this._get$1('error');
 }
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$readyStateChange: function() {
  return this._get$1('readystatechange');
 },
 get$load: function() {
  return this._get$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$load: function() {
  return this._get$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this._get$1('error');
 }
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  return $.gt(this._lib_length, this._pos);
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC3);
  }
  var t1 = this._array;
  var t2 = this._pos;
  this._pos = $.add(t2, 1);
  return $.index(t1, t2);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._array), this._pos);
 }
};

$$._JsonParser = {"":
 ["position", "length?", "json"],
 super: "Object",
 length$0: function() { return this.length.$call$0(); },
 _error$1: function(message) {
  throw $.captureStackTrace(message);
 },
 _token$0: function() {
  for (var t1 = this.json; true; ) {
    if ($.geB(this.position, $.get$length(this))) {
      return;
    }
    var char$ = $.charCodeAt(t1, this.position);
    var token = $.index($.tokens, char$);
    if (token === 32) {
      this.position = $.add(this.position, 1);
      continue;
    }
    if (token === (void 0)) {
      return 0;
    }
    return token;
  }
 },
 _nextChar$0: function() {
  this.position = $.add(this.position, 1);
  if ($.geB(this.position, $.get$length(this))) {
    return 0;
  }
  return $.charCodeAt(this.json, this.position);
 },
 _char$0: function() {
  if ($.geB(this.position, $.get$length(this))) {
    this._error$1('Unexpected end of JSON stream');
  }
  return $.charCodeAt(this.json, this.position);
 },
 _isToken$1: function(tokenKind) {
  return $.eq(this._token$0(), tokenKind);
 },
 _isDigit$1: function(char$) {
  return $.geB(char$, 48) && $.leB(char$, 57);
 },
 _parseNumber$0: function() {
  if (this._isToken$1(45) !== true) {
    this._error$1('Expected number literal');
  }
  var startPos = this.position;
  var char$ = this._char$0();
  if (char$ === 45) {
    char$ = this._nextChar$0();
  }
  if (char$ === 48) {
    char$ = this._nextChar$0();
  } else {
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
    } else {
      this._error$1('Expected digit when parsing number');
    }
  }
  if (char$ === 46) {
    char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
      var isInt = false;
    } else {
      this._error$1('Expected digit following comma');
      isInt = true;
    }
  } else {
    isInt = true;
  }
  if (char$ === 101 || char$ === 69) {
    char$ = this._nextChar$0();
    if (char$ === 45 || char$ === 43) {
      char$ = this._nextChar$0();
    }
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
      isInt = false;
    } else {
      this._error$1('Expected digit following \'e\' or \'E\'');
    }
  }
  var number = $.substring$2(this.json, startPos, this.position);
  if (isInt) {
    return $.parseInt(number);
  } else {
    return $.parseDouble(number);
  }
 },
 _parseString$0: function() {
  if (this._isToken$1(34) !== true) {
    this._error$1('Expected string literal');
  }
  this.position = $.add(this.position, 1);
  var charCodes = $.List((void 0));
  $.setRuntimeTypeInfo(charCodes, ({E: 'int'}));
  for (var t1 = this.json; true; ) {
    var c = this._char$0();
    if ($.eqB(c, 34)) {
      this.position = $.add(this.position, 1);
      break;
    }
    if ($.eqB(c, 92)) {
      this.position = $.add(this.position, 1);
      if ($.eqB(this.position, $.get$length(this))) {
        this._error$1('\\ at the end of input');
      }
            switch (this._char$0()) {
        case 34:
          c = 34;
          break;
        case 92:
          c = 92;
          break;
        case 47:
          c = 47;
          break;
        case 98:
          c = 8;
          break;
        case 110:
          c = 10;
          break;
        case 114:
          c = 13;
          break;
        case 102:
          c = 12;
          break;
        case 116:
          c = 9;
          break;
        case 117:
          if ($.gtB($.add(this.position, 5), $.get$length(this))) {
            this._error$1('Invalid unicode esacape sequence');
          }
          var codeString = $.substring$2(t1, $.add(this.position, 1), $.add(this.position, 5));
          try {
            c = $.parseInt('0x' + $.S(codeString));
          } catch (exception) {
            $.unwrapException(exception);
            this._error$1('Invalid unicode esacape sequence');
          }
          this.position = $.add(this.position, 4);
          break;
        default:
          this._error$1('Invalid esacape sequence in string literal');
      }
    }
    charCodes.push(c);
    this.position = $.add(this.position, 1);
  }
  return $.String$fromCharCodes(charCodes);
 },
 _parseList$0: function() {
  var list = [];
  this.position = $.add(this.position, 1);
  if (this._isToken$1(93) !== true) {
    for (; true; ) {
      $.add$1(list, this._parseValue$0());
      if (this._isToken$1(44) !== true) {
        break;
      }
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(93) !== true) {
      this._error$1('Expected \']\' at end of list');
    }
  }
  this.position = $.add(this.position, 1);
  return list;
 },
 _parseObject$0: function() {
  var object = $.makeLiteralMap([]);
  if (typeof object !== 'object'||object.constructor !== Array||!!object.immutable$list) return this._parseObject$0$bailout(1, object);
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true; ) {
      var key = this._parseString$0();
      if (this._isToken$1(58) !== true) {
        this._error$1('Expected \':\' when parsing object');
      }
      this.position = $.add(this.position, 1);
      var t1 = this._parseValue$0();
      if (key !== (key | 0)) throw $.iae(key);
      var t2 = object.length;
      if (key < 0 || key >= t2) throw $.ioore(key);
      object[key] = t1;
      if (this._isToken$1(44) !== true) {
        break;
      }
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(125) !== true) {
      this._error$1('Expected \'}\' at end of object');
    }
  }
  this.position = $.add(this.position, 1);
  return object;
 },
 _parseObject$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      object = env0;
      break;
  }
  switch (state) {
    case 0:
      var object = $.makeLiteralMap([]);
    case 1:
      state = 0;
      this.position = $.add(this.position, 1);
      if (this._isToken$1(125) !== true) {
        L0: while (true) {
          if (!true) break L0;
          var key = this._parseString$0();
          if (this._isToken$1(58) !== true) {
            this._error$1('Expected \':\' when parsing object');
          }
          this.position = $.add(this.position, 1);
          $.indexSet(object, key, this._parseValue$0());
          if (this._isToken$1(44) !== true) {
            break;
          }
          this.position = $.add(this.position, 1);
        }
        if (this._isToken$1(125) !== true) {
          this._error$1('Expected \'}\' at end of object');
        }
      }
      this.position = $.add(this.position, 1);
      return object;
  }
 },
 _expectKeyword$2: function(word, value) {
  for (var i = 0; $.ltB(i, $.get$length(word)); ++i) {
    if (!$.eqB(this._char$0(), $.charCodeAt(word, i))) {
      this._error$1('Expected keyword \'' + $.S(word) + '\'');
    }
    this.position = $.add(this.position, 1);
  }
  return value;
 },
 _parseValue$0: function() {
  var token = this._token$0();
  if (token === (void 0)) {
    this._error$1('Nothing to parse');
  }
    switch (token) {
    case 34:
      return this._parseString$0();
    case 45:
      return this._parseNumber$0();
    case 110:
      return this._expectKeyword$2('null', (void 0));
    case 102:
      return this._expectKeyword$2('false', false);
    case 116:
      return this._expectKeyword$2('true', true);
    case 123:
      return this._parseObject$0();
    case 91:
      return this._parseList$0();
    default:
      this._error$1('Unexpected token');
  }
 },
 _parseToplevel$0: function() {
  var result = this._parseValue$0();
  if (!(this._token$0() === (void 0))) {
    this._error$1('Junk at the end of JSON input');
  }
  return result;
 },
 _JsonParser$_internal$1: function(json) {
  if (!($.tokens === (void 0))) {
    return;
  }
  var t1 = $.List(126);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  $.tokens = t1;
  $.indexSet($.tokens, 9, 32);
  $.indexSet($.tokens, 10, 32);
  $.indexSet($.tokens, 13, 32);
  $.indexSet($.tokens, 32, 32);
  $.indexSet($.tokens, 48, 45);
  $.indexSet($.tokens, 49, 45);
  $.indexSet($.tokens, 50, 45);
  $.indexSet($.tokens, 51, 45);
  $.indexSet($.tokens, 52, 45);
  $.indexSet($.tokens, 53, 45);
  $.indexSet($.tokens, 54, 45);
  $.indexSet($.tokens, 55, 45);
  $.indexSet($.tokens, 56, 45);
  $.indexSet($.tokens, 57, 45);
  $.indexSet($.tokens, 45, 45);
  $.indexSet($.tokens, 123, 123);
  $.indexSet($.tokens, 125, 125);
  $.indexSet($.tokens, 91, 91);
  $.indexSet($.tokens, 93, 93);
  $.indexSet($.tokens, 34, 34);
  $.indexSet($.tokens, 58, 58);
  $.indexSet($.tokens, 44, 44);
  $.indexSet($.tokens, 110, 110);
  $.indexSet($.tokens, 116, 116);
  $.indexSet($.tokens, 102, 102);
 }
};

$$.JsonUnsupportedObjectType = {"":
 [],
 super: "Object"
};

$$.JsonStringifier = {"":
 ["_seen", "_sb?"],
 super: "Object",
 _stringify$1: function(object) {
  var t1 = ({});
  if (typeof object === 'number') {
    $.add$1(this._sb, $._numberToString(object));
    return;
  } else {
    if (object === true) {
      $.add$1(this._sb, 'true');
      return;
    } else {
      if (object === false) {
        $.add$1(this._sb, 'false');
        return;
      } else {
        if (object === (void 0)) {
          $.add$1(this._sb, 'null');
          return;
        } else {
          if (typeof object === 'string') {
            $.add$1(this._sb, '"');
            $._escape(this._sb, object);
            $.add$1(this._sb, '"');
            return;
          } else {
            if (typeof object === 'object' && (object.constructor === Array || object.is$List2())) {
              if (typeof object !== 'object'||object.constructor !== Array) return this._stringify$1$bailout(object, 1, object);
              this._checkCycle$1(object);
              $.add$1(this._sb, '[');
              if (object.length > 0) {
                t1 = object.length;
                if (0 >= t1) throw $.ioore(0);
                this._stringify$1(object[0]);
                for (var i = 1; i < object.length; ++i) {
                  $.add$1(this._sb, ',');
                  t1 = object.length;
                  if (i < 0 || i >= t1) throw $.ioore(i);
                  this._stringify$1(object[i]);
                }
              }
              $.add$1(this._sb, ']');
              $.removeLast(this._seen);
              return;
            } else {
              if (typeof object === 'object' && object.is$Map()) {
                this._checkCycle$1(object);
                $.add$1(this._sb, '{');
                t1.first_1 = true;
                object.forEach$1(new $.Closure101(this, t1));
                $.add$1(this._sb, '}');
                $.removeLast(this._seen);
                return;
              } else {
                throw $.captureStackTrace($.CTC32);
              }
            }
          }
        }
      }
    }
  }
 },
 _stringify$1$bailout: function(object, state, env0) {
  switch (state) {
    case 1:
      object = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = ({});
    case 1:
      if ((state == 0 && typeof object === 'number')) {
        $.add$1(this._sb, $._numberToString(object));
        return;
      } else {
        switch (state) {
          case 0:
          case 1:
            if ((state == 0 && object === true)) {
              $.add$1(this._sb, 'true');
              return;
            } else {
              switch (state) {
                case 0:
                case 1:
                  if ((state == 0 && object === false)) {
                    $.add$1(this._sb, 'false');
                    return;
                  } else {
                    switch (state) {
                      case 0:
                      case 1:
                        if ((state == 0 && object === (void 0))) {
                          $.add$1(this._sb, 'null');
                          return;
                        } else {
                          switch (state) {
                            case 0:
                            case 1:
                              if ((state == 0 && typeof object === 'string')) {
                                $.add$1(this._sb, '"');
                                $._escape(this._sb, object);
                                $.add$1(this._sb, '"');
                                return;
                              } else {
                                switch (state) {
                                  case 0:
                                  case 1:
                                    if (state == 1 || (state == 0 && (typeof object === 'object' && ((object.constructor === Array || object.is$List2()))))) {
                                      switch (state) {
                                        case 0:
                                        case 1:
                                          state = 0;
                                          this._checkCycle$1(object);
                                          $.add$1(this._sb, '[');
                                          if ($.gtB($.get$length(object), 0)) {
                                            this._stringify$1($.index(object, 0));
                                            var i = 1;
                                            L0: while (true) {
                                              if (!$.ltB(i, $.get$length(object))) break L0;
                                              $.add$1(this._sb, ',');
                                              this._stringify$1($.index(object, i));
                                              ++i;
                                            }
                                          }
                                          $.add$1(this._sb, ']');
                                          $.removeLast(this._seen);
                                          return;
                                      }
                                    } else {
                                      if (typeof object === 'object' && object.is$Map()) {
                                        this._checkCycle$1(object);
                                        $.add$1(this._sb, '{');
                                        t1.first_1 = true;
                                        object.forEach$1(new $.Closure101(this, t1));
                                        $.add$1(this._sb, '}');
                                        $.removeLast(this._seen);
                                        return;
                                      } else {
                                        throw $.captureStackTrace($.CTC32);
                                      }
                                    }
                                }
                              }
                          }
                        }
                    }
                  }
              }
            }
        }
      }
  }
 },
 _checkCycle$1: function(object) {
  for (var i = 0; $.ltB(i, $.get$length(this._seen)); ++i) {
    if ($.index(this._seen, i) === object) {
      throw $.captureStackTrace('Cyclic structure');
    }
  }
  $.add$1(this._seen, object);
 },
 get$_result: function() {
  return $.toString(this._sb);
 }
};

$$.Closure = {"":
 [],
 super: "Closure117",
 $call$1: function(p) {
  return $.SpawnPoint$1(p);
 }
};

$$.Closure2 = {"":
 [],
 super: "Closure117",
 $call$1: function(p) {
  return $.Avatar$1(p);
 }
};

$$.Closure3 = {"":
 [],
 super: "Closure117",
 $call$1: function(p) {
  return $.GameObject$3(p, 0, 0);
 }
};

$$.Closure4 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  var r = $.add($.random(), $.niceFactor);
  if ($.ltB(r, 0.1)) {
    $.add$1(avatar.get$tags(), 'mean');
    $.addTag(avatar, 'mean');
  } else {
    if ($.gtB(r, 1)) {
      $.add$1(avatar.get$tags(), 'nice');
      $.addTag(avatar, 'nice');
    }
  }
 }
};

$$.Closure5 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  var t1 = $.world;
  t1.set$totalPopulation($.sub(t1.get$totalPopulation(), 1));
  t1 = $.world;
  t1.set$awakePopulation($.sub(t1.get$awakePopulation(), 1));
 }
};

$$.Closure6 = {"":
 [],
 super: "Closure117",
 $call$1: function(a) {
  var cnodes = $.world.getClosePathNodes$1(a);
  if (typeof cnodes !== 'string' && (typeof cnodes !== 'object'||cnodes.constructor !== Array)) return this.$call$1$bailout(a, 1, cnodes);
  if (cnodes.length > 0) {
    if ($.ltB($.world.get$time(), 16)) {
      var ni = $.toInt($.mul(cnodes.length, $.random()));
    } else {
      for (var i = cnodes.length - 1; ni = (void 0), i >= 0; --i) {
        var t1 = cnodes.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        if (cnodes[i].get$start() === true) {
          ni = i;
          break;
        }
      }
      if ($.eqNullB(ni)) {
        $.switchTag(a, 'traveler', 'wander');
        $.index($.index($.tagEvents, 'wander'), 'init').$call$1(a);
        $.add$1(a.get$tags(), 'lost');
        $.addTag(a, 'lost');
      }
    }
    if (ni !== (ni | 0)) throw $.iae(ni);
    t1 = cnodes.length;
    if (ni < 0 || ni >= t1) throw $.ioore(ni);
    $.indexSet(a, 'path', cnodes[ni].get$path());
    t1 = cnodes.length;
    if (ni < 0 || ni >= t1) throw $.ioore(ni);
    $.indexSet(a, 'pathDirection', cnodes[ni].get$start() === true ? 1 : -1);
    t1 = cnodes.length;
    if (ni < 0 || ni >= t1) throw $.ioore(ni);
    if (cnodes[ni].get$start() === true) {
      t1 = 0;
    } else {
      t1 = cnodes.length;
      if (ni < 0 || ni >= t1) throw $.ioore(ni);
      var t2 = $.sub($.get$length(cnodes[ni].get$path().get$points()), 1);
      t1 = t2;
    }
    $.indexSet(a, 'pathIndex', t1);
    t1 = cnodes.length;
    if (ni < 0 || ni >= t1) throw $.ioore(ni);
    $.indexSet(a, 'pathPoint', cnodes[ni].clone$0());
    t2 = cnodes.length;
    if (ni < 0 || ni >= t2) throw $.ioore(ni);
    $.indexSet(a, 'pathMove', cnodes[ni].clone$0().sub$1(a).normalize$0().divideScalar$1(2));
  } else {
    $.switchTag(a, 'traveler', 'wander');
    $.index($.index($.tagEvents, 'wander'), 'init').$call$1(a);
  }
 },
 $call$1$bailout: function(a, state, env0) {
  switch (state) {
    case 1:
      cnodes = env0;
      break;
  }
  switch (state) {
    case 0:
      var cnodes = $.world.getClosePathNodes$1(a);
    case 1:
      state = 0;
      if ($.gtB($.get$length(cnodes), 0)) {
        if ($.ltB($.world.get$time(), 16)) {
          var ni = $.toInt($.mul($.get$length(cnodes), $.random()));
        } else {
          var i = $.sub($.get$length(cnodes), 1);
          L0: while (true) {
            ni = (void 0);
            if (!$.geB(i, 0)) break L0;
            if ($.index(cnodes, i).get$start() === true) {
              ni = i;
              break;
            }
            i = $.sub(i, 1);
          }
          if ($.eqNullB(ni)) {
            $.switchTag(a, 'traveler', 'wander');
            $.index($.index($.tagEvents, 'wander'), 'init').$call$1(a);
            $.add$1(a.get$tags(), 'lost');
            $.addTag(a, 'lost');
          }
        }
        $.indexSet(a, 'path', $.index(cnodes, ni).get$path());
        $.indexSet(a, 'pathDirection', $.index(cnodes, ni).get$start() === true ? 1 : -1);
        $.indexSet(a, 'pathIndex', $.index(cnodes, ni).get$start() === true ? 0 : $.sub($.get$length($.index(cnodes, ni).get$path().get$points()), 1));
        $.indexSet(a, 'pathPoint', $.index(cnodes, ni).clone$0());
        $.indexSet(a, 'pathMove', $.index(cnodes, ni).clone$0().sub$1(a).normalize$0().divideScalar$1(2));
      } else {
        $.switchTag(a, 'traveler', 'wander');
        $.index($.index($.tagEvents, 'wander'), 'init').$call$1(a);
      }
  }
 }
};

$$.Closure7 = {"":
 [],
 super: "Closure117",
 $call$1: function(a) {
  $.indexSet(a, 'pathPoint', $.index($.index(a, 'path').get$points(), $.index(a, 'pathIndex')));
  $.indexSet(a, 'pathMove', $.index(a, 'pathPoint').clone$0().sub$1(a).normalize$0().divideScalar$1(2));
 }
};

$$.Closure8 = {"":
 [],
 super: "Closure117",
 $call$1: function(a) {
  $.add$1(a.get$velocity(), $.index(a, 'pathMove'));
  if ($.ltB($.index(a, 'pathPoint').distanceTo$1(a), 32)) {
    var t1 = $.index(a, 'pathDirection');
    $.indexSet(a, 'pathIndex', $.add($.index(a, 'pathIndex'), t1));
    if ($.ltB($.index(a, 'pathIndex'), 0) || $.geB($.index(a, 'pathIndex'), $.get$length($.index(a, 'path').get$points()))) {
      $.index($.index($.tagEvents, 'traveler'), 'init').$call$1(a);
    } else {
      $.indexSet(a, 'pathPoint', $.index($.index(a, 'path').get$points(), $.index(a, 'pathIndex')).clone$0());
      var d = $.div(a.distanceTo$1($.index(a, 'pathPoint')), 4);
      $.index(a, 'pathPoint').addTo$2($.sub($.mul($.random(), d), $.div(d, 2)), $.sub($.mul($.random(), d), $.div(d, 2)));
      $.indexSet(a, 'pathMove', $.index(a, 'pathPoint').clone$0().sub$1(a).normalize$0().divideScalar$1(2));
    }
  }
 }
};

$$.Closure9 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  $.indexSet(avatar, 'homeboundDirection', $.index(avatar, 'home').clone$0().sub$1(avatar).normalize$0().divideScalar$1(2));
 }
};

$$.Closure10 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  $.add$1(avatar.get$velocity(), $.index(avatar, 'homeboundDirection'));
  if ($.rpat(8) === true && $.ltB($.index(avatar, 'home').distanceTo$1(avatar), 32)) {
    avatar.markForRemoval$0();
    var t1 = $.world;
    t1.set$awakePopulation($.sub(t1.get$awakePopulation(), 1));
  }
 }
};

$$.Closure11 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  if ($.ltB($.index(avatar, 'home').distanceTo$1(avatar), 256)) {
    avatar.markForRemoval$0();
    var t1 = $.world;
    t1.set$awakePopulation($.sub(t1.get$awakePopulation(), 1));
  } else {
    $.switchTag(avatar, 'homebound', 'lost');
  }
 }
};

$$.Closure12 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  if (avatar.get$speaking() === true) {
    avatar.set$sayTime($.sub(avatar.get$sayTime(), 1));
    if ($.ltB(avatar.get$sayTime(), 0)) {
      avatar.set$speaking(false);
    }
  }
  if ($.rpat(8) === true && $.ltB(avatar.distanceTo$1($.world.get$player()), 64)) {
    var t1 = $.toInt($.mul(3, $.random()));
    if (t1 !== (t1 | 0)) throw $.iae(t1);
    if (t1 < 0 || t1 >= 3) throw $.ioore(t1);
    avatar.say$1($.CTC35[t1]);
    $.switchTag(avatar, 'lost', 'following');
  } else {
    var i = $.toInt($.mul($.random(), $.get$length($.index($.tags, 'house'))));
    if (typeof i !== 'number') return this.$call$1$bailout(avatar, 1, i);
    var iter = 0;
    for (; iter < 4; ++iter, ++i) {
      var index = $.mod(i, $.get$length($.index($.tags, 'house')));
      if ($.ltB($.index($.index($.tags, 'house'), index).distanceTo$1(avatar), 256)) {
        $.indexSet(avatar, 'home', $.index($.index($.tags, 'house'), index));
        $.switchTag(avatar, 'lost', 'homebound');
        $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(avatar);
        iter = 9999;
      }
    }
  }
 },
 $call$1$bailout: function(avatar, state, env0) {
  switch (state) {
    case 1:
      i = env0;
      break;
  }
  switch (state) {
    case 0:
      if (avatar.get$speaking() === true) {
        avatar.set$sayTime($.sub(avatar.get$sayTime(), 1));
        if ($.ltB(avatar.get$sayTime(), 0)) {
          avatar.set$speaking(false);
        }
      }
    case 1:
      if ((state == 0 && ($.rpat(8) === true && $.ltB(avatar.distanceTo$1($.world.get$player()), 64)))) {
        var t1 = $.toInt($.mul(3, $.random()));
        if (t1 !== (t1 | 0)) throw $.iae(t1);
        if (t1 < 0 || t1 >= 3) throw $.ioore(t1);
        avatar.say$1($.CTC35[t1]);
        $.switchTag(avatar, 'lost', 'following');
      } else {
        switch (state) {
          case 0:
            var i = $.toInt($.mul($.random(), $.get$length($.index($.tags, 'house'))));
          case 1:
            state = 0;
            var iter = 0;
            L0: while (true) {
              if (!(iter < 4)) break L0;
              var index = $.mod(i, $.get$length($.index($.tags, 'house')));
              if ($.ltB($.index($.index($.tags, 'house'), index).distanceTo$1(avatar), 256)) {
                $.indexSet(avatar, 'home', $.index($.index($.tags, 'house'), index));
                $.switchTag(avatar, 'lost', 'homebound');
                $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(avatar);
                iter = 9999;
              }
              ++iter;
              i = $.add(i, 1);
            }
        }
      }
  }
 }
};

$$.Closure13 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  $.indexSet(avatar, 'deadTime', 0);
 }
};

$$.Closure14 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  $.indexSet(avatar, 'deadTime', $.add($.index(avatar, 'deadTime'), 1));
  if ($.gtB($.index(avatar, 'deadTime'), 600)) {
    avatar.markForRemoval$0();
  }
 }
};

$$.Closure15 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  if ($.gtB(avatar.distanceTo$1($.world.get$player()), 64)) {
    $.add$1(avatar.get$velocity(), $.world.get$player().clone$0().sub$1(avatar).normalize$0());
  }
  var i = $.toInt($.mul($.random(), $.get$length($.index($.tags, 'house'))));
  if (typeof i !== 'number') return this.$call$1$bailout(avatar, 1, i);
  var iter = 0;
  for (; iter < 4; ++iter, ++i) {
    var index = $.mod(i, $.get$length($.index($.tags, 'house')));
    if ($.ltB($.index($.index($.tags, 'house'), index).distanceTo$1(avatar), 256)) {
      avatar.say$1('Thank you!');
      $.indexSet(avatar, 'home', $.index($.index($.tags, 'house'), index));
      $.niceFactor = $.add($.niceFactor, 0.05);
      $.switchTag(avatar, 'following', 'homebound');
      $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(avatar);
      iter = 9999;
    }
  }
 },
 $call$1$bailout: function(avatar, state, env0) {
  switch (state) {
    case 1:
      i = env0;
      break;
  }
  switch (state) {
    case 0:
      if ($.gtB(avatar.distanceTo$1($.world.get$player()), 64)) {
        $.add$1(avatar.get$velocity(), $.world.get$player().clone$0().sub$1(avatar).normalize$0());
      }
      var i = $.toInt($.mul($.random(), $.get$length($.index($.tags, 'house'))));
    case 1:
      state = 0;
      var iter = 0;
      L0: while (true) {
        if (!(iter < 4)) break L0;
        var index = $.mod(i, $.get$length($.index($.tags, 'house')));
        if ($.ltB($.index($.index($.tags, 'house'), index).distanceTo$1(avatar), 256)) {
          avatar.say$1('Thank you!');
          $.indexSet(avatar, 'home', $.index($.index($.tags, 'house'), index));
          $.niceFactor = $.add($.niceFactor, 0.05);
          $.switchTag(avatar, 'following', 'homebound');
          $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(avatar);
          iter = 9999;
        }
        ++iter;
        i = $.add(i, 1);
      }
  }
 }
};

$$.Closure16 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  $.indexSet(avatar.get$prop(), 'destination', avatar.clone$0().addTo$2($.sub($.mul($.random(), 100), 50), $.sub($.mul($.random(), 100), 50)));
 }
};

$$.Closure17 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  $.indexSet(avatar.get$prop(), 'destination', avatar.clone$0());
  $.indexSet(avatar.get$prop(), 'waitTime', 0);
 }
};

$$.Closure18 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  if ($.gtB($.index(avatar.get$prop(), 'waitTime'), 0)) {
    var t1 = avatar.get$prop();
    $.indexSet(t1, 'waitTime', $.sub($.index(t1, 'waitTime'), 1));
  } else {
    if ($.gtB($.index(avatar.get$prop(), 'destination').distanceTo$1(avatar), 2)) {
      var destination = $.index(avatar.get$prop(), 'destination');
      $.add$1(avatar.get$velocity(), destination.clone$0().sub$1(avatar).normalize$0().divideScalar$1(2));
    } else {
      if ($.ltB($.random(), 0.5)) {
        $.indexSet(avatar.get$prop(), 'destination', avatar.clone$0().addTo$2($.sub($.mul($.random(), 400), 200), $.sub($.mul($.random(), 400), 200)));
      } else {
        $.indexSet(avatar.get$prop(), 'destination', avatar.clone$0());
        $.indexSet(avatar.get$prop(), 'waitTime', $.mul($.random(), 200));
        avatar.set$currentFrame(0);
        avatar.get$velocity().zero$0();
      }
    }
  }
 }
};

$$.Closure19 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  avatar.set$sayTime($.mul($.random(), 500));
 }
};

$$.Closure20 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  var t1 = ({});
  t1.avatar_1 = avatar;
  if ($.ltB(t1.avatar_1.get$sayTime(), 0)) {
    t1.avatar_1.set$speaking(false);
    $.forEach($.index($.tags, 'player'), new $.Closure113(t1));
    var t2 = $.mul($.random(), 500);
    t1.avatar_1.set$sayTime(t2);
  } else {
    t1 = t1.avatar_1;
    t1.set$sayTime($.sub(t1.get$sayTime(), 1));
  }
 }
};

$$.Closure113 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(player) {
  if ($.ltB(player.distanceTo$1(this.box_0.avatar_1), 80)) {
    var t1 = this.box_0.avatar_1;
    var t2 = $.toInt($.mul($.random(), 5));
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
    t1.say$1($.CTC34[t2]);
  }
 }
};

$$.Closure21 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  avatar.set$sayTime($.mul($.random(), 500));
 }
};

$$.Closure22 = {"":
 [],
 super: "Closure117",
 $call$1: function(avatar) {
  var t1 = ({});
  t1.avatar_3 = avatar;
  if ($.ltB(t1.avatar_3.get$sayTime(), 0)) {
    t1.avatar_3.set$speaking(false);
    $.forEach($.index($.tags, 'player'), new $.Closure112(t1));
    var t2 = $.mul($.random(), 500);
    t1.avatar_3.set$sayTime(t2);
  } else {
    t1 = t1.avatar_3;
    t1.set$sayTime($.sub(t1.get$sayTime(), 1));
  }
 }
};

$$.Closure112 = {"":
 ["box_2"],
 super: "Closure117",
 $call$1: function(player) {
  if ($.ltB(player.distanceTo$1(this.box_2.avatar_3), 80)) {
    var t1 = this.box_2.avatar_3;
    var t2 = $.toInt($.mul($.random(), 5));
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
    t1.say$1($.CTC33[t2]);
  }
 }
};

$$.Closure23 = {"":
 [],
 super: "Closure117",
 $call$1: function(zom) {
  $.indexSet(zom, 'originalPosition', zom.clone$0());
  $.index($.index($.tagEvents, 'wander'), 'init').$call$1(zom);
 }
};

$$.Closure24 = {"":
 [],
 super: "Closure117",
 $call$1: function(zom) {
  var t1 = ({});
  t1.zom_5 = zom;
  $.some($.index($.tags, 'friendly'), new $.Closure111(t1));
  $.index($.index($.tagEvents, 'wander'), 'update').$call$1(t1.zom_5);
  if ($.rpat(8) === true && $.gtB($.index(t1.zom_5, 'originalPosition').distanceTo$1($.index(t1.zom_5, 'destination')), $.ZOMBIE_WANDER_DISTANCE)) {
    $.indexSet(t1.zom_5, 'destination', $.index(t1.zom_5, 'originalPosition').clone$0().addTo$2($.sub($.mul($.random(), $.ZOMBIE_WANDER_DISTANCE), $.div($.ZOMBIE_WANDER_DISTANCE, 2)), $.sub($.mul($.random(), $.ZOMBIE_WANDER_DISTANCE), $.div($.ZOMBIE_WANDER_DISTANCE, 2))));
  }
 }
};

$$.Closure111 = {"":
 ["box_4"],
 super: "Closure117",
 $call$1: function(avatar) {
  if (avatar.get$alive() === true && $.ltB(avatar.distanceTo$1(this.box_4.zom_5), $.AGRO_DISTANCE) && $.rpat(20) === true) {
    $.rmTag(this.box_4.zom_5, 'hostile-wander');
    this.box_4.zom_5.removeTag$1('hostile-wander');
    $.addTag(this.box_4.zom_5, 'hostile');
    $.add$1(this.box_4.zom_5.get$tags(), 'hostile');
    $.index($.index($.tagEvents, 'hostile'), 'init').$call$1(this.box_4.zom_5);
    $.indexSet(this.box_4.zom_5, 'target', avatar);
    return true;
  }
  return false;
 }
};

$$.Closure25 = {"":
 [],
 super: "Closure117",
 $call$1: function(zom) {
  $.indexSet(zom, 'target', (void 0));
 }
};

$$.Closure26 = {"":
 [],
 super: "Closure117",
 $call$1: function(zom) {
  if (!$.eqNullB($.index(zom, 'target'))) {
    if ($.index(zom, 'target').get$alive() === true) {
      var target = $.index(zom, 'target');
      var distance = target.distanceTo$1(zom);
      if ($.ltB(distance, 48)) {
        zom.set$attacking(true);
        zom.set$attackDirection(zom.get$velocity().normalize$0());
      } else {
        if ($.ltB(distance, $.mul($.AGRO_DISTANCE, 2))) {
          zom.set$attacking(false);
          zom.get$velocity().sub$1(zom.clone$0().sub$1(target).normalize$0().divideScalar$1(1.5));
        } else {
          zom.removeTag$1('hostile');
          $.add$1(zom.get$tags(), 'hostile-wander');
          $.addTag(zom, 'hostile-wander');
          $.rmTag(zom, 'hostile');
          $.indexSet(zom, 'target', (void 0));
        }
      }
    } else {
      zom.fireTagEvent$1('kill');
    }
  }
 }
};

$$.Closure27 = {"":
 [],
 super: "Closure117",
 $call$1: function(zom) {
  if ($.index(zom, 'target').get$alive() !== true) {
    zom.removeTag$1('hostile');
    $.add$1(zom.get$tags(), 'hostile-wander');
    $.addTag(zom, 'hostile-wander');
    $.rmTag(zom, 'hostile');
    $.indexSet(zom, 'target', (void 0));
    zom.set$attacking(false);
  }
 }
};

$$.Closure28 = {"":
 [],
 super: "Closure117",
 $call$1: function(zom) {
  $.indexSet(zom, 'nestDirection', $.index(zom, 'originalPosition').clone$0().sub$1(zom).normalize$0());
 }
};

$$.Closure29 = {"":
 [],
 super: "Closure117",
 $call$1: function(zom) {
  $.add$1(zom.get$velocity(), $.index(zom, 'nestDirection'));
  if ($.rpat(4) === true && $.ltB(zom.distanceTo$1($.index(zom, 'originalPosition')), 32)) {
    zom.markForRemoval$0();
  }
 }
};

$$.Closure30 = {"":
 ["this_6"],
 super: "Closure117",
 $call$1: function(data) {
  $.world.load$2(data, new $.Closure46(this.this_6));
 }
};

$$.Closure46 = {"":
 ["this_7"],
 super: "Closure117",
 $call$0: function() {
  this.this_7.loadFinish$0();
 }
};

$$.Closure31 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(e) {
  if ($.eqB(this.box_0.req_2.get$readyState(), 4) && $.eqB(this.box_0.req_2.get$status(), 200)) {
    this.box_0.callback_1.$call$1(this.box_0.req_2.get$responseText());
  }
 }
};

$$.Closure32 = {"":
 ["box_0"],
 super: "Closure117",
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
};

$$.Closure33 = {"":
 ["box_0"],
 super: "Closure117",
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
};

$$.Closure34 = {"":
 ["box_0"],
 super: "Closure117",
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 }
};

$$.Closure35 = {"":
 ["box_0"],
 super: "Closure117",
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 }
};

$$.Closure36 = {"":
 ["this_4"],
 super: "Closure117",
 $call$1: function(e) {
  var t1 = ({});
  t1.e_1 = e;
  this.this_4.setKey$2(t1.e_1.get$keyCode(), 1);
  $.forEach(this.this_4.get$onKeyPress(), new $.Closure42(t1));
 }
};

$$.Closure42 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(func) {
  return func.$call$1(this.box_0.e_1);
 }
};

$$.Closure37 = {"":
 ["this_5"],
 super: "Closure117",
 $call$1: function(e) {
  this.this_5.setKey$2(e.get$keyCode(), 0);
 }
};

$$.Closure38 = {"":
 ["this_6"],
 super: "Closure117",
 $call$1: function(e) {
  var t1 = ({});
  t1.e_3 = e;
  this.this_6.mouseDownAt$2(t1.e_3.get$pageX(), t1.e_3.get$pageY());
  $.forEach(this.this_6.get$onClick(), new $.Closure41(t1));
 }
};

$$.Closure41 = {"":
 ["box_2"],
 super: "Closure117",
 $call$1: function(func) {
  return func.$call$1(this.box_2.e_3);
 }
};

$$.Closure39 = {"":
 ["this_7"],
 super: "Closure117",
 $call$1: function(e) {
  this.this_7.mouseUpAt$2(e.get$pageX(), e.get$pageY());
 }
};

$$.Closure40 = {"":
 ["this_8"],
 super: "Closure117",
 $call$1: function(e) {
  this.this_8.mouseAt$2(e.get$pageX(), e.get$pageY());
 }
};

$$.Closure120 = {"":
 [],
 super: "Closure117",
 $call$1: function(e) {
  e.preventDefault$0();
 }
};

$$.Closure121 = {"":
 [],
 super: "Closure117",
 $call$1: function(e) {
  e.preventDefault$0();
 }
};

$$.Closure122 = {"":
 [],
 super: "Closure117",
 $call$1: function(e) {
  e.preventDefault$0();
 }
};

$$.Closure43 = {"":
 ["this_2", "box_0"],
 super: "Closure117",
 $call$1: function(key) {
  return this.box_0.f_1.$call$2(key, $.index(this.this_2, key));
 }
};

$$.Closure44 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.Closure45 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(entry) {
  this.box_0.f_12.$call$2(entry.get$key(), entry.get$value());
 }
};

$$.Closure47 = {"":
 ["this_2", "box_0"],
 super: "Closure117",
 $call$1: function(imgs) {
  this.this_2.set$itemImages(imgs);
  this.this_2.loadMap$2('test', this.box_0.callback_12);
 }
};

$$.Closure48 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(e) {
  $.split(this.box_0.img_4, this.box_0.px_2, this.box_0.py_3, this.box_0.callback_13);
 }
};

$$.Closure49 = {"":
 ["box_2"],
 super: "Closure117",
 $call$1: function(n) {
  var t1 = ({});
  t1.n_1 = n;
  this.box_2.hc_4.getImage$1(new $.Closure50(t1, this.box_2));
 }
};

$$.Closure50 = {"":
 ["box_0", "box_2"],
 super: "Closure117",
 $call$1: function(img) {
  $.indexSet(this.box_2.list_6, this.box_0.n_1, img);
  var amt = $.add(this.box_2.amt_5, 1);
  this.box_2.amt_5 = amt;
  if ($.geB(this.box_2.amt_5, $.get$length(this.box_2.list_6))) {
    this.box_2.callback_3.$call$1(this.box_2.list_6);
  }
 }
};

$$.Closure51 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(e) {
  this.box_0.callback_14.$call$1(this.box_0.img_2);
 }
};

$$.Closure52 = {"":
 ["box_0", "box_2"],
 super: "Closure117",
 $call$1: function(p) {
  var a = $.Avatar$1($.index($.index(this.box_2.list_3, this.box_0.i_1), 'properties'));
  a.loadProperties$1(p);
  return a;
 }
};

$$.Closure53 = {"":
 ["box_0", "box_2"],
 super: "Closure117",
 $call$1: function(p) {
  var a = $.Item$1($.index($.index(this.box_2.list_3, this.box_0.i_1), 'properties'));
  a.loadProperties$1(p);
  return a;
 }
};

$$.Closure54 = {"":
 ["box_0", "box_2"],
 super: "Closure117",
 $call$1: function(p) {
  var a = $.GameObject$3($.index($.index(this.box_2.list_3, this.box_0.i_1), 'properties'), 0, 0);
  a.loadProperties$1(p);
  return a;
 }
};

$$.Closure55 = {"":
 ["this_0"],
 super: "Closure117",
 $call$2: function(k, v) {
    switch (k) {
    case 'walk':
      this.this_0.loadWalkAnimation$2(v, new $.Closure56(this.this_0));
      break;
    case 'slash':
      this.this_0.loadSlashAnimation$2(v, new $.Closure57(this.this_0));
      break;
    case 'death':
      this.this_0.loadDeathAnimation$2(v, new $.Closure58(this.this_0));
      break;
  }
 }
};

$$.Closure56 = {"":
 ["this_1"],
 super: "Closure117",
 $call$1: function(animation) {
  $.indexSet(this.this_1.get$frameMapIndex(), 1, animation);
 }
};

$$.Closure57 = {"":
 ["this_2"],
 super: "Closure117",
 $call$1: function(animation) {
  $.indexSet(this.this_2.get$frameMapIndex(), 2, animation);
 }
};

$$.Closure58 = {"":
 ["this_3"],
 super: "Closure117",
 $call$1: function(animation) {
  $.indexSet(this.this_3.get$frameMapIndex(), 3, animation);
 }
};

$$.Closure59 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(imgs) {
  this.box_0.callback_15.$call$1($.FrameMap$3(1, 6, imgs));
 }
};

$$.Closure60 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(imgs) {
  this.box_0.callback_16.$call$1($.FrameMap$3(4, 6, imgs));
 }
};

$$.Closure61 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(imgs) {
  this.box_0.callback_17.$call$1($.FrameMap$3(4, 9, imgs));
 }
};

$$.Closure62 = {"":
 ["this_0"],
 super: "Closure117",
 $call$2: function(k, v) {
  this.this_0.setProperty$2(k, v);
 }
};

$$.Closure63 = {"":
 ["this_0"],
 super: "Closure117",
 $call$1: function(v) {
  $.addTag(this.this_0, v);
  $.add$1(this.this_0.get$tags(), v);
 }
};

$$.Closure64 = {"":
 ["this_0"],
 super: "Closure117",
 $call$1: function(tag) {
  $.rmTag(this.this_0, tag);
 }
};

$$.Closure65 = {"":
 ["this_2", "box_0"],
 super: "Closure117",
 $call$1: function(data) {
  this.this_2.fmtCollisionMap$1(data);
  this.box_0.callback_18.$call$0();
 }
};

$$.Closure66 = {"":
 [],
 super: "Closure117",
 $call$1: function(a) {
 }
};

$$.Closure67 = {"":
 ["this_0"],
 super: "Closure117",
 $call$1: function(raw) {
  var points = $.List((void 0));
  $.setRuntimeTypeInfo(points, ({E: 'Vec2'}));
  for (var i = 0; $.ltB(i, $.get$length($.index(raw, 'point_x'))); ++i) {
    points.push($.Vec2$2($.index($.index(raw, 'point_x'), i), $.index($.index(raw, 'point_y'), i)));
  }
  var t1 = this.this_0.get$paths();
  var t2 = points.length;
  if (0 >= t2) throw $.ioore(0);
  var t3 = points[0];
  var t4 = points.length - 1;
  var t5 = points.length;
  if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
  var path = $.Path$5(t3, points[t4], points, $.index(raw, 'startHouse'), $.index(raw, 'endHouse'));
  $.add$1(t1, path);
  $.add$1(this.this_0.get$pathnodes(), path.start);
  $.add$1(this.this_0.get$pathnodes(), path.end);
 }
};

$$.Closure68 = {"":
 ["this_12", "box_9"],
 super: "Closure117",
 $call$1: function(e) {
  if ($.eqB($.event.key$1('space'), 1) && $.eqB($.get$length(this.this_12.get$menuInterfaces()), 0)) {
    var t1 = new $.Closure93();
    $.add$1(this.this_12.get$menuInterfaces(), $.MenuInterface$2('options', $.makeLiteralMap(['options', [$.makeLiteralMap(['name', 'Place Spawn', 'func', new $.Closure94(this.this_12, t1)]), $.makeLiteralMap(['name', 'Place Object', 'func', new $.Closure95(this.this_12, t1)]), $.makeLiteralMap(['name', 'Place Node', 'func', new $.Closure96(this.this_12, this.box_9)]), $.makeLiteralMap(['name', 'Get JSON', 'func', new $.Closure97(this.this_12)])]])));
  }
 }
};

$$.Closure93 = {"":
 [],
 super: "Closure117",
 $call$2: function(s, def) {
  return $.window().prompt$2(s, def);
 },
 $call$1: function(s) {
  return this.$call$2(s,'')
}
};

$$.Closure94 = {"":
 ["this_14", "prompt_13"],
 super: "Closure117",
 $call$0: function() {
  $.add$1(this.this_14.get$menuInterfaces(), $.MenuInterface$2('options', $.makeLiteralMap(['options', [$.makeLiteralMap(['name', 'Basic Zombie', 'func', new $.Closure108(this.this_14)]), $.makeLiteralMap(['name', 'Basic Bee', 'func', new $.Closure109()]), $.makeLiteralMap(['name', 'Custom Emitter', 'func', new $.Closure110(this.this_14, this.prompt_13)])]])));
 }
};

$$.Closure108 = {"":
 ["this_15"],
 super: "Closure117",
 $call$0: function() {
  $.add$1($.index(this.this_15.get$currentMapTree(), 'objects'), $.makeLiteralMap(['type', 'spawn', 'emit', 'zombie', 'night-only', true, 'emit-properties', $.makeLiteralMap(['tag', ['ai']]), 'freq', 240, 'limit', 3, 'x', this.this_15.get$player().get$x(), 'y', this.this_15.get$player().get$y()]));
 }
};

$$.Closure109 = {"":
 [],
 super: "Closure117",
 $call$0: function() {
  return $.print('Create basic Bee emitter');
 }
};

$$.Closure110 = {"":
 ["this_17", "prompt_16"],
 super: "Closure117",
 $call$0: function() {
  return $.add$1($.index(this.this_17.get$currentMapTree(), 'objects'), $.makeLiteralMap(['type', 'spawn', 'emit', this.prompt_16.$call$1('Emit Type'), 'emit-properties', $.makeLiteralMap(['tag', $.split2(this.prompt_16.$call$1('Emit Properties (\',\' delimited)'), ',')]), 'freq', $.parseInt(this.prompt_16.$call$1('Freq (60 = 1 second)')), 'limit', $.parseInt(this.prompt_16.$call$1('Limit')), 'x', $.toInt(this.this_17.get$player().get$x()), 'y', $.toInt(this.this_17.get$player().get$y())]));
 }
};

$$.Closure95 = {"":
 ["this_19", "prompt_18"],
 super: "Closure117",
 $call$0: function() {
  $.add$1(this.this_19.get$menuInterfaces(), $.MenuInterface$2('options', $.makeLiteralMap(['options', [$.makeLiteralMap(['name', 'Custom Object', 'func', new $.Closure107(this.this_19, this.prompt_18)])]])));
 }
};

$$.Closure107 = {"":
 ["this_21", "prompt_20"],
 super: "Closure117",
 $call$0: function() {
  return $.add$1($.index(this.this_21.get$currentMapTree(), 'objects'), $.makeLiteralMap(['type', this.prompt_20.$call$1('Type'), 'tag', $.split2(this.prompt_20.$call$1('Tags, delimit with \',\''), ','), 'x', $.toInt(this.this_21.get$player().get$x()), 'y', $.toInt(this.this_21.get$player().get$y())]));
 }
};

$$.Closure96 = {"":
 ["this_22", "box_9"],
 super: "Closure117",
 $call$0: function() {
  return $.add$1(this.this_22.get$menuInterfaces(), $.MenuInterface$2('options', $.makeLiteralMap(['options', [$.makeLiteralMap(['name', 'House Node', 'func', new $.Closure102(this.this_22)]), $.makeLiteralMap(['name', 'Path Node', 'func', new $.Closure103(this.this_22, this.box_9)]), $.makeLiteralMap(['name', 'End Path Node', 'func', new $.Closure104(this.this_22, this.box_9)])]])));
 }
};

$$.Closure102 = {"":
 ["this_23"],
 super: "Closure117",
 $call$0: function() {
  return $.add$1($.index(this.this_23.get$currentMapTree(), 'objects'), $.makeLiteralMap(['type', 'node', 'tag', ['house'], 'x', $.toInt(this.this_23.get$player().get$x()), 'y', $.toInt(this.this_23.get$player().get$y())]));
 }
};

$$.Closure103 = {"":
 ["this_24", "box_9"],
 super: "Closure117",
 $call$0: function() {
  return $.add$1(this.box_9.debugPathNodes_11, this.this_24.get$player().clone$0());
 }
};

$$.Closure104 = {"":
 ["this_25", "box_9"],
 super: "Closure117",
 $call$0: function() {
  var t1 = ({});
  $.add$1(this.box_9.debugPathNodes_11, this.this_25.get$player().clone$0());
  var ax = $.List((void 0));
  $.setRuntimeTypeInfo(ax, ({E: 'int'}));
  t1.ax_1 = ax;
  var ay = $.List((void 0));
  $.setRuntimeTypeInfo(ay, ({E: 'int'}));
  t1.ay_2 = ay;
  $.forEach(this.box_9.debugPathNodes_11, new $.Closure105(t1));
  t1.end_3 = $.index(this.box_9.debugPathNodes_11, $.sub($.get$length(this.box_9.debugPathNodes_11), 1));
  t1.start_4 = $.index(this.box_9.debugPathNodes_11, 0);
  t1.endHouse_5 = false;
  t1.startHouse_6 = false;
  $.forEach($.index($.tags, 'house'), new $.Closure106(t1));
  $.add$1($.index(this.this_25.get$currentMapTree(), 'paths'), $.makeLiteralMap(['type', 'path', 'point_x', t1.ax_1, 'point_y', t1.ay_2, 'endHouse', t1.endHouse_5, 'startHouse', t1.startHouse_6]));
  var debugPathNodes = $.List((void 0));
  $.setRuntimeTypeInfo(debugPathNodes, ({E: 'Vec2'}));
  this.box_9.debugPathNodes_11 = debugPathNodes;
 }
};

$$.Closure105 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(node) {
  $.add$1(this.box_0.ax_1, $.toInt(node.get$x()));
  $.add$1(this.box_0.ay_2, $.toInt(node.get$y()));
 }
};

$$.Closure106 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(house) {
  if ($.ltB(house.distanceTo$1(this.box_0.end_3), 256)) {
    this.box_0.endHouse_5 = true;
  }
  if ($.ltB(house.distanceTo$1(this.box_0.start_4), 256)) {
    this.box_0.startHouse_6 = true;
  }
 }
};

$$.Closure97 = {"":
 ["this_26"],
 super: "Closure117",
 $call$0: function() {
  return $.print($.window().open$3('javascript:document.body.innerHTML=\'' + $.S($.stringify(this.this_26.get$dataTree())) + '\';', 'JSON Data', 'height=300,width=300'));
 }
};

$$.Closure69 = {"":
 ["this_27"],
 super: "Closure117",
 $call$1: function(e) {
  var t1 = ({});
  if (!$.eqB($.get$length(this.this_27.get$menuInterfaces()), 0)) {
    $.event.set$mouseDown(false);
  }
  var i = $.sub($.get$length(this.this_27.get$menuInterfaces()), 1);
  if (typeof i !== 'number') return this.$call$1$bailout(e, 1, t1, i);
  for (; i >= 0; --i) {
    if ($.index(this.this_27.get$menuInterfaces(), i).clickAt$2(e.get$pageX(), e.get$pageY()) === true) {
      $.removeRange(this.this_27.get$menuInterfaces(), i, 1);
    }
  }
  if ($.tags.containsKey$1('item') === true) {
    t1.player_8 = $.index($.index($.tags, 'player'), 0);
    $.some($.index($.tags, 'item'), new $.Closure92(this.this_27, t1));
  }
 },
 $call$1$bailout: function(e, state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      i = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = ({});
      if (!$.eqB($.get$length(this.this_27.get$menuInterfaces()), 0)) {
        $.event.set$mouseDown(false);
      }
      var i = $.sub($.get$length(this.this_27.get$menuInterfaces()), 1);
    case 1:
      state = 0;
      L0: while (true) {
        if (!$.geB(i, 0)) break L0;
        if ($.index(this.this_27.get$menuInterfaces(), i).clickAt$2(e.get$pageX(), e.get$pageY()) === true) {
          $.removeRange(this.this_27.get$menuInterfaces(), i, 1);
        }
        i = $.sub(i, 1);
      }
      if ($.tags.containsKey$1('item') === true) {
        t1.player_8 = $.index($.index($.tags, 'player'), 0);
        $.some($.index($.tags, 'item'), new $.Closure92(this.this_27, t1));
      }
  }
 }
};

$$.Closure92 = {"":
 ["this_28", "box_7"],
 super: "Closure117",
 $call$1: function(item) {
  if ($.ltB(this.box_7.player_8.distanceTo$1(item), 32)) {
    $.event.set$mouseDown(false);
    $.notify('You found ' + $.S(item.get$prop().containsKey$1('properName') === true ? $.index(item, 'properName') : item.get$type()));
    this.this_28.pickUpItem$1(item);
    return true;
  }
  return false;
 }
};

$$.Closure70 = {"":
 ["this_29", "box_9"],
 super: "Closure117",
 $call$1: function(a) {
  $.window().requestAnimationFrame$1(this);
  this.this_29.update$0();
  if ($.eqB($.event.key$1('T'), 1)) {
    this.this_29.update$0();
    this.this_29.update$0();
    this.this_29.update$0();
    this.this_29.update$0();
    this.this_29.update$0();
    this.this_29.update$0();
    this.this_29.update$0();
    this.this_29.update$0();
    this.this_29.update$0();
  }
  this.this_29.render$1(this.box_9.context_10);
 }
};

$$.Closure71 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(object) {
  object.render$1(this.box_0.c_1);
 }
};

$$.Closure72 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(path) {
  this.box_0.c_1.beginPath$0();
  this.box_0.c_1.set$strokeStyle('#fff');
  this.box_0.c_1.set$lineWidth(5);
  this.box_0.c_1.set$lineCap('round');
  this.box_0.c_1.set$fillStyle('#fff');
  this.box_0.c_1.moveTo$2(path.get$start().get$x(), path.get$start().get$y());
  $.forEach(path.get$points(), new $.Closure77(this.box_0));
  this.box_0.c_1.stroke$0();
  this.box_0.c_1.closePath$0();
 }
};

$$.Closure77 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(point) {
  this.box_0.c_1.lineTo$2(point.get$x(), point.get$y());
 }
};

$$.Closure73 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(mi) {
  mi.render$1(this.box_0.c_1);
 }
};

$$.Closure74 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(e) {
  this.box_0.callback_19.$call$1(this.box_0.img_22);
 }
};

$$.Closure75 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(e) {
  this.box_0.callback_19.$call$1($.ImageElement((void 0), (void 0), (void 0)));
 }
};

$$.Closure76 = {"":
 [],
 super: "Closure117",
 $call$1: function(a) {
 }
};

$$.Closure78 = {"":
 [],
 super: "Closure117",
 $call$1: function(a) {
  a.removeTag$1('lost');
  $.rmTag(a, 'lost');
 }
};

$$.Closure79 = {"":
 [],
 super: "Closure117",
 $call$1: function(a) {
  $.switchTag(a, 'following', 'wander');
  a.say$1('Thank you!');
  $.add$1(a.get$tags(), 'nice');
  $.addTag(a, 'nice');
 }
};

$$.Closure80 = {"":
 [],
 super: "Closure117",
 $call$1: function(a) {
  a.markForRemoval$0();
 }
};

$$.Closure81 = {"":
 [],
 super: "Closure117",
 $call$1: function(citizen) {
  if (citizen.hasTag$1('ai') === true && citizen.hasTag$1('lost') !== true && citizen.hasTag$1('citizen') === true) {
    if ($.ltB($.random(), 0.9)) {
      $.switchTag(citizen, 'wander', 'homebound');
      $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(citizen);
    } else {
      $.add$1(citizen.get$tags(), 'lost');
      $.addTag(citizen, 'lost');
    }
  }
 }
};

$$.Closure82 = {"":
 [],
 super: "Closure117",
 $call$1: function(ob) {
  ob.fireTagEvent$1('init');
  ob.removeTag$1('uninit');
 }
};

$$.Closure83 = {"":
 [],
 super: "Closure117",
 $call$1: function(g) {
  return g.fireTagEvent$1('update');
 }
};

$$.Closure84 = {"":
 ["this_0"],
 super: "Closure117",
 $call$1: function(actor) {
  if (actor.get$alive() === true) {
    if (actor.get$attacking() === true) {
      actor.set$currentAttackTime($.add(actor.get$currentAttackTime(), 1));
      if ($.gtB(actor.get$currentAttackTime(), actor.get$attackTime())) {
        actor.set$currentAttackTime(0);
        var attacked = this.this_0.damageBubble$3($.add$1(actor.clone$0(), actor.get$attackDirection().clone$0().multiplyScalar$1(actor.get$attackRadius())), $.div(actor.get$attackRadius(), 2), 100);
        if (typeof attacked !== 'string' && (typeof attacked !== 'object'||attacked.constructor !== Array)) return this.$call$1$bailout(actor, 1, attacked);
        for (var i = 0; i < attacked.length; ++i) {
          var t1 = attacked.length;
          if (i < 0 || i >= t1) throw $.ioore(i);
          if (attacked[i].get$alive() !== true) {
            actor.fireTagEvent$1('kill');
          }
        }
      }
      var timeToAttack = $.add($.sub(actor.get$currentAttackTime(), actor.get$attackTime()), 6);
      t1 = actor.get$currentFrame();
      actor.set$currentFrame($.add(t1, $.gtB(timeToAttack, 0) ? timeToAttack : 0));
      actor.set$currentOrientation(actor.get$attackDirection().getDirection$0());
    } else {
      if ($.gtB(actor.get$velocity().length$0(), 0.1)) {
        actor.set$currentFrame($.add(actor.get$currentFrame(), actor.get$velocity().length$0()));
        actor.set$currentOrientation(actor.get$velocity().getDirection$0());
      }
    }
    t1 = actor.get$velocity();
    var t2 = actor.get$attacking() === true ? 2 : 1;
    t1.divideScalar$1(1.5 * t2);
    if (this.this_0.collisionAtVec2$1($.add$1(actor.clone$0(), actor.get$velocity())) === true) {
      if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(actor.get$velocity().get$x(), 0)) === true) {
        $.add$1(actor, actor.get$velocity().negateX$0());
      }
      if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(0, actor.get$velocity().get$y())) === true) {
        $.add$1(actor, actor.get$velocity().negateY$0());
      }
      actor.fireTagEvent$1('collide');
    } else {
      if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(actor.get$velocity().get$x(), 0)) === true) {
        $.add$1(actor, actor.get$velocity().negateX$0());
        actor.fireTagEvent$1('collide');
      } else {
        if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(0, actor.get$velocity().get$y())) === true) {
          $.add$1(actor, actor.get$velocity().negateY$0());
          actor.fireTagEvent$1('collide');
        } else {
          $.add$1(actor, actor.get$velocity());
        }
      }
    }
  } else {
    if ($.ltB(actor.get$currentFrame(), 25)) {
      actor.set$currentFrame($.add(actor.get$currentFrame(), 1));
    }
  }
 },
 $call$1$bailout: function(actor, state, env0) {
  switch (state) {
    case 1:
      attacked = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      if (state == 1 || (state == 0 && actor.get$alive() === true)) {
        switch (state) {
          case 0:
          case 1:
            if (state == 1 || (state == 0 && actor.get$attacking() === true)) {
              switch (state) {
                case 0:
                  actor.set$currentAttackTime($.add(actor.get$currentAttackTime(), 1));
                case 1:
                  if (state == 1 || (state == 0 && $.gtB(actor.get$currentAttackTime(), actor.get$attackTime()))) {
                    switch (state) {
                      case 0:
                        actor.set$currentAttackTime(0);
                        var attacked = this.this_0.damageBubble$3($.add$1(actor.clone$0(), actor.get$attackDirection().clone$0().multiplyScalar$1(actor.get$attackRadius())), $.div(actor.get$attackRadius(), 2), 100);
                      case 1:
                        state = 0;
                        var i = 0;
                        L0: while (true) {
                          if (!$.ltB(i, $.get$length(attacked))) break L0;
                          if ($.index(attacked, i).get$alive() !== true) {
                            actor.fireTagEvent$1('kill');
                          }
                          ++i;
                        }
                    }
                  }
                  var timeToAttack = $.add($.sub(actor.get$currentAttackTime(), actor.get$attackTime()), 6);
                  var t1 = actor.get$currentFrame();
                  actor.set$currentFrame($.add(t1, $.gtB(timeToAttack, 0) ? timeToAttack : 0));
                  actor.set$currentOrientation(actor.get$attackDirection().getDirection$0());
              }
            } else {
              if ($.gtB(actor.get$velocity().length$0(), 0.1)) {
                actor.set$currentFrame($.add(actor.get$currentFrame(), actor.get$velocity().length$0()));
                actor.set$currentOrientation(actor.get$velocity().getDirection$0());
              }
            }
            t1 = actor.get$velocity();
            var t2 = actor.get$attacking() === true ? 2 : 1;
            t1.divideScalar$1(1.5 * t2);
            if (this.this_0.collisionAtVec2$1($.add$1(actor.clone$0(), actor.get$velocity())) === true) {
              if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(actor.get$velocity().get$x(), 0)) === true) {
                $.add$1(actor, actor.get$velocity().negateX$0());
              }
              if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(0, actor.get$velocity().get$y())) === true) {
                $.add$1(actor, actor.get$velocity().negateY$0());
              }
              actor.fireTagEvent$1('collide');
            } else {
              if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(actor.get$velocity().get$x(), 0)) === true) {
                $.add$1(actor, actor.get$velocity().negateX$0());
                actor.fireTagEvent$1('collide');
              } else {
                if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(0, actor.get$velocity().get$y())) === true) {
                  $.add$1(actor, actor.get$velocity().negateY$0());
                  actor.fireTagEvent$1('collide');
                } else {
                  $.add$1(actor, actor.get$velocity());
                }
              }
            }
        }
      } else {
        if ($.ltB(actor.get$currentFrame(), 25)) {
          actor.set$currentFrame($.add(actor.get$currentFrame(), 1));
        }
      }
  }
 }
};

$$.Closure85 = {"":
 [],
 super: "Closure117",
 $call$1: function(spawn) {
  spawn.update$0();
 }
};

$$.Closure86 = {"":
 [],
 super: "Closure117",
 $call$1: function(note) {
  note.set$y($.add(note.get$y(), 32));
 }
};

$$.Closure87 = {"":
 ["keys_0"],
 super: "Closure117",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.Closure88 = {"":
 ["box_0"],
 super: "Closure117",
 $call$2: function(key, value) {
  var t1 = this.box_0.list_1;
  var t2 = this.box_0.i_2;
  var i = $.add(t2, 1);
  this.box_0.i_2 = i;
  $.indexSet(t1, t2, key);
 }
};

$$.Closure89 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(entry) {
  var t1 = this.box_0.list_12;
  var t2 = this.box_0.index_2;
  var index = $.add(t2, 1);
  this.box_0.index_2 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$.Closure90 = {"":
 ["this_2", "box_0"],
 super: "Closure117",
 $call$1: function(tag) {
  if ($.tagEvents.containsKey$1(tag) === true && $.index($.tagEvents, tag).containsKey$1(this.box_0.event_1) === true) {
    $.index($.index($.tagEvents, tag), this.box_0.event_1).$call$1(this.this_2);
  }
 }
};

$$.Closure91 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(actor) {
  if (actor.get$alive() === true && $.ltB(actor.distanceTo$1(this.box_0.point_1), this.box_0.radius_2)) {
    $.add$1(this.box_0.attacked_4, actor);
    actor.hurt$1(this.box_0.damage_3);
  }
 }
};

$$.Closure98 = {"":
 [],
 super: "Closure117",
 $call$0: function() {
 }
};

$$.Closure99 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(button) {
  return button.render$1(this.box_0.c_12);
 }
};

$$.Closure100 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(button) {
  if (button.clickAt$2(this.box_0.x_1, this.box_0.y_2) === true) {
    this.box_0.returner_3 = true;
    button.action$0();
    return true;
  }
  return false;
 }
};

$$.Closure101 = {"":
 ["this_2", "box_0"],
 super: "Closure117",
 $call$2: function(key, value) {
  if (this.box_0.first_1 !== true) {
    $.add$1(this.this_2.get$_sb(), ',"');
  } else {
    $.add$1(this.this_2.get$_sb(), '"');
  }
  $._escape(this.this_2.get$_sb(), key);
  $.add$1(this.this_2.get$_sb(), '":');
  this.this_2._stringify$1(value);
  this.box_0.first_1 = false;
 }
};

$$.Closure114 = {"":
 ["box_0"],
 super: "Closure117",
 $call$1: function(node) {
  if ($.ltB(node.distanceTo$1(this.box_0.v_1), 256)) {
    $.add$1(this.box_0.cnodes_2, node);
  }
 }
};

$$.Closure115 = {"":
 ["box_0"],
 super: "Closure117",
 $call$2: function(key, value) {
  this.box_0.f_13.$call$1(key);
 }
};

Isolate.$defineClass('Closure116', 'Closure117', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
Isolate.$defineClass('Closure118', 'Closure117', ['self', 'target'], {
$call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
});
Isolate.$defineClass('Closure119', 'Closure117', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  }
  return a.operator$mul$1(b);
};

$._AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  }
  return Math.floor(receiver);
};

$.load = function(url, callback) {
  var t1 = ({});
  t1.callback_1 = callback;
  t1.req_2 = $.XMLHttpRequest();
  t1.req_2.open$2('GET', url);
  t1.req_2.setRequestHeader$2('Content-type', 'text/plain');
  $.add$1(t1.req_2.get$on().get$readyStateChange(), new $.Closure31(t1));
  t1.req_2.send$0();
};

$.eqB = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b) === true;
    } else {
      return a === b;
    }
  }
  return a === b;
};

$._containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    if (t1.next$0() === ref) {
      return true;
    }
  }
  return false;
};

$.FrameMap$3 = function(orientations_, positions_, list) {
  return new $.FrameMap(list, positions_, orientations_);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.isJsArray = function(value) {
  return !(value === (void 0)) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0 || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  }
  return a.operator$ge$1(b);
};

$.Vec2$2 = function(x, y) {
  var t1 = new $.Vec2((void 0), (void 0));
  t1.Vec2$2(x, y);
  return t1;
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$._IDBOpenDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.switchTag = function(o, oldTag, newTag) {
  o.removeTag$1(oldTag);
  $.rmTag(o, oldTag);
  $.add$1(o.get$tags(), newTag);
  $.addTag(o, newTag);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) {
      return name$;
    }
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    }
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  }
  return name$;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate((a) / (b));
  }
  return a.operator$tdiv$1(b);
};

$.printString = function(string) {
  if (typeof console == "object") {
    console.log(string);
  } else {
    write(string);
    write("\n");
  }
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.removeRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.removeRange$2(start, length$);
  }
  $.checkGrowable(receiver, 'removeRange');
  if ($.eqB(length$, 0)) {
    return;
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var receiverLength = (receiver.length);
  if (start < 0 || start >= receiverLength) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var t1 = start + length$;
  if (t1 > receiverLength) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(t1));
  }
  $.copy(receiver, $.add(start, length$), receiver, start, $.sub($.sub(receiverLength, length$), start));
  $.set$length(receiver, $.sub(receiverLength, length$));
};

$.Color$3 = function(r, g, b) {
  var t1 = new $.Color((void 0), (void 0), (void 0));
  t1.Color$3(r, g, b);
  return t1;
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  }
  $.set$length(receiver, 0);
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  }
  return name$;
};

$.notify = function(text) {
  $.forEach($.notifications, new $.Closure86());
  $.add$1($.notifications, $.Notification$1(text));
};

$.sqrt = function(x) {
  return $.sqrt2(x);
};

$.sqrt2 = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a = (a);
    var b = (b);
    if (b < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
    if (a > 0) {
      if (b > 31) {
        return 0;
      }
      return a >>> b;
    }
    if (b > 31) {
      b = 31;
    }
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex === (void 0)) {
    var endIndex = length$;
  }
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(startIndex, endIndex)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(endIndex, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex));
  }
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t1 = ({});
  t1.arg2_3 = arg2;
  t1.arg1_2 = arg1;
  t1.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure33(t1).$call$0();
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return new $.Closure34(t1).$call$0();
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return new $.Closure35(t1).$call$0();
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$.String$fromCharCodes = function(charCodes) {
  return $.createFromCharCodes(charCodes);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split2(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, result, inputTable, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; ++j) {
      t1 = tagNames.length;
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.Notification$1 = function(text) {
  return new $.Notification(0, 32, 300, text);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  }
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$.parseInt = function(str) {
  return $.parseInt2(str);
};

$._NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.parseInt2 = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  }
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2)) {
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  } else {
    t1 = false;
  }
  if (!t1) {
    if ($.gtB($.get$length(trimmed), 3)) {
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    } else {
      t1 = false;
    }
  } else {
    t1 = true;
  }
  var base = t1 ? 16 : 10;
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  }
  return ret;
};

$.neg = function(a) {
  if (typeof a === "number") {
    return -a;
  }
  return a.operator$negate$0();
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    }
    $._emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$._numberToString = function(x) {
  if (typeof x === 'number' && x === (x | 0)) {
    return $.toString(x);
  } else {
    if (typeof x === 'number') {
      return $.toString(x);
    } else {
      return $.toString($.toDouble(x));
    }
  }
};

$.OverlayManager$0 = function() {
  return new $.OverlayManager($.CTC4, $.CTC5, 21, 7);
};

$.UIManager$0 = function() {
  var t1 = new $.UIManager($.CTC8, (void 0), (void 0), (void 0), false, (void 0));
  t1.UIManager$0();
  return t1;
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  }
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.renderNotifications = function(c) {
  var i = $.sub($.get$length($.notifications), 1);
  if (typeof i !== 'number') return $.renderNotifications$bailout(c, 1, i);
  for (; i >= 0; --i) {
    if ($.index($.notifications, i).render$1(c) === true) {
      $.removeRange($.notifications, i, 1);
    }
  }
};

$.Avatar$1 = function(properties) {
  var t1 = new $.Avatar((void 0), 32, '', 0, false, true, 100, 0, 12, (void 0), false, (void 0), 0, 0, 1, false, '', '', (void 0), (void 0), (void 0), (void 0));
  t1.Vec2$2(0, 0);
  t1.GameObject$3(properties, 0, 0);
  t1.Avatar$1(properties);
  return t1;
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a | b) >>> 0;
  }
  return a.operator$or$1(b);
};

$._DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length === 0;
  }
  return receiver.isEmpty$0();
};

$._EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$0 = function() {
  var t1 = new $.HashSetImplementation((void 0));
  t1.HashSetImplementation$0();
  return t1;
};

$._IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.DoubleLinkedQueueEntry$1 = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry((void 0), (void 0), (void 0));
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$._SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._JsonParser$_internal$1 = function(json) {
  var t1 = new $._JsonParser(0, $.get$length(json), json);
  t1._JsonParser$_internal$1(json);
  return t1;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  }
  return result;
};

$.MenuInterface$2 = function(type, data) {
  var t1 = new $.MenuInterface((void 0), (void 0), data, type);
  t1.MenuInterface$2(type, data);
  return t1;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.Game$0 = function() {
  var t1 = new $.Game((void 0), (void 0));
  t1.Game$0();
  return t1;
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.abs$0();
  }
  return Math.abs(receiver);
};

$.loadSplitImage = function(name$, callback, px, py) {
  var t1 = ({});
  t1.px_2 = px;
  t1.py_3 = py;
  t1.callback_13 = callback;
  var name$ = 'resources/' + $.S(name$);
  t1.img_4 = $.Element$tag('img');
  $.add$1(t1.img_4.get$on().get$load(), new $.Closure48(t1));
  t1.img_4.set$src(name$);
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  }
  return receiver.iterator$0();
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b) === true;
};

$.Camera$3 = function(x, y, zoom) {
  var t1 = new $.Camera((void 0), (void 0), 10.0, (void 0), (void 0));
  t1.Vec2$2(0.0, 0.0);
  t1.Camera$3(x, y, zoom);
  return t1;
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) {
      return 0;
    }
    if (result > 0) {
      return result;
    }
    var b = (b);
    if (b < 0) {
      return result - b;
    } else {
      return result + b;
    }
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(sb, 'm');
  }
  if (ignoreCase === true) {
    $.add$1(sb, 'i');
  }
  if (global === true) {
    $.add$1(sb, 'g');
  }
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(pattern, (String(e))));
  }
};

$.splitChars = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.splitChars$0();
  }
  return receiver.split("");
};

$.BadNumberFormatException$1 = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$.stringify = function(object) {
  return $.stringify2(object);
};

$.stringify2 = function(object) {
  var stringifier = $.JsonStringifier$_internal$0();
  stringifier._stringify$1(object);
  return stringifier.get$_result();
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$._XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && (o.constructor === Array || o.is$List2()) ? '[...]' : '{...}');
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      $.add$1(result, $.eqNullB(o) ? 'null' : o);
    }
  }
};

$._emitMap = function(m, result, visiting) {
  var t1 = ({});
  t1.visiting_2 = visiting;
  t1.result_1 = result;
  $.add$1(t1.visiting_2, m);
  $.add$1(t1.result_1, '{');
  t1.first_3 = true;
  $.forEach(m, new $.Closure32(t1));
  $.add$1(t1.result_1, '}');
  $.removeLast(t1.visiting_2);
};

$._IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.rpat = function(n) {
  var t1 = $.rpatCount;
  $.rpatCount = $.add(t1, 1);
  return $.eq($.mod(t1, n), 0);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      }
      if (start < 0) {
        return -1;
      }
      return receiver.indexOf(element, start);
    }
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$._FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.eqNullB = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0)) === true;
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.Element$tag = function(tag) {
  return document.createElement(tag);
};

$._FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b = $.toString(b);
      if (typeof b === 'string') {
        return a + b;
      }
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  }
  return a.operator$add$1(b);
};

$.List$from = function(other) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.TileManager$1 = function(location$) {
  var t1 = new $.TileManager(location$, (void 0), (void 0));
  t1.TileManager$1(location$);
  return t1;
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addLast$1(value);
  }
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.Game$0();
};

$._AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$1 = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.Item$1 = function(properties) {
  var t1 = new $.Item((void 0), false, '', '', (void 0), (void 0), (void 0), (void 0));
  t1.Vec2$2(0, 0);
  t1.GameObject$3(properties, 0, 0);
  return t1;
};

$._MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  }
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  } else {
    return receiver.isNegative$0();
  }
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.isInfinite$0();
  }
  return (receiver == Infinity) || (receiver == -Infinity);
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.round$0();
  }
  if (receiver < 0) {
    return -Math.round(-receiver);
  } else {
    return Math.round(receiver);
  }
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.Animation$1 = function(properties) {
  var t1 = new $.Animation((void 0));
  t1.Animation$1(properties);
  return t1;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a <= b;
  }
  return a.operator$le$1(b);
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object'||src.constructor !== Array)) return $.copy$bailout(src, srcStart, dst, dstStart, count, 1, src, 0, 0, 0, 0);
  if (typeof dst !== 'object'||dst.constructor !== Array||!!dst.immutable$list) return $.copy$bailout(src, srcStart, dst, dstStart, count, 2, src, dst, 0, 0, 0);
  if (typeof count !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count, 3, src, dst, count, 0, 0);
  if (srcStart === (void 0)) {
    var srcStart = 0;
  }
  if (typeof srcStart !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count, 4, count, src, dst, srcStart, 0);
  if (dstStart === (void 0)) {
    var dstStart = 0;
  }
  if (typeof dstStart !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count, 5, srcStart, count, src, dst, dstStart);
  if (srcStart < dstStart) {
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = src.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t3 = dst.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      dst[j] = t2;
    }
  } else {
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i !== (i | 0)) throw $.iae(i);
      t2 = src.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t4 = dst.length;
      if (j < 0 || j >= t4) throw $.ioore(j);
      dst[j] = t3;
    }
  }
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.endsWith$1(other);
  }
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) {
    return false;
  }
  return $.eq(other, $.substring$1(receiver, $.sub(receiverLength, otherLength)));
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.XMLHttpRequest = function() {
  return new XMLHttpRequest();;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.addTag = function(object, tag) {
  if ($.eqNullB($.index($.tags, tag))) {
    var t1 = $.tags;
    var t2 = $.List$from([object]);
    $.setRuntimeTypeInfo(t2, ({E: 'GameObject'}));
    $.indexSet(t1, tag, t2);
    t1 = t2;
  } else {
    t1 = $.add$1($.index($.tags, tag), object);
  }
  return t1;
};

$._WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$.toRadixString = function(receiver, radix) {
  if (!(typeof receiver === 'number')) {
    return receiver.toRadixString$1(radix);
  }
  $.checkNum(radix);
  return receiver.toString(radix);
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure === (void 0)) {
    return;
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  }
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $, arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$.parse = function(json) {
  return $.parse2(json);
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.parse2 = function(json) {
  return $._JsonParser$_internal$1(json)._parseToplevel$0();
};

$.split = function(img, px, py, callback) {
  if (typeof px !== 'number') return $.split$bailout(img, px, py, callback, 1, px, 0);
  if (typeof py !== 'number') return $.split$bailout(img, px, py, callback, 2, px, py);
  var t1 = ({});
  t1.callback_3 = callback;
  t1.hc_4 = $.HiddenCanvas$2(px, py);
  var c = t1.hc_4.get$context();
  t1.amt_5 = 0;
  var list = $.List((void 0));
  $.setRuntimeTypeInfo(list, ({E: 'ImageElement'}));
  t1.list_6 = list;
  for (; $.ltB($.get$length(t1.list_6), $.mul($.div(img.get$width(), px), $.div(img.get$height(), py))); ) {
    $.add$1(t1.list_6, (void 0));
  }
  t1 = new $.Closure49(t1);
  for (var n = 0, y = 0; $.gtB(y, $.neg(img.get$height())); y = y - py) {
    for (var x = 0; $.gtB(x, $.neg(img.get$width())); x = x - px) {
      c.clearRect$4(0, 0, px, py);
      c.drawImage$3(img, x, y);
      var n0 = n + 1;
      t1.$call$1(n);
      n = n0;
    }
  }
};

$.split2 = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t1 = $.iterator(strings), result = ''; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.checkNull(t2);
    if (!(typeof t2 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t2));
    }
    result = result + t2;
  }
  return result;
};

$._InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$._DoubleLinkedQueueIterator$1 = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator((void 0), _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.jsPropertyAccess = function(jsObject, property) {
  return jsObject[property];
};

$.JsonStringifier$_internal$0 = function() {
  var t1 = $.StringBufferImpl$1('');
  var t2 = $.List((void 0));
  $.setRuntimeTypeInfo(t2, ({E: 'Object'}));
  return new $.JsonStringifier(t2, t1);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return res;
};

$._TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$0 = function() {
  var t1 = new $.LinkedHashMapImplementation((void 0), (void 0));
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$._DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r === (void 0) ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  }
  return object;
};

$._EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$0 = function() {
  var t1 = new $.DoubleLinkedQueue((void 0));
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  }
  return false;
};

$.loadFile = function(name$, callback) {
  var name$ = 'resources/' + $.S(name$);
  if ($.eqNullB(callback)) {
    var callback = new $.Closure66();
  }
  $.load(name$, callback);
};

$.random = function() {
  return $.random2();
};

$.random2 = function() {
  return Math.random();
};

$._DoubleLinkedQueueEntrySentinel$0 = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel((void 0), (void 0), (void 0));
  t1.DoubleLinkedQueueEntry$1((void 0));
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.GameObject$3 = function(a, xx, yy) {
  var t1 = new $.GameObject(false, '', '', (void 0), (void 0), (void 0), (void 0));
  t1.Vec2$2(xx, yy);
  t1.GameObject$3(a, xx, yy);
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  }
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
      if (!($.truncate(index) === index)) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return a[index];
  }
  return a.operator$index$1(index);
};

$.Color$fromString$1 = function(s) {
  var t1 = new $.Color((void 0), (void 0), (void 0));
  t1.Color$fromString$1(s);
  return t1;
};

$.loadImage = function(name$, callback) {
  var t1 = ({});
  t1.callback_19 = callback;
  var name$ = 'resources/' + $.S(name$);
  t1.img_22 = $.Element$tag('img');
  $.add$1(t1.img_22.get$on().get$load(), new $.Closure74(t1));
  $.add$1(t1.img_22.get$on().get$error(), new $.Closure75(t1));
  t1.callback_19 = $.eqNullB(t1.callback_19) ? new $.Closure76() : t1.callback_19;
  t1.img_22.set$src(name$);
  return t1.img_22;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.Path$5 = function(s, e, points, houseStart, houseEnd) {
  var t1 = new $.Path(points, (void 0), (void 0));
  t1.Path$5(s, e, points, houseStart, houseEnd);
  return t1;
};

$.rmTag = function(object, tag) {
  var index = $.indexOf$1($.index($.tags, tag), object);
  if (!$.eqB(index, -1)) {
    $.removeRange($.index($.tags, tag), index, 1);
  }
};

$._escape = function(sb, s) {
  var length$ = $.get$length(s);
  var charCodes = $.List((void 0));
  $.setRuntimeTypeInfo(charCodes, ({E: 'int'}));
  for (var needsEscape = false, i = 0; $.ltB(i, length$); ++i) {
    var charCode = $.charCodeAt(s, i);
    if ($.ltB(charCode, 32)) {
      charCodes.push(92);
            switch (charCode) {
        case 8:
          charCodes.push(98);
          break;
        case 9:
          charCodes.push(116);
          break;
        case 10:
          charCodes.push(110);
          break;
        case 12:
          charCodes.push(102);
          break;
        case 13:
          charCodes.push(114);
          break;
        default:
          charCodes.push(117);
          charCodes.push($._hexDigit($.and($.shr(charCode, 12), 15)));
          charCodes.push($._hexDigit($.and($.shr(charCode, 8), 15)));
          charCodes.push($._hexDigit($.and($.shr(charCode, 4), 15)));
          charCodes.push($._hexDigit($.and(charCode, 15)));
          break;
      }
      needsEscape = true;
    } else {
      if ($.eqB(charCode, 34) || $.eqB(charCode, 92)) {
        charCodes.push(92);
        charCodes.push(charCode);
        needsEscape = true;
      } else {
        charCodes.push(charCode);
      }
    }
  }
  $.add$1(sb, needsEscape ? $.String$fromCharCodes(charCodes) : s);
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  }
  if (value === (void 0)) {
    return 'null';
  }
  if (typeof value == "function") {
    return 'Closure';
  }
  return String(value);
};

$.ImageElement = function(src, height, width) {
  var _e = $._document().$dom_createElement$1('img');
  if (!$.eqNullB(src)) {
    _e.set$src(src);
  }
  if (!$.eqNullB(height)) {
    _e.set$height(height);
  }
  if (!$.eqNullB(width)) {
    _e.set$width(width);
  }
  return _e;
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$._BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.toInt$0();
  }
  if ($.isNaN(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('NaN'));
  }
  if ($.isInfinite(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('Infinity'));
  }
  var truncated = $.truncate(receiver);
  return (truncated == -0.0) ? 0 : truncated;
};

$._WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.KeyValuePair$2 = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$._MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f === (void 0)) && (!!f.methods)) {
    return f.methods;
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC37)[name$]);
  if (!(dartMethod === (void 0))) {
    methods['Object'] = dartMethod;
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.print = function(obj) {
  return $.printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$.stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!((typeof t2 === 'number') && (t2 === (t2 | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t2));
    }
  }
  return String.fromCharCode.apply((void 0), charCodes);
};

$.HiddenCanvas$2 = function(width, height) {
  var t1 = new $.HiddenCanvas((void 0), (void 0));
  t1.HiddenCanvas$2(width, height);
  return t1;
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    }
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.objectToString = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') {
      name$ = decompiled;
    }
  }
  return 'Instance of \'' + $.S($.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$) + '\'';
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex, 1, a, 0, 0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex, 2, a, endIndex, 0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  if ($.ltB(startIndex, 0)) {
    var startIndex = 0;
  }
  if (typeof startIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex, 1, a, 0, 0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex, 2, a, endIndex, 0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  if ($.ltB(startIndex, 0)) {
    var startIndex = 0;
  }
  if (typeof startIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  }
  return name$;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  }
  return a.operator$gt$1(b);
};

$._hexDigit = function(x) {
  return $.ltB(x, 10) ? $.add(48, x) : $.add(87, x);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  }
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    hash = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    hash = (536870911 & hash + ((524287 & hash) >>> 0 << 10)) >>> 0;
    hash = (hash ^ $.shr(hash, 6)) >>> 0;
  }
  hash = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  hash = (hash ^ $.shr(hash, 11)) >>> 0;
  return (536870911 & hash + ((16383 & hash) >>> 0 << 15)) >>> 0;
};

$.SpawnPoint$1 = function(a) {
  var t1 = new $.SpawnPoint((void 0), (void 0), false, 0, 0, 5, -1, false, '', '', (void 0), (void 0), (void 0), (void 0));
  t1.Vec2$2(0, 0);
  t1.GameObject$3(a, 0, 0);
  return t1;
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$0();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.forEach2 = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object') && (((charCodes.constructor === Array) || charCodes.is$List2())))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(charCodes));
    }
    var charCodes0 = $.List$from(charCodes);
    var charCodes = charCodes0;
  }
  return $.stringFromCharCodes(charCodes);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  }
  return other == receiver.substring(0, length$);
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.trim$0();
  }
  return receiver.trim();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method === (void 0) && !($._dynamicMetadata2() === (void 0))) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata2())); ++i) {
      var entry = $.index($._dynamicMetadata2(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method === (void 0))) {
          break;
        }
      }
    }
  }
  if (method === (void 0)) {
    method = (methods['Object']);
  }
  var proto = (Object.getPrototypeOf(obj));
  if (method === (void 0)) {
    method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  }
  var nullCheckMethod = (function() {var res = method.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  }
  return nullCheckMethod.apply(obj, arguments$);
};

$._MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._document = function() {
  return document;;
};

$.forEach3 = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) {
    return $.typeNameInChrome;
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC36) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      return a[key];
    }
  }
  return $.index$slow(a, index);
};

$._ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.World$0 = function() {
  var t1 = new $.World((void 0), 0, 0, 200, true, 36000, 7, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.World$0();
  return t1;
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toLowerCase$0();
  }
  return receiver.toLowerCase();
};

$.parseDouble = function(str) {
  return $.parseDouble2(str);
};

$.toDouble = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.toDouble$0();
  }
  return receiver;
};

$.parseDouble2 = function(str) {
  $.checkString(str);
  var ret = (parseFloat(str));
  if (ret === 0) {
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  } else {
    t1 = false;
  }
  if (t1) {
    ret = (parseInt(str));
  }
  if ($.isNaN(ret) === true && !$.eqB(str, 'NaN') && !$.eqB(str, '-NaN')) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  }
  return ret;
};

$.List = function(length$) {
  return $.newList(length$);
};

$._XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver) === true || typeof receiver === 'string') {
    return $.indexOf$2(receiver, element, 0);
  }
  return receiver.indexOf$1(element);
};

$.PathNode$fromVec2$4 = function(v, path, house, start) {
  var t1 = v.get$x();
  var t2 = v.get$y();
  var t3 = new $.PathNode(start, house, path, (void 0), (void 0));
  t3.Vec2$2(t1, t2);
  return t3;
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  }
  return a === b;
};

$.HashMapImplementation$0 = function() {
  var t1 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t1.HashMapImplementation$0();
  return t1;
};

$.StringBufferImpl$1 = function(content$) {
  var t1 = new $.StringBufferImpl((void 0), (void 0));
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  }
  return a.operator$div$1(b);
};

$.MenuButton$4 = function(text, action, x, y) {
  var t1 = new $.MenuButton(32, (void 0), action, text, (void 0), (void 0));
  t1.Vec2$2(x, y);
  return t1;
};

$.some = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.some$1(f);
  } else {
    return $.some2(receiver, f);
  }
};

$.some2 = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) {
      return true;
    }
  }
  return false;
};

$.some3 = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) {
      return true;
    }
  }
  return false;
};

$._SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) {
    target.builtin$typeInfo = typeInfo;
  }
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a = (a);
    var b = (b);
    if (b < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
    if (b > 31) {
      return 0;
    }
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.document = function() {
  return document;;
};

$._FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  }
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) {
        return $.ObjectNotClosureException$0();
      } else {
        return $.NullPointerException$2((void 0), $.CTC);
      }
    } else {
      if ($.eqB(type, 'undefined_method')) {
        if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NoSuchMethodException$4('', name$, [], (void 0));
        }
      }
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true) {
        return $.NullPointerException$2((void 0), $.CTC);
      } else {
        if ($.endsWith(message, 'is not a function') === true) {
          return $.NoSuchMethodException$4('', '<unknown>', [], (void 0));
        }
      }
    }
    return $.ExceptionImplementation$1(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) {
      return $.StackOverflowException$0();
    }
    return $.IllegalArgumentException$1('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') {
      return $.StackOverflowException$0();
    }
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  }
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$.copy$bailout = function(src, srcStart, dst, dstStart, count, state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      src = env0;
      break;
    case 2:
      src = env0;
      dst = env1;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      break;
    case 4:
      count = env0;
      src = env1;
      dst = env2;
      srcStart = env3;
      break;
    case 5:
      srcStart = env0;
      count = env1;
      src = env2;
      dst = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
    case 3:
      state = 0;
      if (srcStart === (void 0)) {
        var srcStart = 0;
      }
    case 4:
      state = 0;
      if (dstStart === (void 0)) {
        var dstStart = 0;
      }
    case 5:
      state = 0;
      if ($.ltB(srcStart, dstStart)) {
        var i = $.sub($.add(srcStart, count), 1);
        var j = $.sub($.add(dstStart, count), 1);
        L0: while (true) {
          if (!$.geB(i, srcStart)) break L0;
          $.indexSet(dst, j, $.index(src, i));
          i = $.sub(i, 1);
          j = $.sub(j, 1);
        }
      } else {
        i = srcStart;
        j = dstStart;
        L1: while (true) {
          if (!$.ltB(i, $.add(srcStart, count))) break L1;
          $.indexSet(dst, j, $.index(src, i));
          i = $.add(i, 1);
          j = $.add(j, 1);
        }
      }
  }
};

$.renderNotifications$bailout = function(c, state, env0) {
  switch (state) {
    case 1:
      i = env0;
      break;
  }
  switch (state) {
    case 0:
      var i = $.sub($.get$length($.notifications), 1);
    case 1:
      state = 0;
      L0: while (true) {
        if (!$.geB(i, 0)) break L0;
        if ($.index($.notifications, i).render$1(c) === true) {
          $.removeRange($.notifications, i, 1);
        }
        i = $.sub(i, 1);
      }
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      endIndex = env1;
      break;
    case 3:
      a = env0;
      endIndex = env1;
      startIndex = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      if ($.ltB(startIndex, 0)) {
        var startIndex = 0;
      }
    case 3:
      state = 0;
      var i = startIndex;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      endIndex = env1;
      break;
    case 3:
      a = env0;
      endIndex = env1;
      startIndex = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      if ($.ltB(startIndex, 0)) {
        var startIndex = 0;
      }
    case 3:
      state = 0;
      var i = startIndex;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.split$bailout = function(img, px, py, callback, state, env0, env1) {
  switch (state) {
    case 1:
      px = env0;
      break;
    case 2:
      px = env0;
      py = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      var t1 = ({});
      t1.callback_3 = callback;
      t1.hc_4 = $.HiddenCanvas$2(px, py);
      var c = t1.hc_4.get$context();
      t1.amt_5 = 0;
      var list = $.List((void 0));
      $.setRuntimeTypeInfo(list, ({E: 'ImageElement'}));
      t1.list_6 = list;
      L0: while (true) {
        if (!$.ltB($.get$length(t1.list_6), $.mul($.div(img.get$width(), px), $.div(img.get$height(), py)))) break L0;
        $.add$1(t1.list_6, (void 0));
      }
      t1 = new $.Closure49(t1);
      var n = 0;
      var y = 0;
      L1: while (true) {
        if (!$.gtB(y, $.neg(img.get$height()))) break L1;
        var x = 0;
        L2: while (true) {
          if (!$.gtB(x, $.neg(img.get$width()))) break L2;
          c.clearRect$4(0, 0, px, py);
          c.drawImage$3(img, x, y);
          var n0 = n + 1;
          t1.$call$1(n);
          n = n0;
          x = $.sub(x, px);
        }
        y = $.sub(y, py);
      }
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      inputTable = env0;
      break;
    case 2:
      result = env0;
      inputTable = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split2(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              ++j;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
        }
      }
      return result;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.invokeClosure.$call$5 = $.invokeClosure;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC12 = Isolate.makeConstantList([0, 0, 0, 1]);
$.CTC13 = Isolate.makeConstantList([0, 0, 1, 0]);
$.CTC11 = Isolate.makeConstantList([0, 0, 0, 0]);
$.CTC15 = Isolate.makeConstantList([0, 1, 0, 0]);
$.CTC14 = Isolate.makeConstantList([0, 0, 1, 1]);
$.CTC18 = Isolate.makeConstantList([0, 1, 1, 1]);
$.CTC2 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC16 = Isolate.makeConstantList([0, 1, 0, 1]);
$.CTC19 = Isolate.makeConstantList([1, 0, 0, 0]);
$.CTC36 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC29 = Isolate.makeConstantList(['Help!', 'Where is everyone?', 'Where do I go?', 'Please help me!', 'Where am I?']);
$.CTC30 = Isolate.makeConstantList(['wander', 'nice', 'hostile', 'hostile-wander']);
$.CTC31 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC30, {'wander': true, 'nice': true, 'hostile': true, 'hostile-wander': true}, 4);
$.CTC21 = Isolate.makeConstantList([1, 0, 1, 0]);
$.CTC22 = Isolate.makeConstantList([1, 0, 1, 1]);
$.CTC27 = Isolate.makeConstantList(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']);
$.CTC17 = Isolate.makeConstantList([0, 1, 1, 0]);
$.CTC6 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC7 = Isolate.makeConstantList(['backspace', 'enter', 'shift', 'ctrl', 'alt', 'capslock', 'esc', 'space', '_0', 'zero', '_1', 'one', '_2', 'two', '_3', 'three', '_4', 'four', '_5', 'five', '_6', 'six', '_7', 'seven', '_8', 'eight', '_9', 'nine', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'semicolon', 'equal', 'comma', 'hyphen', 'dash', 'minus', 'period', 'dot', 'slash', 'forwardslash', 'grave', 'backtick', 'bracketleft', 'backslash', 'bracketright', 'singlequote', 'exclamation', 'at', 'ampersat', 'pound', 'dollar', 'mod', 'modulo', 'percent', 'caret', 'ampersand', 'asterisk', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'colon', 'plus', 'pointbracketleft', 'trianglebracketleft', 'underscore', 'pointbracketright', 'trianglebracketright', 'question', 'questionmark', 'approx', 'tilde', 'curleybraceleft', 'pipe', 'curleybraceright', 'doublequote', 'left', 'up', 'right', 'down', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']);
$.CTC23 = Isolate.makeConstantList([1, 1, 0, 0]);
$.CTC24 = Isolate.makeConstantList([1, 1, 0, 1]);
$.CTC33 = Isolate.makeConstantList(['Why don\'t you just go?', 'Get outta here!', 'Get out!', 'Why won\'t you help us?', 'It\'s outsiders like you that caused this!']);
$.CTC4 = Isolate.makeConstantList(['#ebddcb', '#d3b7b2', '#bb98ad', '#806593']);
$.CTC32 = new Isolate.$isolateProperties.JsonUnsupportedObjectType();
$.CTC20 = Isolate.makeConstantList([1, 0, 0, 1]);
$.CTC25 = Isolate.makeConstantList([1, 1, 1, 0]);
$.CTC37 = new Isolate.$isolateProperties.Object();
$.CTC35 = Isolate.makeConstantList(['Can you take me somewhere safe?', 'Please help me!', 'Please take me home!']);
$.CTC26 = Isolate.makeConstantList([1, 1, 1, 1]);
$.CTC5 = Isolate.makeConstantList(['#3e3e56', '#818fb6', '#b2cdec', '#cbe3f6']);
$.CTC8 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC7, {'backspace': 8, 'enter': 13, 'shift': 16, 'ctrl': 17, 'alt': 18, 'capslock': 20, 'esc': 27, 'space': 32, '_0': 48, 'zero': 48, '_1': 49, 'one': 49, '_2': 50, 'two': 50, '_3': 51, 'three': 51, '_4': 52, 'four': 52, '_5': 53, 'five': 53, '_6': 54, 'six': 54, '_7': 55, 'seven': 55, '_8': 56, 'eight': 56, '_9': 57, 'nine': 57, 'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84, 'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90, 'semicolon': 186, 'equal': 187, 'comma': 188, 'hyphen': 189, 'dash': 189, 'minus': 189, 'period': 190, 'dot': 190, 'slash': 191, 'forwardslash': 191, 'grave': 192, 'backtick': 192, 'bracketleft': 219, 'backslash': 220, 'bracketright': 221, 'singlequote': 222, 'exclamation': 49, 'at': 50, 'ampersat': 50, 'pound': 51, 'dollar': 52, 'mod': 53, 'modulo': 53, 'percent': 53, 'caret': 54, 'ampersand': 55, 'asterisk': 56, 'A': 65, 'B': 66, 'C': 67, 'D': 68, 'E': 69, 'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74, 'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79, 'P': 80, 'Q': 81, 'R': 82, 'S': 83, 'T': 84, 'U': 85, 'V': 86, 'W': 87, 'X': 88, 'Y': 89, 'Z': 90, 'colon': 186, 'plus': 187, 'pointbracketleft': 188, 'trianglebracketleft': 188, 'underscore': 189, 'pointbracketright': 190, 'trianglebracketright': 190, 'question': 191, 'questionmark': 191, 'approx': 192, 'tilde': 192, 'curleybraceleft': 219, 'pipe': 220, 'curleybraceright': 221, 'doublequote': 222, 'left': 37, 'up': 38, 'right': 39, 'down': 40, 'F1': 112, 'F2': 113, 'F3': 114, 'F4': 115, 'F5': 116, 'F6': 117, 'F7': 118, 'F8': 119, 'F9': 120, 'F10': 121, 'F11': 122, 'F12': 123}, 138);
$.CTC9 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC28 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC27, {'0': Isolate.$isolateProperties.CTC11, '1': Isolate.$isolateProperties.CTC12, '2': Isolate.$isolateProperties.CTC13, '3': Isolate.$isolateProperties.CTC14, '4': Isolate.$isolateProperties.CTC15, '5': Isolate.$isolateProperties.CTC16, '6': Isolate.$isolateProperties.CTC17, '7': Isolate.$isolateProperties.CTC18, '8': Isolate.$isolateProperties.CTC19, '9': Isolate.$isolateProperties.CTC20, 'a': Isolate.$isolateProperties.CTC21, 'b': Isolate.$isolateProperties.CTC22, 'c': Isolate.$isolateProperties.CTC23, 'd': Isolate.$isolateProperties.CTC24, 'e': Isolate.$isolateProperties.CTC25, 'f': Isolate.$isolateProperties.CTC26}, 16);
$.CTC34 = Isolate.makeConstantList(['Hi!', 'Hiya!', 'Hello!', 'It\'s not so scary with you around!', 'Thanks for the help!']);
$.CTC3 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC10 = new Isolate.$isolateProperties.EmptyQueueException();
$.niceFactor = 0;
$.RESOLUTION = 1;
$.SCREEN_HEIGHT = (void 0);
$.tags = (void 0);
$.tokens = (void 0);
$.tagEvents = (void 0);
$.rpatCount = 0;
$.world = (void 0);
$.SCREEN_WIDTH = (void 0);
$.event = (void 0);
$.animationMap = (void 0);
$.ZOMBIE_WANDER_DISTANCE = 256;
$.AGRO_DISTANCE = 256;
$._getTypeNameOf = (void 0);
$.BLANK_IMAGE = (void 0);
$.classMap = (void 0);
$.tagMap = (void 0);
$.removalOnDeath = Isolate.$isolateProperties.CTC31;
$.notifications = (void 0);
$.RENDER_DISTANCE = (void 0);
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["type="], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('HTMLAppletElement', ["width=", "height="], {
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('AudioNode', ["context?"], {
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$1(this);
 }
});

$.$defineNativeClass('BiquadFilterNode', ["type="], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', ["b?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$zoom: function(value) {
  this.setProperty$3('zoom', value, '');
 },
 get$zoom: function() {
  return this.getPropertyValue$1('zoom');
 },
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 set$src: function(value) {
  this.setProperty$3('src', value, '');
 },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 set$font: function(value) {
  this.setProperty$3('font', value, '');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 setProperty$2: function(propertyName,value) {
  return this.setProperty(propertyName,value);
},
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 },
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('HTMLCanvasElement', ["width=", "height="], {
 toDataURL$1: function(type) {
  return this.toDataURL(type);
 },
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["strokeStyle!", "lineWidth!", "lineCap!", "globalAlpha=", "font!", "fillStyle!"], {
 translate$2: function(tx, ty) {
  return this.translate(tx,ty);
 },
 strokeRect$5: function(x, y, width, height, lineWidth) {
  return this.strokeRect(x,y,width,height,lineWidth);
 },
 strokeRect$4: function(x,y,width,height) {
  return this.strokeRect(x,y,width,height);
},
 stroke$0: function() {
  return this.stroke();
 },
 setTransform$6: function(m11, m12, m21, m22, dx, dy) {
  return this.setTransform(m11,m12,m21,m22,dx,dy);
 },
 scale$2: function(sx, sy) {
  return this.scale(sx,sy);
 },
 save$0: function() {
  return this.save();
 },
 restore$0: function() {
  return this.restore();
 },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 measureText$1: function(text) {
  return this.measureText(text);
 },
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
 },
 fillText$4: function(text, x, y, maxWidth) {
  return this.fillText(text,x,y,maxWidth);
 },
 fillText$3: function(text,x,y) {
  return this.fillText(text,x,y);
},
 fillRect$4: function(x, y, width, height) {
  return this.fillRect(x,y,width,height);
 },
 drawImage$9: function(canvas_OR_image_OR_video, sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh, dx, dy, dw, dh) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh);
 },
 drawImage$3: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y);
},
 closePath$0: function() {
  return this.closePath();
 },
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
 },
 beginPath$0: function() {
  return this.beginPath();
 }
});

$.$defineNativeClass('CharacterData', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('ClientRect', ["width?", "height?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.time$1 = function(title) {
  return this.time(title);
 };
_ConsoleImpl.get$time = function() { return new $.Closure119(this, 'time$1'); };
_ConsoleImpl.error$1 = function(arg) {
  return this.error(arg);
 };
_ConsoleImpl.get$error = function() { return new $.Closure119(this, 'error$1'); };
$.$defineNativeClass('ConvolverNode', [], {
 normalize$0: function() { return this.normalize.$call$0(); }
});

$.$defineNativeClass('DOMApplicationCache', ["status?"], {
 update$0: function() {
  return this.update();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$1(this);
 }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 },
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
},
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', ["readyState?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 open$2: function(arg0, arg1) { return this.open.$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.open.$call$3(arg0, arg1, arg2); }
});

$.$defineNativeClass('HTMLDocument', ["readyState?"], {
 query$1: function(selectors) {
  if ($.CTC6.hasMatch$1(selectors) === true) {
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  }
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 $dom_createElement$1: function(tagName) {
  return this.createElement(tagName);
 },
 get$on: function() {
  return $._DocumentEventsImpl$1(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$1(this);
 },
 get$parent: function() {
  return;
 },
 get$translate: function() {
  return false;
 },
 translate$2: function(arg0, arg1) { return this.get$translate().$call$2(arg0, arg1); },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 }
});

$.$defineNativeClass('Element', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 translate$2: function(arg0, arg1) { return this.translate.$call$2(arg0, arg1); },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 }
});

$.$defineNativeClass('HTMLEmbedElement', ["width=", "type=", "src!", "height="], {
});

$.$defineNativeClass('Entry', [], {
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1));
 },
 moveTo$2: function(parent$,name$) {
  successCallback = $.convertDartClosureToJS(successCallback, 1);
  errorCallback = $.convertDartClosureToJS(errorCallback, 1);
  return this.moveTo(parent$,name$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
 },
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
 }
});

$.$defineNativeClass('Event', ["type?"], {
 preventDefault$0: function() {
  return this.preventDefault();
 }
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', ["readyState?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$1(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 }
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', ["readyState?", "error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriter', ["readyState?", "length?", "error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 length$0: function() { return this.length.$call$0(); },
 get$on: function() {
  return $._FileWriterEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('Float32Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 length$0: function() { return this.length.$call$0(); },
 action$0: function() { return this.action.$call$0(); }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "src!", "height?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
 tags$1: function(name) {
  return this.tags(name);
 },
 get$tags: function() { return new $.Closure119(this, 'tags$1'); },
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 length$0: function() { return this.get$length().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('IDBCursor', ["key?"], {
 key$1: function(arg0) { return this.key.$call$1(arg0); }
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBObjectStore', [], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', ["readyState?", "error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', ["error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["width=", "src!", "height="], {
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width=", "src!", "height="], {
});

$.$defineNativeClass('HTMLInputElement', ["width=", "value=", "type=", "src!", "pattern?", "height="], {
 get$on: function() {
  return $._InputElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$1(this);
 }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["type?"], {
});

$.$defineNativeClass('HTMLLIElement', ["value=", "type="], {
});

$.$defineNativeClass('HTMLLinkElement', ["type="], {
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width=", "height="], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.Closure116(this, 'start$0'); }
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', ["src!", "readyState?", "error?"], {
 load$0: function() {
  return this.load();
 },
 get$load: function() { return new $.Closure116(this, 'load$0'); },
 get$on: function() {
  return $._MediaElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', ["readyState?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('MessagePort', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.Closure116(this, 'start$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["y?", "x?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 remove$0: function() {
  if (!$.eqNullB(this.get$parent())) {
    this.get$parent().$dom_removeChild$1(this);
  }
  return this;
 }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._parent.$dom_removeChild$1(result);
  }
  return result;
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type=", "start?"], {
});

$.$defineNativeClass('HTMLObjectElement', ["width=", "type=", "height="], {
});

$.$defineNativeClass('OperationNotAllowedException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('Oscillator', ["type="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "type?"], {
});

$.$defineNativeClass('HTMLParamElement', ["value=", "type="], {
});

$.$defineNativeClass('PeerConnection00', ["readyState?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$1(this);
 }
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["y=", "x="], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGCircleElement', ["r?"], {
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$1(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "width?", "height?", "type?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?", "width?", "height?"], {
 scale$2: function(arg0, arg1) { return this.scale.$call$2(arg0, arg1); }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEPointLightElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFESpotLightElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "width?", "height?", "type?"], {
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGGlyphRefElement', ["y=", "x="], {
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGMatrix', ["b?"], {
 translate$2: function(x, y) {
  return this.translate(x,y);
 }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y="], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGPoint', ["y=", "x="], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', ["points?"], {
});

$.$defineNativeClass('SVGPolylineElement', ["points?"], {
});

$.$defineNativeClass('SVGRadialGradientElement', ["r?"], {
});

$.$defineNativeClass('SVGRect', ["y=", "x=", "width=", "height="], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGScriptElement', ["type="], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type="], {
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGTransform', ["type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('Screen', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["type=", "src!"], {
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "type?", "length="], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('ShadowRoot', [], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 }
});

$.$defineNativeClass('SharedWorkerContext', [], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLSourceElement', ["type=", "src!"], {
});

$.$defineNativeClass('SpeechGrammar', ["src!"], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('SpeechRecognition', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.Closure116(this, 'start$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$1(this);
 }
});

$.$defineNativeClass('SpeechRecognitionEvent', ["error?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 length$0: function() { return this.get$length().$call$0(); },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $.Closure87(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    }
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
 key$1: function(arg0) { return this.key.$call$1(arg0); }
});

$.$defineNativeClass('HTMLStyleElement', ["type="], {
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width=", "height="], {
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "type?"], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 length$0: function() { return this.length.$call$0(); },
 get$on: function() {
  return $._TextTrackListEventsImpl$1(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 start$1: function(index) {
  return this.start(index);
 },
 get$start: function() { return new $.Closure119(this, 'start$1'); },
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('Touch', ["pageY?", "pageX?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["src!", "readyState?"], {
});

$.$defineNativeClass('UIEvent', ["pageY?", "pageX?", "keyCode?"], {
});

$.$defineNativeClass('HTMLUListElement', ["type="], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width=", "height="], {
});

$.$defineNativeClass('WebGLActiveInfo', ["type?"], {
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 lineWidth$1: function(width) {
  return this.lineWidth(width);
 }
});

$.$defineNativeClass('WebSocket', ["readyState?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$1(this);
 }
});

$.$defineNativeClass('WheelEvent', ["y?", "x?"], {
});

$.$defineNativeClass('DOMWindow', ["status?", "length?", "innerWidth?", "innerHeight?"], {
 prompt$2: function(message, defaultValue) {
  return this.prompt(message,defaultValue);
 },
 open$3: function(url, name, options) {
  return this.open(url,name,options);
 },
 open$2: function(url,name$) {
  return this.open(url,name$);
},
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 length$0: function() { return this.length.$call$0(); },
 get$on: function() {
  return $._WindowEventsImpl$1(this);
 },
 _ensureRequestAnimationFrame$0: function() {
     if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }
;
 },
 _requestAnimationFrame$1: function(callback) {
  return this.requestAnimationFrame($.convertDartClosureToJS(callback, 1));
 },
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
 }
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$1(this);
 }
});

$.$defineNativeClass('WorkerContext', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequest', ["status?", "responseText?", "readyState?"], {
 setRequestHeader$2: function(header, value) {
  return this.setRequestHeader(header,value);
 },
 send$1: function(data) {
  return this.send(data);
 },
 send$0: function() {
  return this.send();
},
 open$5: function(method, url, async, user, password) {
  return this.open(method,url,async,user,password);
 },
 open$2: function(method,url) {
  return this.open(method,url);
},
 open$3: function(method,url,async) {
  return this.open(method,url,async);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$1(this);
 }
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$1(this);
 }
});

// 245 dynamic classes.
// 392 classes
// 35 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v2/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement';
  var v3/*class(_UIEventImpl)*/ = 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent';
  var v4/*class(_ElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGComponentTransferFunctionElementImpl)*/,v2/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v5/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v6/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v7/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var v8/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v9/*class(_NodeImpl)*/ = [v4/*class(_ElementImpl)*/,v5/*class(_DocumentFragmentImpl)*/,v6/*class(_DocumentImpl)*/,v7/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v10/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream';
  var v11/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v12/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['UIEvent', v3/*class(_UIEventImpl)*/],
    ['AbstractWorker', v12/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['AudioNode', 'AudioNode|WaveShaperNode|RealtimeAnalyserNode|JavaScriptAudioNode|DynamicsCompressorNode|DelayNode|ConvolverNode|BiquadFilterNode|AudioSourceNode|Oscillator|MediaElementAudioSourceNode|AudioBufferSourceNode|AudioPannerNode|AudioGainNode|AudioDestinationNode|AudioChannelSplitter|AudioChannelMerger'],
    ['AudioParam', 'AudioParam|AudioGain'],
    ['Blob', 'Blob|File'],
    ['WorkerContext', v8/*class(_WorkerContextImpl)*/],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v7/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v6/*class(_DocumentImpl)*/],
    ['DocumentFragment', v5/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v1/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['HTMLMediaElement', v2/*class(_MediaElementImpl)*/],
    ['Element', v4/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v3/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v9/*class(_NodeImpl)*/],
    ['MediaStream', v10/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v11/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v8/*class(_WorkerContextImpl)*/,v9/*class(_NodeImpl)*/,v10/*class(_MediaStreamImpl)*/,v11/*class(_IDBRequestImpl)*/,v12/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var collected in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, collected)) {
      var desc = collectedClasses[collected];
      Isolate.$defineClass(collected, desc.super, desc[''], desc);
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
