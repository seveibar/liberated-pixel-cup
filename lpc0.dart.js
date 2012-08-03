function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_stackTrace", "_exception", "_lib1_value", "_isComplete"],
 super: "Object",
 _setException$2: function(exception, stackTrace) {
  if (exception == null) throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
 },
 _setValue$1: function(value) {
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib1_value = value;
  this._complete$0();
 },
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null)) {
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true; ) {
        var handler = t1.next$0();
        if ($.eqB(handler.$call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    }
    if (this.get$hasValue() === true) {
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true; ) {
        var listener = t1.next$0();
        listener.$call$1(this.get$value());
      }
    } else {
      if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0)) throw $.captureStackTrace(this._exception);
    }
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true; ) {
      var listener0 = t1.next$0();
      try {
        listener0.$call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }
    }
  }
 },
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
 },
 get$isComplete: function() {
  return this._isComplete;
 },
 get$exception: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._exception;
 },
 get$value: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null)) throw $.captureStackTrace(t1);
  return this._lib1_value;
 }
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
 },
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
 },
 get$future: function() {
  return this._futureImpl;
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_11 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC31) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC31) && f.$call$2(key, $.index(this._values, i));
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
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t3 = t1.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t3 = t1.length;
    if (index < 0 || index >= t3) throw $.ioore(index);
    var t4 = t1[index] === $.CTC31;
    t1 = t4;
  } else t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number') return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  t3 = t1.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  var t5 = t1.length;
  if (index < 0 || index >= t5) throw $.ioore(index);
  t1[index] = value;
 },
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state == 2 || (state == 0 && !($.index(t1, index) == null))) {
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC31;
            t1 = t3;
        }
      } else {
        t1 = true;
      }
    case 3:
      if (state == 3 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, ({E: 'V'}));
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC31) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, ({E: 'V'}));
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC31) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
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
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._probeForAdding$1$bailout(2, numberOfProbes, hash, key, insertionIndex, t1);
    var t3 = t1.length;
    if (hash < 0 || hash >= t3) throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    if ($.eqB(existingKey, key)) return hash;
    if (insertionIndex < 0 && $.CTC31 === existingKey) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      numberOfProbes = env0;
      hash = env1;
      key = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var t1 = this._keys;
          case 2:
            state = 0;
            var existingKey = $.index(t1, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC31 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = numberOfProbes + 1;
            hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
          case 3:
            state = 0;
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
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
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t3 = t1.length;
  if (value < 0 || value >= t3) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry == null || entry === $.CTC31));
 },
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    entry = $.index(t1, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC31));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  var t4 = t1.length;
  if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2.length;
  if (t1 >= t4) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t4) throw $.ioore(t1);
  t2[t1] === $.CTC31 && this._advance$0();
  return this._nextValidIndex < t2.length;
 },
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2))) return false;
  $.index(t2, this._nextValidIndex) === $.CTC31 && this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
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
  return $.Maps_mapToString(this);
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
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_10 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true) $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
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
  this._next = null;
  this._previous = null;
  return this._element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
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
  throw $.captureStackTrace($.CTC9);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC9);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 some$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    if (f.$call$1(entry.get$_element()) === true) return true;
    entry = nextEntry;
  }
  return false;
 },
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 length$0: function() { return this.get$length().$call$0(); },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
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
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number') return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
 },
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
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
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_lib1_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 },
 start$0: function() {
  return this._lib1_start;
 },
 get$start: function() { return new $.BoundClosure(this, 'start$0'); }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!(this._next == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
 }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
 },
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 }
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.ConstantMap = {"":
 ["_lib0_keys?", "_jsObject", "length?"],
 super: "Object",
 clear$0: function() {
  return this._throwImmutable$0();
 },
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
 },
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC28);
 },
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 getValues$0: function() {
  var result = [];
  $.forEach(this._lib0_keys, new $.ConstantMap_getValues_anon(this, result));
  return result;
 },
 getKeys$0: function() {
  return this._lib0_keys;
 },
 forEach$1: function(f) {
  $.forEach(this._lib0_keys, new $.ConstantMap_forEach_anon(this, f));
 },
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true) return;
  return $.jsPropertyAccess(this._jsObject, key);
 },
 containsKey$1: function(key) {
  if (typeof key !== 'string') return this.containsKey$1$bailout(1, key);
  if (key === '__proto__') return false;
  return $.jsHasOwnProperty(this._jsObject, key);
 },
 containsKey$1$bailout: function(state, key) {
  if ($.eqB(key, '__proto__')) return false;
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
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
 start$0: function() {
  return this._start;
 },
 get$start: function() { return new $.BoundClosure(this, 'start$0'); }
};

$$.Object = {"":
 [],
 super: "",
 noSuchMethod$2: function(name$, args) {
  throw $.captureStackTrace($.NoSuchMethodException$(this, name$, args, null));
 },
 toString$0: function() {
  return $.Primitives_objectToString(this);
 },
 _lib2_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib3_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib4_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib5_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib6_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib7_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib4_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib0_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib8_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 getClosePathNodes$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getClosePathNodes', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getClosePathNodes', [arg0])
},
 removeFirst$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeFirst', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeFirst', [])
},
 _lib2_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib3_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib4_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib1_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib5_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib7_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib4_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib1_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib0_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib8_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 $dom_addEventListener$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_addEventListener', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_addEventListener', [arg0, arg1, arg2])
},
 getContext$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getContext', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getContext', [arg0])
},
 getValues$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getValues', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getValues', [])
},
 floor$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('floor', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'floor', [])
},
 truncate$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('truncate', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'truncate', [])
},
 load$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('load', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'load', [arg0, arg1])
},
 render$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('render', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'render', [])
},
 render$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('render', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'render', [arg0])
},
 render$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('render', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'render', [arg0, arg1])
},
 render$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('render', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'render', [arg0, arg1, arg2])
},
 render$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('render', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'render', [arg0, arg1, arg2, arg3])
},
 charCodeAt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('charCodeAt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'charCodeAt', [arg0])
},
 $dom_getItem$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getItem', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getItem', [arg0])
},
 isNaN$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isNaN', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isNaN', [])
},
 zeroX$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('zeroX', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'zeroX', [])
},
 mouseUpAt$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('mouseUpAt', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'mouseUpAt', [arg0, arg1])
},
 isInfinite$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isInfinite', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isInfinite', [])
},
 operator$le$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$le', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$le', [arg0])
},
 pickUpItem$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('pickUpItem', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'pickUpItem', [arg0])
},
 createPattern$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('createPattern', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'createPattern', [arg0, arg1])
},
 visitList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitList', [arg0])
},
 fillRect$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fillRect', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fillRect', [arg0, arg1, arg2, arg3])
},
 toDataURL$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toDataURL', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toDataURL', [arg0])
},
 _lib2_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib3_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib4_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib5_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib6_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib7_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib4_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib0_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib8_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 loadWalkAnimation$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('loadWalkAnimation', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'loadWalkAnimation', [arg0, arg1])
},
 blend$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('blend', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'blend', [arg0, arg1])
},
 round$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('round', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'round', [])
},
 purchaseUpgrade$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('purchaseUpgrade', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'purchaseUpgrade', [arg0, arg1])
},
 operator$div$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$div', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$div', [arg0])
},
 $dom_setItem$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_setItem', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_setItem', [arg0, arg1])
},
 _lib2_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib4_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib1_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib5_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib6_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib7_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib4_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib1_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib0_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib8_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 operator$tdiv$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$tdiv', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$tdiv', [arg0])
},
 _lib2_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib4_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib1_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib5_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib6_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib7_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib4_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib1_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib0_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib8_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 translate$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('translate', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'translate', [arg0, arg1])
},
 zero$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('zero', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'zero', [])
},
 toInt$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toInt', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toInt', [])
},
 visitWorkerSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitWorkerSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitWorkerSendPort', [arg0])
},
 visitWorkerSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitWorkerSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitWorkerSendPort', [arg0])
},
 $dom_appendChild$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_appendChild', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_appendChild', [arg0])
},
 firstMatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('firstMatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'firstMatch', [arg0])
},
 loadDeathAnimation$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('loadDeathAnimation', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'loadDeathAnimation', [arg0, arg1])
},
 webkitRequestFullscreen$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('webkitRequestFullscreen', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'webkitRequestFullscreen', [])
},
 _lib2_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib4_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib1_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib5_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib6_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib7_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib4_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib1_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib0_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib8_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 remove$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('remove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'remove', [])
},
 unpackMapPaths$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('unpackMapPaths', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'unpackMapPaths', [arg0])
},
 hasNext$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasNext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasNext', [])
},
 _lib2_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib3_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib4_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib1_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib5_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib6_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib7_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib4_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib1_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib0_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib8_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'requestAnimationFrame', [arg0])
},
 $dom_removeChild$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeChild', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeChild', [arg0])
},
 previousEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('previousEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'previousEntry', [])
},
 allMatches$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('allMatches', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'allMatches', [arg0])
},
 maybeCloseWorker$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('maybeCloseWorker', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'maybeCloseWorker', [])
},
 _lib2_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib3_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib4_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib5_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib6_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib7_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib4_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib0_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib8_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 prompt$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('prompt', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'prompt', [arg0, arg1])
},
 purchaseWeapon$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('purchaseWeapon', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'purchaseWeapon', [arg0])
},
 _lib2_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib3_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib4_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib1_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib5_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib7_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib4_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib1_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib0_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib8_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 mouseDownAt$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('mouseDownAt', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'mouseDownAt', [arg0, arg1])
},
 restore$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('restore', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'restore', [])
},
 operator$mul$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$mul', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$mul', [arg0])
},
 _lib2_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib3_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib4_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib5_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib6_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib7_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib4_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib0_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib8_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'add', [arg0])
},
 $dom_querySelector$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelector', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelector', [arg0])
},
 $dom_querySelector$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelector', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelector', [arg0])
},
 $dom_querySelector$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelector', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelector', [arg0])
},
 computeValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('computeValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'computeValue', [])
},
 contains$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('contains', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'contains', [arg0])
},
 contains$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('contains', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'contains', [arg0, arg1])
},
 getImage$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getImage', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getImage', [arg0])
},
 getImage$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getImage', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getImage', [arg0, arg1])
},
 stroke$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('stroke', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'stroke', [])
},
 endsWith$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('endsWith', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'endsWith', [arg0])
},
 clearRect$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clearRect', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clearRect', [arg0, arg1, arg2, arg3])
},
 _lib2_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib4_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib1_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib5_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib6_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib7_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib4_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib1_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib0_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib8_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 update$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('update', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'update', [])
},
 postMessage$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('postMessage', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'postMessage', [arg0])
},
 postMessage$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('postMessage', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'postMessage', [arg0, arg1])
},
 removeTag$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeTag', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeTag', [arg0])
},
 operator$shl$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$shl', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$shl', [arg0])
},
 $dom_getBoundingClientRect$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getBoundingClientRect', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getBoundingClientRect', [])
},
 _lib2_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib4_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib1_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib5_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib6_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib7_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib4_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib1_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib0_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib8_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 operator$xor$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$xor', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$xor', [arg0])
},
 clone$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clone', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clone', [])
},
 indexOf$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('indexOf', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'indexOf', [arg0])
},
 indexOf$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('indexOf', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'indexOf', [arg0, arg1])
},
 _lib2_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib4_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib1_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib5_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib6_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib7_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib4_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib1_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib0_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib8_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 operator$sub$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$sub', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$sub', [arg0])
},
 abs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('abs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'abs', [])
},
 spawnObject$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('spawnObject', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'spawnObject', [arg0, arg1])
},
 spawnObject$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('spawnObject', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'spawnObject', [arg0, arg1])
},
 setInterval$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setInterval', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setInterval', [arg0, arg1])
},
 clear$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clear', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clear', [])
},
 debugRender$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('debugRender', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'debugRender', [arg0])
},
 debugRender$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('debugRender', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'debugRender', [arg0])
},
 debugRender$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('debugRender', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'debugRender', [arg0, arg1])
},
 debugRender$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('debugRender', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'debugRender', [arg0])
},
 debugRender$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('debugRender', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'debugRender', [arg0])
},
 debugRender$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('debugRender', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'debugRender', [arg0])
},
 $dom_key$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_key', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_key', [arg0])
},
 dequeue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('dequeue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'dequeue', [])
},
 openMenu$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('openMenu', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'openMenu', [arg0])
},
 multiplyScalar$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('multiplyScalar', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'multiplyScalar', [arg0])
},
 $call$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [])
},
 $call$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0])
},
 $call$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0, arg1])
},
 $call$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0, arg1, arg2])
},
 $call$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0, arg1, arg2, arg3])
},
 forEach$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('forEach', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'forEach', [arg0])
},
 operator$indexSet$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$indexSet', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$indexSet', [arg0, arg1])
},
 subTo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('subTo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'subTo', [arg0, arg1])
},
 operator$or$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$or', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$or', [arg0])
},
 _lib2_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib4_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib1_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib5_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib6_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib7_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib4_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib1_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib0_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib8_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib2_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib4_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib1_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib5_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib6_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib7_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib4_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib1_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib0_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib8_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 collisionAt$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('collisionAt', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'collisionAt', [arg0, arg1])
},
 renderFunction$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('renderFunction', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'renderFunction', [arg0])
},
 _lib2_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib3_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib4_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib5_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib6_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib7_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib4_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib0_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib8_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib2_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib3_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib4_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib1_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib5_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib7_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib4_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib1_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib0_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib8_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib2_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib3_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib4_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib1_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib5_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib7_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib4_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib1_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib0_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib8_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib2_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib3_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib4_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib1_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib5_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib7_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib4_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib1_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib0_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib8_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 hasMatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasMatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasMatch', [arg0])
},
 operator$add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$add', [arg0])
},
 toRadixString$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toRadixString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toRadixString', [arg0])
},
 _lib2_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib3_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib4_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib1_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib5_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib7_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib4_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib1_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib0_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib8_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib2_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib3_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib4_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib1_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib5_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib6_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib7_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib4_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib1_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib8_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib2_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib3_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib4_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib5_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib6_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib7_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib4_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib0_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib8_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 loadFinish$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('loadFinish', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'loadFinish', [])
},
 setRequestHeader$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setRequestHeader', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setRequestHeader', [arg0, arg1])
},
 removeRange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeRange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeRange', [arg0, arg1])
},
 setTransform$6: function (arg0, arg1, arg2, arg3, arg4, arg5) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setTransform', [arg0, arg1, arg2, arg3, arg4, arg5])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setTransform', [arg0, arg1, arg2, arg3, arg4, arg5])
},
 splitChars$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('splitChars', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'splitChars', [])
},
 _lib2_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib3_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib4_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib1_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib5_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib6_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib7_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib4_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib1_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib0_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib8_open2$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open2', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open2', [arg0, arg1])
},
 _lib2_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib3_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib4_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib5_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib6_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib7_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib4_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib0_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib8_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 measureText$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('measureText', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'measureText', [arg0])
},
 loadThrustAnimation$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('loadThrustAnimation', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'loadThrustAnimation', [arg0, arg1])
},
 _lib2_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib3_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib4_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib1_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib5_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib6_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib7_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib4_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib1_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib0_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib8_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 split$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('split', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'split', [arg0])
},
 drawImage$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawImage', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawImage', [arg0, arg1, arg2])
},
 _lib2_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib4_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib1_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib5_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib6_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib7_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib4_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib1_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib0_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib8_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 loadProperties$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('loadProperties', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'loadProperties', [arg0])
},
 loadProperties$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('loadProperties', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'loadProperties', [arg0])
},
 send$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('send', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'send', [])
},
 hashCode$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hashCode', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hashCode', [])
},
 lineTo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('lineTo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'lineTo', [arg0, arg1])
},
 addTo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addTo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addTo', [arg0, arg1])
},
 startCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('startCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'startCycle', [arg0])
},
 collisionAtVec2$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('collisionAtVec2', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'collisionAtVec2', [arg0])
},
 moveTo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('moveTo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'moveTo', [arg0, arg1])
},
 hurt$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hurt', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hurt', [arg0, arg1])
},
 say$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('say', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'say', [arg0])
},
 say$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('say', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'say', [arg0, arg1])
},
 visitSendPortSync$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPortSync', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPortSync', [arg0])
},
 cleanup$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('cleanup', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'cleanup', [])
},
 startsWith$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('startsWith', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'startsWith', [arg0])
},
 closePath$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('closePath', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'closePath', [])
},
 toUpperCase$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toUpperCase', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toUpperCase', [])
},
 distanceTo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('distanceTo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'distanceTo', [arg0])
},
 key$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('key', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'key', [arg0])
},
 save$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('save', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'save', [])
},
 fireTagEvent$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fireTagEvent', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fireTagEvent', [arg0])
},
 clickAt$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clickAt', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clickAt', [arg0, arg1])
},
 $dom_getElementById$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getElementById', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getElementById', [arg0])
},
 trim$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('trim', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'trim', [])
},
 preventDefault$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('preventDefault', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'preventDefault', [])
},
 open$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('open', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'open', [arg0, arg1])
},
 open$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('open', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'open', [arg0, arg1, arg2])
},
 lastEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('lastEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'lastEntry', [])
},
 setKey$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setKey', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setKey', [arg0, arg1])
},
 renderCoins$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('renderCoins', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'renderCoins', [arg0])
},
 length$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'length', [])
},
 length$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'length', [])
},
 _lib2_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib4_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib1_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib5_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib6_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib7_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib4_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib1_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib0_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib8_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 process$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('process', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'process', [])
},
 normalize$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('normalize', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'normalize', [])
},
 containsKey$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('containsKey', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'containsKey', [arg0])
},
 complete$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('complete', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'complete', [arg0])
},
 beginPath$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('beginPath', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'beginPath', [])
},
 divideScalar$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('divideScalar', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'divideScalar', [arg0])
},
 divideScalar$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('divideScalar', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'divideScalar', [arg0])
},
 last$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('last', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'last', [])
},
 _lib2_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib3_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib4_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib5_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib6_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib7_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib4_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib0_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib8_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 cycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('cycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'cycle', [arg0])
},
 addObject$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addObject', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addObject', [arg0])
},
 $dom_createElement$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_createElement', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_createElement', [arg0])
},
 next$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'next', [])
},
 operator$ge$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$ge', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$ge', [arg0])
},
 scale$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('scale', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'scale', [arg0, arg1])
},
 fin$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fin', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fin', [])
},
 _lib2_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib3_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib4_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib1_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib5_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib6_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib7_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib4_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib1_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib0_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib8_open3$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_open3', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '_open3', [arg0, arg1, arg2])
},
 _lib2_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib3_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib4_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib1_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib5_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib7_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib4_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib1_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib0_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib8_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib2_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib3_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib4_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib1_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib5_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib7_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib4_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib1_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib0_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib8_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib2_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib4_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib1_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib5_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib6_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib7_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib4_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib1_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib0_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib8_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 prepend$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('prepend', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'prepend', [arg0])
},
 toDouble$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toDouble', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toDouble', [])
},
 runIteration$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('runIteration', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'runIteration', [])
},
 runIteration$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('runIteration', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'runIteration', [])
},
 generateTileChunk$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('generateTileChunk', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'generateTileChunk', [arg0, arg1])
},
 completeException$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('completeException', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'completeException', [arg0])
},
 action$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('action', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'action', [])
},
 operator$negate$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$negate', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$negate', [])
},
 damageBubble$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('damageBubble', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'damageBubble', [arg0, arg1, arg2, arg3])
},
 run$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('run', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'run', [])
},
 fill$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fill', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fill', [])
},
 _lib2_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib4_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib1_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib5_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib6_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib7_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib4_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib1_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib0_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib8_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 getItemImage$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getItemImage', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getItemImage', [arg0])
},
 _lib2_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib7_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib2_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib7_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib2_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib7_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 visitPrimitive$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitPrimitive', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitPrimitive', [arg0])
},
 $dom_getClientRects$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getClientRects', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getClientRects', [])
},
 _lib2_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib4_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib1_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib5_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib6_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib7_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib4_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib1_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib0_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib8_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 query$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('query', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'query', [arg0])
},
 unpackMapObjects$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('unpackMapObjects', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'unpackMapObjects', [arg0])
},
 distanceToSquared$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('distanceToSquared', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'distanceToSquared', [arg0])
},
 unpackObjects$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('unpackObjects', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'unpackObjects', [arg0])
},
 getDirection$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getDirection', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getDirection', [])
},
 zeroY$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('zeroY', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'zeroY', [])
},
 clearInterval$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clearInterval', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clearInterval', [arg0])
},
 addLast$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addLast', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addLast', [arg0])
},
 webkitCancelFullScreen$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('webkitCancelFullScreen', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'webkitCancelFullScreen', [])
},
 hasTag$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasTag', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasTag', [arg0])
},
 _lib2_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib3_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib4_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib1_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib5_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib7_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib4_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib1_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib0_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib8_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 sortScreenObjects$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('sortScreenObjects', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'sortScreenObjects', [])
},
 loadSlashAnimation$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('loadSlashAnimation', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'loadSlashAnimation', [arg0, arg1])
},
 group$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('group', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'group', [arg0])
},
 group$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('group', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'group', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 operator$mod$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$mod', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$mod', [arg0])
},
 $dom_replaceChild$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_replaceChild', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_replaceChild', [arg0, arg1])
},
 lengthSq$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('lengthSq', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'lengthSq', [])
},
 operator$lt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$lt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$lt', [arg0])
},
 fmtCollisionMap$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fmtCollisionMap', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fmtCollisionMap', [arg0])
},
 some$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('some', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'some', [arg0])
},
 getPropertyValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getPropertyValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getPropertyValue', [arg0])
},
 increaseDifficulty$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('increaseDifficulty', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'increaseDifficulty', [])
},
 increaseDifficulty$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('increaseDifficulty', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'increaseDifficulty', [arg0])
},
 increaseDifficulty$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('increaseDifficulty', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'increaseDifficulty', [])
},
 $dom_clear$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_clear', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_clear', [])
},
 concat$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('concat', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'concat', [arg0])
},
 markForRemoval$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('markForRemoval', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'markForRemoval', [])
},
 loadShootAnimation$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('loadShootAnimation', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'loadShootAnimation', [arg0, arg1])
},
 operator$and$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$and', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$and', [arg0])
},
 set$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set', [arg0, arg1])
},
 removeLast$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeLast', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeLast', [])
},
 _lib2_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib4_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib1_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib5_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib6_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib7_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib4_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib1_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib0_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib8_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib2_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib3_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib4_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib5_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib6_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib7_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib4_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib0_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib8_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 operator$gt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$gt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$gt', [arg0])
},
 _lib2_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib4_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib1_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib5_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib6_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib7_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib4_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib1_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib0_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib8_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 initGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('initGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'initGlobals', [])
},
 fillText$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fillText', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fillText', [arg0, arg1, arg2])
},
 setProperty$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setProperty', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setProperty', [arg0, arg1])
},
 setProperty$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setProperty', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setProperty', [arg0, arg1, arg2])
},
 _lib2_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib3_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib4_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib1_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib5_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib6_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib7_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib4_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib1_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib0_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib8_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 mouseAt$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('mouseAt', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'mouseAt', [arg0, arg1])
},
 _lib2_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib3_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib4_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib5_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib6_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib7_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib4_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib0_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib8_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 isEmpty$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isEmpty', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isEmpty', [])
},
 loadMap$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('loadMap', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'loadMap', [arg0, arg1])
},
 giveCoin$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('giveCoin', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'giveCoin', [arg0, arg1])
},
 ceil$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('ceil', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'ceil', [])
},
 visitNativeJsSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitNativeJsSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitNativeJsSendPort', [arg0])
},
 visitNativeJsSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitNativeJsSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitNativeJsSendPort', [arg0])
},
 strokeRect$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('strokeRect', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'strokeRect', [arg0, arg1, arg2, arg3])
},
 setTimeout$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setTimeout', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setTimeout', [arg0, arg1])
},
 rect$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('rect', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'rect', [arg0, arg1, arg2, arg3])
},
 operator$shr$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$shr', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$shr', [arg0])
},
 at$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('at', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'at', [arg0, arg1])
},
 renderSaved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('renderSaved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'renderSaved', [arg0])
},
 eval$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('eval', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'eval', [arg0])
},
 reset$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('reset', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'reset', [])
},
 substring$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('substring', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'substring', [arg0])
},
 substring$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('substring', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'substring', [arg0, arg1])
},
 iterator$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('iterator', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'iterator', [])
},
 play$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('play', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'play', [])
},
 play$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('play', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'play', [arg0])
},
 visitMap$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitMap', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitMap', [arg0])
},
 getKeys$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getKeys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getKeys', [])
},
 sub$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('sub', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'sub', [arg0])
},
 visitSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPort', [arg0])
},
 visitSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPort', [arg0])
},
 visitSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPort', [arg0])
},
 visitBufferingSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitBufferingSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitBufferingSendPort', [arg0])
},
 visitBufferingSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitBufferingSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitBufferingSendPort', [arg0])
},
 get$_lib2_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib3_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib4_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib1_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib5_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib7_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib4_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib1_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib0_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib8_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib2_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib3_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib4_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib5_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib6_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib7_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib4_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib0_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib8_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$isWorker: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isWorker', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isWorker', [])
},
 get$audioElements: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get audioElements', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get audioElements', [])
},
 get$key: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get key', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get key', [])
},
 get$y: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get y', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get y', [])
},
 get$readyState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get readyState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get readyState', [])
},
 get$$$dom_scrollWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_scrollWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_scrollWidth', [])
},
 get$dayCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get dayCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get dayCount', [])
},
 get$g: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get g', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get g', [])
},
 get$_lib2_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib4_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib1_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib5_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib6_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib7_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib4_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib1_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib0_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib8_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$load: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get load', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get load', [])
},
 get$pathnodes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get pathnodes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get pathnodes', [])
},
 get$dataTree: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get dataTree', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get dataTree', [])
},
 get$$$dom_scrollLeft: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_scrollLeft', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_scrollLeft', [])
},
 get$touches: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get touches', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get touches', [])
},
 get$ZOMBIE_SPEED: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ZOMBIE_SPEED', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ZOMBIE_SPEED', [])
},
 get$attackTime: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get attackTime', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get attackTime', [])
},
 get$width: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get width', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get width', [])
},
 get$_lib2_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib3_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib4_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib1_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib5_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib7_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib4_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib1_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib0_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib8_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$mouseUp: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mouseUp', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mouseUp', [])
},
 get$webkitIsFullScreen: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get webkitIsFullScreen', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get webkitIsFullScreen', [])
},
 get$rootContext: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get rootContext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get rootContext', [])
},
 get$awakePopulation: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get awakePopulation', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get awakePopulation', [])
},
 get$fromCommandLine: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get fromCommandLine', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get fromCommandLine', [])
},
 get$length: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get length', [])
},
 get$time: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get time', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get time', [])
},
 get$currentManagerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentManagerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentManagerId', [])
},
 get$paused: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get paused', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get paused', [])
},
 get$$$dom_offsetWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_offsetWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_offsetWidth', [])
},
 get$alive: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get alive', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get alive', [])
},
 get$context: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get context', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get context', [])
},
 get$_lib2_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib3_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib4_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib5_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib6_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib7_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib4_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib0_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib8_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$weaponName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get weaponName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get weaponName', [])
},
 get$animatedZoom: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get animatedZoom', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get animatedZoom', [])
},
 get$innerHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get innerHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get innerHeight', [])
},
 get$cycle: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get cycle', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get cycle', [])
},
 get$prop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get prop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get prop', [])
},
 get$weaponAttackTypes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get weaponAttackTypes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get weaponAttackTypes', [])
},
 get$objects: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get objects', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get objects', [])
},
 get$mouseMove: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mouseMove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mouseMove', [])
},
 get$mouse_position: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mouse_position', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mouse_position', [])
},
 get$attackRadius: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get attackRadius', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get attackRadius', [])
},
 get$value: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get value', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get value', [])
},
 get$keyCode: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get keyCode', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get keyCode', [])
},
 get$left: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get left', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get left', [])
},
 get$navigator: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get navigator', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get navigator', [])
},
 get$exceptionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get exceptionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get exceptionName', [])
},
 get$AGRO_DISTANCE: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get AGRO_DISTANCE', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get AGRO_DISTANCE', [])
},
 get$useWorkers: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get useWorkers', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get useWorkers', [])
},
 get$menuInterfaces: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get menuInterfaces', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get menuInterfaces', [])
},
 get$$$dom_scrollTop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_scrollTop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_scrollTop', [])
},
 get$offscene: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get offscene', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get offscene', [])
},
 get$status: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get status', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get status', [])
},
 get$_lib2_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib3_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib4_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib5_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib6_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib7_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib4_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib0_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib8_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$tag: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get tag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get tag', [])
},
 get$ZOMBIE_DAMAGE: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ZOMBIE_DAMAGE', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ZOMBIE_DAMAGE', [])
},
 get$id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get id', [])
},
 get$weaponDamage: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get weaponDamage', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get weaponDamage', [])
},
 get$sayTime: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get sayTime', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get sayTime', [])
},
 get$dayLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get dayLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get dayLength', [])
},
 get$needSerialization: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get needSerialization', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get needSerialization', [])
},
 get$topEventLoop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get topEventLoop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get topEventLoop', [])
},
 get$touchStart: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get touchStart', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get touchStart', [])
},
 get$touchEnd: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get touchEnd', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get touchEnd', [])
},
 get$changedTouches: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get changedTouches', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get changedTouches', [])
},
 get$currentFrame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentFrame', [])
},
 get$type: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get type', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get type', [])
},
 get$attackType: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get attackType', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get attackType', [])
},
 get$attackDirection: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get attackDirection', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get attackDirection', [])
},
 get$distance: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get distance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get distance', [])
},
 get$_lib2_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib3_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib4_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib5_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib6_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib7_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib4_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib0_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib8_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$onscene: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get onscene', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get onscene', [])
},
 get$height: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get height', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get height', [])
},
 get$paths: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get paths', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get paths', [])
},
 get$renderConfirmMenu: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get renderConfirmMenu', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get renderConfirmMenu', [])
},
 get$zoom: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get zoom', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get zoom', [])
},
 get$health: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get health', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get health', [])
},
 get$armor: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get armor', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get armor', [])
},
 get$anim: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get anim', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get anim', [])
},
 get$zombies_killed: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get zombies_killed', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get zombies_killed', [])
},
 get$message: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get message', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get message', [])
},
 get$weaponAttackTime: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get weaponAttackTime', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get weaponAttackTime', [])
},
 get$pageX: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get pageX', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get pageX', [])
},
 get$style: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get style', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get style', [])
},
 get$currentAttackTime: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentAttackTime', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentAttackTime', [])
},
 get$currentWeapon: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentWeapon', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentWeapon', [])
},
 get$_lib2_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib3_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib4_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib1_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib5_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib7_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib4_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib1_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib0_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib8_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib2_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib3_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib4_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib1_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib5_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib6_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib7_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib4_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib1_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib0_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib8_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$currentMapTree: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentMapTree', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentMapTree', [])
},
 get$player_max_health: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get player_max_health', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get player_max_health', [])
},
 get$$$dom_offsetHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_offsetHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_offsetHeight', [])
},
 get$on: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get on', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get on', [])
},
 get$_lib2_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib3_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib4_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib1_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib5_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib7_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib4_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib1_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib0_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib8_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$ignoreCase: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ignoreCase', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ignoreCase', [])
},
 get$markedForRemoval: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get markedForRemoval', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get markedForRemoval', [])
},
 get$weaponCost: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get weaponCost', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get weaponCost', [])
},
 get$$$dom_length: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_length', [])
},
 get$_lib2_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib3_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib4_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib1_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib5_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib7_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib4_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib1_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib0_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib8_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$onClick: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get onClick', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get onClick', [])
},
 get$responseText: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get responseText', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get responseText', [])
},
 get$top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get top', [])
},
 get$b: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get b', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get b', [])
},
 get$uiImages: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get uiImages', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get uiImages', [])
},
 get$mouseDown: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mouseDown', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mouseDown', [])
},
 get$canvas: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get canvas', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get canvas', [])
},
 get$ports: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ports', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ports', [])
},
 get$coin: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get coin', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get coin', [])
},
 get$isolates: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isolates', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isolates', [])
},
 get$renderOptionsMenu: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get renderOptionsMenu', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get renderOptionsMenu', [])
},
 get$keyDown: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get keyDown', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get keyDown', [])
},
 get$start: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get start', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get start', [])
},
 get$body: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get body', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get body', [])
},
 get$mainManager: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mainManager', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mainManager', [])
},
 get$error: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get error', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get error', [])
},
 get$element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get element', [])
},
 get$keyUp: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get keyUp', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get keyUp', [])
},
 get$house: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get house', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get house', [])
},
 get$player: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get player', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get player', [])
},
 get$set: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get set', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get set', [])
},
 get$velocity: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get velocity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get velocity', [])
},
 get$$$dom_clientHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_clientHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_clientHeight', [])
},
 get$path: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get path', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get path', [])
},
 get$nextIsolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get nextIsolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get nextIsolateId', [])
},
 get$tags: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get tags', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get tags', [])
},
 get$weaponCost2: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get weaponCost2', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get weaponCost2', [])
},
 get$onKeyPress: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get onKeyPress', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get onKeyPress', [])
},
 get$frameMapIndex: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get frameMapIndex', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get frameMapIndex', [])
},
 get$animation: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get animation', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get animation', [])
},
 get$globalAlpha: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get globalAlpha', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get globalAlpha', [])
},
 get$hasValue: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get hasValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get hasValue', [])
},
 get$speaking: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get speaking', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get speaking', [])
},
 get$$$dom_offsetLeft: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_offsetLeft', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_offsetLeft', [])
},
 get$touchMove: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get touchMove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get touchMove', [])
},
 get$totalPopulation: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get totalPopulation', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get totalPopulation', [])
},
 get$exception: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get exception', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get exception', [])
},
 get$pattern: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get pattern', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get pattern', [])
},
 get$completer: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get completer', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get completer', [])
},
 get$innerWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get innerWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get innerWidth', [])
},
 get$currentContext: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentContext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentContext', [])
},
 get$saved: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get saved', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get saved', [])
},
 get$attacking: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get attacking', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get attacking', [])
},
 get$ZOMBIE_ARMOR: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ZOMBIE_ARMOR', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ZOMBIE_ARMOR', [])
},
 get$future: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get future', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get future', [])
},
 get$damage: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get damage', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get damage', [])
},
 get$r: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get r', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get r', [])
},
 get$speed: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get speed', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get speed', [])
},
 get$userAgent: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get userAgent', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get userAgent', [])
},
 get$x: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get x', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get x', [])
},
 get$pageY: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get pageY', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get pageY', [])
},
 get$playerWeapons: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get playerWeapons', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get playerWeapons', [])
},
 get$_lib2_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib3_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib4_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib5_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib6_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib7_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib4_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib0_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib8_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$$$dom_clientWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_clientWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_clientWidth', [])
},
 get$multiLine: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get multiLine', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get multiLine', [])
},
 get$$$dom_clientLeft: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_clientLeft', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_clientLeft', [])
},
 get$$$dom_clientTop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_clientTop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_clientTop', [])
},
 get$$$dom_offsetTop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_offsetTop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_offsetTop', [])
},
 get$points: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get points', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get points', [])
},
 get$zombie_max: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get zombie_max', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get zombie_max', [])
},
 get$parent: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get parent', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get parent', [])
},
 get$readyStateChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get readyStateChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get readyStateChange', [])
},
 get$p: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get p', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get p', [])
},
 get$isComplete: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isComplete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isComplete', [])
},
 get$_lib2_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib3_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib4_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib1_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib5_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib7_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib4_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib1_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib0_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib8_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$$$dom_scrollHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_scrollHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_scrollHeight', [])
},
 set$currentWeapon: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set currentWeapon', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set currentWeapon', [arg0])
},
 set$player_max_health: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set player_max_health', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set player_max_health', [arg0])
},
 set$y: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set y', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set y', [arg0])
},
 set$g: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set g', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set g', [arg0])
},
 set$dayCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set dayCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set dayCount', [arg0])
},
 set$background: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set background', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set background', [arg0])
},
 set$cursor: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set cursor', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set cursor', [arg0])
},
 set$currentOrientation: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set currentOrientation', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set currentOrientation', [arg0])
},
 set$attackTime: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set attackTime', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set attackTime', [arg0])
},
 set$width: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set width', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set width', [arg0])
},
 set$top: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set top', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set top', [arg0])
},
 set$uiImages: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set uiImages', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set uiImages', [arg0])
},
 set$b: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set b', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set b', [arg0])
},
 set$rootContext: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set rootContext', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set rootContext', [arg0])
},
 set$awakePopulation: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set awakePopulation', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set awakePopulation', [arg0])
},
 set$mouseDown: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set mouseDown', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set mouseDown', [arg0])
},
 set$length: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set length', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set length', [arg0])
},
 set$time: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set time', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set time', [arg0])
},
 set$coin: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set coin', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set coin', [arg0])
},
 set$paused: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set paused', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set paused', [arg0])
},
 set$text: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set text', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set text', [arg0])
},
 set$_lib2_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib3_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib4_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib5_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib6_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib7_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib4_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib0_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib8_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$nextIsolateId: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set nextIsolateId', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set nextIsolateId', [arg0])
},
 set$animation: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set animation', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set animation', [arg0])
},
 set$value: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set value', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set value', [arg0])
},
 set$position: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set position', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set position', [arg0])
},
 set$weaponAnimation: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set weaponAnimation', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set weaponAnimation', [arg0])
},
 set$left: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set left', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set left', [arg0])
},
 set$globalAlpha: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set globalAlpha', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set globalAlpha', [arg0])
},
 set$speaking: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set speaking', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set speaking', [arg0])
},
 set$font: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set font', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set font', [arg0])
},
 set$itemImages: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set itemImages', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set itemImages', [arg0])
},
 set$fin: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set fin', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set fin', [arg0])
},
 set$totalPopulation: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set totalPopulation', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set totalPopulation', [arg0])
},
 set$exception: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set exception', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set exception', [arg0])
},
 set$sayTime: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set sayTime', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set sayTime', [arg0])
},
 set$textAlign: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set textAlign', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set textAlign', [arg0])
},
 set$src: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set src', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set src', [arg0])
},
 set$dayLength: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set dayLength', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set dayLength', [arg0])
},
 set$intro: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set intro', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set intro', [arg0])
},
 set$strokeStyle: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set strokeStyle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set strokeStyle', [arg0])
},
 set$saved: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set saved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set saved', [arg0])
},
 set$attacking: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set attacking', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set attacking', [arg0])
},
 set$attackType: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set attackType', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set attackType', [arg0])
},
 set$credits: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set credits', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set credits', [arg0])
},
 set$type: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set type', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set type', [arg0])
},
 set$currentFrame: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set currentFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set currentFrame', [arg0])
},
 set$attackDirection: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set attackDirection', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set attackDirection', [arg0])
},
 set$r: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set r', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set r', [arg0])
},
 set$speed: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set speed', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set speed', [arg0])
},
 set$_lib2_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib3_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib4_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib5_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib6_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib7_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib4_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib0_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib8_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$x: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set x', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set x', [arg0])
},
 set$lineWidth: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set lineWidth', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set lineWidth', [arg0])
},
 set$damage: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set damage', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set damage', [arg0])
},
 set$distance: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set distance', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set distance', [arg0])
},
 set$lineCap: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set lineCap', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set lineCap', [arg0])
},
 set$currentContext: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set currentContext', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set currentContext', [arg0])
},
 set$height: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set height', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set height', [arg0])
},
 set$health: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set health', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set health', [arg0])
},
 set$zoom: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set zoom', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set zoom', [arg0])
},
 set$armor: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set armor', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set armor', [arg0])
},
 set$zombie_max: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set zombie_max', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set zombie_max', [arg0])
},
 set$creditsImage: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set creditsImage', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set creditsImage', [arg0])
},
 set$anim: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set anim', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set anim', [arg0])
},
 set$zombies_killed: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set zombies_killed', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set zombies_killed', [arg0])
},
 set$active: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set active', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set active', [arg0])
},
 set$currentAttackTime: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set currentAttackTime', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set currentAttackTime', [arg0])
},
 set$fillStyle: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set fillStyle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set fillStyle', [arg0])
}
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
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
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
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
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = sb.toString$0();
      sb = $.StringBufferImpl$('');
      for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = sb.toString$0();
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
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
  if (t1 == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
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

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
 }
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
 }
};

$$.Game = {"":
 ["context?", "canvas?"],
 super: "Object",
 loadFinish$0: function() {
  $.world.startCycle$1(this.context);
 },
 Game$0: function() {
  $.niceFactor = 0;
  $.rpatCount = $.toInt($.mul($.Math_random(), 64));
  $.classMap = $.makeLiteralMap(['spawn', new $.anon2(), 'avatar', new $.anon3(), 'node', new $.anon4(), 'arrow', new $.anon5(), 'floating_text', new $.anon6()]);
  $.tagEvents = $.makeLiteralMap(['citizen', $.makeLiteralMap(['init', new $.anon7(), 'update', new $.anon8(), 'hit', new $.anon9(), 'die', new $.anon10(), 'collide', new $.anon11()]), 'player', $.makeLiteralMap(['init', new $.anon12(), 'die', new $.anon13(), 'decomposed', new $.anon14(this), 'update', new $.anon15()]), 'scared', $.makeLiteralMap(['init', new $.anon16(), 'update', new $.anon17()]), 'traveler', $.makeLiteralMap(['init', new $.anon18(), 'collide', new $.anon19(), 'update', new $.anon20()]), 'homebound', $.makeLiteralMap(['init', new $.anon21(), 'update', new $.anon22(), 'collide', new $.anon23()]), 'lost', $.makeLiteralMap(['update', new $.anon24()]), 'corpse', $.makeLiteralMap(['init', new $.anon25(), 'update', new $.anon26()]), 'following', $.makeLiteralMap(['update', new $.anon27()]), 'wander', $.makeLiteralMap(['collide', new $.anon28(), 'init', new $.anon29(), 'update', new $.anon30()]), 'nice', $.makeLiteralMap(['init', new $.anon31(), 'update', new $.anon32()]), 'mean', $.makeLiteralMap(['init', new $.anon33(), 'update', new $.anon34()]), 'salesman', $.makeLiteralMap(['update', new $.anon35()]), 'arrow', $.makeLiteralMap(['update', new $.anon36()]), 'zombie', $.makeLiteralMap(['init', new $.anon37(), 'die', new $.anon38()]), 'hostile-wander', $.makeLiteralMap(['init', new $.anon39(), 'update', new $.anon40(), 'collide', new $.anon41(), 'hit', new $.anon42()]), 'hostile', $.makeLiteralMap(['update', new $.anon43(), 'kill', new $.anon44(), 'hit', new $.anon45()]), 'nestbound', $.makeLiteralMap(['init', new $.anon46(), 'update', new $.anon47(), 'collide', new $.anon48()]), 'floating_text', $.makeLiteralMap(['update', new $.anon49()])]);
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'Notification'}));
  $.notifications = t1;
  $.BLANK_IMAGE = $._Elements_ImageElement(null, null, null);
  t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'Avatar'}));
  var t2 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t2, ({E: 'Avatar'}));
  var t3 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t3, ({E: 'Avatar'}));
  var t4 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t4, ({E: 'Avatar'}));
  $.tags = $.makeLiteralMap(['zombie', t1, 'corpse', t2, 'wander', t3, 'lost', t4]);
  $.tagMap = $.tags;
  $.audio = $.AudioManager$();
  $.animationMap = $.HashMapImplementation$();
  this.canvas = $.document().query$1('#canvas');
  var t5 = this.canvas;
  t5.set$width(800);
  t5.set$height(450);
  this.context = t5.getContext$1('2d');
  $.SCREEN_WIDTH = t5.get$width();
  $.SCREEN_HEIGHT = t5.get$height();
  $.event = $.UIManager$();
  $.RENDER_DISTANCE = $.toInt($.div($.mul($.add($.SCREEN_WIDTH, $.SCREEN_HEIGHT), 2), 4));
  $.world = $.World$();
  $.print('Loading World');
  $.web_load('game.json', new $.anon50(this));
 }
};

$$.MainMenu = {"":
 ["credits!", "anim=", "dy", "dx", "active!", "fin!", "creditsImage!", "background!", "title", "context?", "canvas?"],
 super: "Object",
 render$0: function() {
  var t1 = ({});
  var t2 = this.context;
  t2.save$0();
  var t3 = this.dx;
  var t4 = $.event.get$mouse_position().get$x();
  var t5 = this.canvas;
  this.dx = $.sub(t3, $.div($.sub(t3, $.sub($.mul($.div($.sub(t4, $.div(t5.get$width(), 2)), t5.get$width()), $.sub(this.background.get$width(), t5.get$width())), $.div($.sub(this.background.get$width(), t5.get$width()), 2))), 10));
  var t6 = this.dy;
  this.dy = $.sub(t6, $.div($.sub(t6, $.sub($.mul($.div($.sub($.event.get$mouse_position().get$y(), $.div(t5.get$height(), 2)), t5.get$height()), $.sub(this.background.get$height(), t5.get$height())), $.div($.sub(this.background.get$height(), t5.get$height()), 2))), 10));
  t2.drawImage$3(this.background, this.dx, this.dy);
  var t7 = this.title;
  var t8 = $.div(t7.get$width(), 2);
  if (typeof t8 !== 'number') throw $.iae(t8);
  t2.drawImage$3(t7, 250 - t8, 75);
  t1.ypos_5 = 200;
  t1.i_6 = 0;
  $.document().get$body().get$style().set$cursor('default');
  t3 = this.credits === true;
  t4 = this.anim;
  if (t3) {
    if ($.ltB($.index(t4, 4), 1)) {
      t3 = this.anim;
      t5 = $.add($.index(t3, 4), 0.05);
      $.indexSet(t3, 4, t5);
      t3 = t5;
    } else t3 = 1;
    $.indexSet(t4, 4, t3);
    if ($.event.get$mouseDown() === true) {
      this.credits = false;
      $.event.set$mouseDown(false);
    }
  } else {
    if ($.gtB($.index(t4, 4), 0)) {
      t3 = this.anim;
      t5 = $.sub($.index(t3, 4), 0.05);
      $.indexSet(t3, 4, t5);
      t3 = t5;
    } else t3 = 0;
    $.indexSet(t4, 4, t3);
  }
  t2.set$globalAlpha($.index(this.anim, 4));
  t2.drawImage$3(this.creditsImage, 75, 75);
  t3 = $.index(this.anim, 4);
  if (typeof t3 !== 'number') throw $.iae(t3);
  t2.set$globalAlpha(1 - t3);
  $.forEach(['Play', 'Dev Mode', 'Long Night', 'Credits'], new $.MainMenu_render_anon(t1, 240, 650, 50, this));
  t2.restore$0();
 },
 cycle$1: function(a) {
  if (this.active === true) {
    $.window().requestAnimationFrame$1(this.get$cycle());
    this.render$0();
  } else this.fin$0();
 },
 get$cycle: function() { return new $.BoundClosure0(this, 'cycle$1'); },
 fin$0: function() { return this.fin.$call$0(); },
 MainMenu$0: function() {
  this.canvas = $.document().query$1('#canvas');
  var t1 = this.canvas;
  t1.set$width(800);
  t1.set$height(450);
  this.context = t1.getContext$1('2d');
  var t2 = this.context;
  t2.save$0();
  t2.set$fillStyle('#000');
  t2.fillRect$4(0, 0, t1.get$width(), t1.get$height());
  t2.set$fillStyle('#fff');
  t2.set$font('36px Arial');
  t2.set$textAlign('center');
  t2.fillText$3('Loading Big Island', $.div(t1.get$width(), 2), $.div(t1.get$height(), 2));
  t2.restore$0();
  this.title = $.res_loadImage('big_island_lpc.png', new $.anon(this));
 }
};

$$.PathNode = {"":
 ["start?", "house?", "path?", "y", "x"],
 super: "Vec2"
};

$$.Path = {"":
 ["points?", "end", "start?"],
 super: "Object",
 Path$5: function(s, e, points, houseStart, houseEnd) {
  this.start = $.PathNode$fromVec2(s, this, houseStart, true);
  this.end = $.PathNode$fromVec2(e, this, houseEnd, false);
 }
};

$$.GameObject = {"":
 ["markedForRemoval?", "type=", "id?", "prop?", "tags?", "y", "x"],
 super: "Vec2",
 removeTag$1: function(tag) {
  var index = $.indexOf$1(this.tags, tag);
  if (typeof index !== 'number') return this.removeTag$1$bailout(1, index);
  !(index === -1) && $.removeRange(this.tags, index, 1);
 },
 removeTag$1$bailout: function(state, index) {
  !$.eqB(index, -1) && $.removeRange(this.tags, index, 1);
 },
 hasTag$1: function(tag) {
  var t1 = $.indexOf$1(this.tags, tag);
  if (typeof t1 !== 'number') return this.hasTag$1$bailout(1, t1);
  return !(t1 === -1);
 },
 hasTag$1$bailout: function(state, t1) {
  return !$.eqB(t1, -1);
 },
 remove$0: function() {
  $.forEach(this.tags, new $.GameObject_remove_anon(this));
  var onscene = $.world.get$onscene();
  var offscene = $.world.get$offscene();
  var objects = $.world.get$objects();
  var index = $.indexOf$1(onscene, this);
  if (!$.eqB(index, -1)) $.removeRange(onscene, index, 1);
  else {
    index = $.indexOf$1(offscene, this);
    !$.eqB(index, -1) && $.removeRange(offscene, index, 1);
  }
  index = $.indexOf$1(objects, this);
  !$.eqB(index, -1) && $.removeRange(objects, index, 1);
 },
 markForRemoval$0: function() {
  this.markedForRemoval = true;
  this.tags = [];
  this.remove$0();
 },
 fireTagEvent$1: function(event$) {
  $.forEach(this.tags, new $.GameObject_fireTagEvent_anon(this, event$));
 },
 debugRender$2: function(c, sep) {
  if ($.DEBUG === true) {
    c.set$fillStyle('#fff');
    var string = '(' + $.S($.div($.toInt($.mul(this.x, 10)), 10.0)) + ',' + $.S($.div($.toInt($.mul(this.y, 10)), 10.0)) + ')';
    if (typeof sep !== 'number') throw $.iae(sep);
    c.fillText$3(string, 0, -0.5 * sep + 10);
    c.fillText$3($.toString(this.tags), 0, 0.5 * sep + 10);
  }
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
      if ($.endsWith(v, ']') === true) {
        var vparts = $.split(v, '[');
        var nparts = $.split($.index(vparts, 1), '-');
        var lowest = $.Math_parseInt($.index(nparts, 0));
        var highest = $.add($.Math_parseInt($.substring$2($.index(nparts, 1), 0, $.sub($.get$length($.index(nparts, 1)), 1))), 1);
        v = $.S($.index(vparts, 0)) + $.S($.toInt($.add($.mul($.Math_random(), $.sub(highest, lowest)), lowest)));
      }
      this.animation = $.index($.animationMap, v);
      break;
    case 'type':
      break;
    case 'imageIndex':
      this.image = $.world.getItemImage$1(v);
      break;
    case 'tag':
      $.forEach(v, new $.GameObject_setProperty_anon(this));
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
  $.forEach(properties, new $.GameObject_loadProperties_anon(this));
 },
 operator$index$1: function(k) {
  return $.index(this.prop, k);
 },
 operator$indexSet$2: function(k, v) {
  $.indexSet(this.prop, k, v);
 },
 GameObject$3: function(a, xx, yy) {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this.tags = t1;
  this.prop = $.HashMapImplementation$();
  this.loadProperties$1(a);
 }
};

$$.FloatingText = {"":
 ["time=", "markedForRemoval", "type", "id", "prop", "tags", "y", "x"],
 super: "GameObject",
 render$1: function(c) {
  c.save$0();
  c.translate$2(this.x, this.y);
  this.debugRender$1(c);
  var t1 = this.time;
  if (typeof t1 !== 'number') return this.render$1$bailout(1, c, t1);
  c.set$globalAlpha(1 - t1 / 150);
  c.set$font('14px Arial');
  c.set$fillStyle('yellow');
  c.set$textAlign('center');
  c.fillText$3(this.prop.operator$index$1('text'), 0, 0);
  c.restore$0();
 },
 render$1$bailout: function(state, c, t1) {
  t1 = $.div(t1, 150);
  if (typeof t1 !== 'number') throw $.iae(t1);
  c.set$globalAlpha(1 - t1);
  c.set$font('14px Arial');
  c.set$fillStyle('yellow');
  c.set$textAlign('center');
  c.fillText$3($.index(this.prop, 'text'), 0, 0);
  c.restore$0();
 }
};

$$.Arrow = {"":
 ["distance=", "markedForRemoval", "type", "id", "prop", "tags", "y", "x"],
 super: "GameObject",
 render$1: function(c) {
  c.save$0();
  c.translate$2(this.x, this.y);
  this.debugRender$1(c);
  c.set$globalAlpha(1);
  c.set$strokeStyle('#fff');
  c.set$lineWidth(2);
  c.beginPath$0();
  c.moveTo$2(0, 0);
  var t1 = this.prop;
  c.lineTo$2($.index(t1, 'direction').get$x(), $.index(t1, 'direction').get$y());
  c.stroke$0();
  c.closePath$0();
  c.restore$0();
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
  var t1 = this.nightOnly === true;
  if (t1) {
    if (t1) {
      t1 = $.world.get$time();
      if (typeof t1 !== 'number') return this.update$0$bailout(1, t1, 0);
      if (!(t1 > 21)) {
        t1 = $.world.get$time();
        if (typeof t1 !== 'number') return this.update$0$bailout(2, t1, 0);
        t1 = t1 < 5;
      } else t1 = true;
    } else t1 = false;
  } else t1 = true;
  if (t1) {
    t1 = this.freq;
    if (typeof t1 !== 'number') return this.update$0$bailout(3, t1, 0);
    if (t1 > 0) {
      t1 = this.amountSpawned;
      if (typeof t1 !== 'number') return this.update$0$bailout(4, t1, 0);
      var t3 = this.limit;
      if (typeof t3 !== 'number') return this.update$0$bailout(5, t3, t1);
      t3 = t1 < t3;
      t1 = t3;
    } else t1 = false;
  } else t1 = false;
  if (t1) {
    t1 = this.timeToSpawn;
    if (typeof t1 !== 'number') return this.update$0$bailout(6, t1, 0);
    this.timeToSpawn = t1 - 1;
    t1 = this.timeToSpawn;
    if (typeof t1 !== 'number') return this.update$0$bailout(7, t1, 0);
    if (t1 <= 0) {
      t1 = $.world;
      var t2 = this.emission;
      t3 = this.emission_properties;
      var ob = t1.spawnObject$2(t2, !(t3 == null) ? t3 : $.makeLiteralMap([]));
      ob.set$x(this.x);
      ob.set$y(this.y);
      this.timeToSpawn = this.freq;
      t1 = this.amountSpawned;
      if (typeof t1 !== 'number') return this.update$0$bailout(8, t1, 0);
      this.amountSpawned = t1 + 1;
    }
  }
 },
 update$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t3 = env0;
      t1 = env1;
      break;
    case 6:
      t1 = env0;
      break;
    case 7:
      t1 = env0;
      break;
    case 8:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.nightOnly === true;
    default:
      if (state == 1 || state == 2 || (state == 0 && t1)) {
        switch (state) {
          case 0:
          default:
            if (state == 1 || state == 2 || (state == 0 && t1)) {
              switch (state) {
                case 0:
                  t1 = $.world.get$time();
                case 1:
                  state = 0;
                case 2:
                  if (state == 2 || (state == 0 && !$.gtB(t1, 21))) {
                    switch (state) {
                      case 0:
                        t1 = $.world.get$time();
                      case 2:
                        state = 0;
                        t1 = $.ltB(t1, 5);
                    }
                  } else {
                    t1 = true;
                  }
              }
            } else {
              t1 = false;
            }
        }
      } else {
        t1 = true;
      }
    case 3:
    case 4:
    case 5:
      if (state == 3 || state == 4 || state == 5 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this.freq;
          case 3:
            state = 0;
          default:
            if (state == 4 || state == 5 || (state == 0 && $.gtB(t1, 0))) {
              switch (state) {
                case 0:
                  t1 = this.amountSpawned;
                case 4:
                  state = 0;
                  var t3 = this.limit;
                case 5:
                  state = 0;
                  t3 = $.ltB(t1, t3);
                  t1 = t3;
              }
            } else {
              t1 = false;
            }
        }
      } else {
        t1 = false;
      }
    case 6:
    case 7:
    case 8:
      if (state == 6 || state == 7 || state == 8 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this.timeToSpawn;
          case 6:
            state = 0;
            this.timeToSpawn = $.sub(t1, 1);
            t1 = this.timeToSpawn;
          case 7:
            state = 0;
          case 8:
            if (state == 8 || (state == 0 && $.leB(t1, 0))) {
              switch (state) {
                case 0:
                  t1 = $.world;
                  var t2 = this.emission;
                  t3 = this.emission_properties;
                  var ob = t1.spawnObject$2(t2, !(t3 == null) ? t3 : $.makeLiteralMap([]));
                  ob.set$x(this.x);
                  ob.set$y(this.y);
                  this.timeToSpawn = this.freq;
                  t1 = this.amountSpawned;
                case 8:
                  state = 0;
                  this.amountSpawned = $.add(t1, 1);
              }
            }
        }
      }
  }
 }
};

$$.Avatar = {"":
 ["weaponAnimation!", "animation=", "attackRadius?", "speech", "sayTime=", "speaking=", "speed=", "alive?", "health=", "timeSinceHealthChange", "currentAttackTime=", "attackTime=", "attackType=", "armor=", "damage=", "attackDirection=", "_attacking", "velocity?", "currentFrame=", "currentOrientation!", "currentAnimation", "markedForRemoval", "type", "id", "prop", "tags", "y", "x"],
 super: "GameObject",
 render$1: function(c) {
  c.save$0();
  c.translate$2(this.x, this.y);
  this.debugRender$1(c);
  var t1 = this.animation;
  var t2 = this.currentAnimation;
  var t3 = this.currentOrientation;
  var t4 = this.currentFrame;
  if (typeof t4 !== 'number') return this.render$1$bailout(1, c, t4, t1, t2, t3);
  t1.render$4(c, t2, t3, $.toInt(t4 / 5));
  t1 = this.weaponAnimation;
  if (!(t1 == null)) {
    t2 = this.currentAnimation;
    t3 = this.currentOrientation;
    t4 = this.currentFrame;
    if (typeof t4 !== 'number') return this.render$1$bailout(2, c, t1, t2, t3, t4);
    t1.render$4(c, t2, t3, $.toInt(t4 / 5));
  }
  t1 = this.timeSinceHealthChange;
  if (typeof t1 !== 'number') return this.render$1$bailout(3, c, t1, 0, 0, 0);
  if (t1 >= 0) {
    if (typeof t1 !== 'number') return this.render$1$bailout(4, c, t1, 0, 0, 0);
    this.timeSinceHealthChange = t1 - 1;
    t3 = this.timeSinceHealthChange;
    if (typeof t3 !== 'number') return this.render$1$bailout(5, c, t3, 0, 0, 0);
    c.set$globalAlpha(t3 / 120);
    c.set$fillStyle('#f00');
    c.fillRect$4(-25.0, -25, 50.0, 5);
    c.set$fillStyle('#0f0');
    var t5 = this.health;
    if (typeof t5 !== 'number') return this.render$1$bailout(6, c, t5, 0, 0, 0);
    c.fillRect$4(-25.0, -25, t5 / 100.0 * 50.0, 5);
  }
  if (this.speaking === true) {
    t1 = c.get$globalAlpha();
    if (typeof t1 !== 'number') return this.render$1$bailout(7, c, t1, 0, 0, 0);
    c.set$globalAlpha(t1 * 0.75);
    c.set$font('14px Arial');
    t3 = c.measureText$1(this.speech).get$width();
    if (typeof t3 !== 'number') return this.render$1$bailout(8, c, t3, 0, 0, 0);
    var bubbleWidth = t3 + 20;
    c.set$strokeStyle('#000');
    c.set$fillStyle('#fff');
    c.fillRect$4(8, -42, bubbleWidth, 30);
    c.strokeRect$4(8, -42, bubbleWidth, 30);
    c.set$fillStyle('#000');
    c.fillText$3(this.speech, bubbleWidth / 2 + 6, -22);
    t3 = c.get$globalAlpha();
    if (typeof t3 !== 'number') return this.render$1$bailout(9, c, t3, 0, 0, 0);
    c.set$globalAlpha(t3 / 0.75);
  }
  c.restore$0();
 },
 render$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var c = env0;
      t4 = env1;
      t1 = env2;
      t2 = env3;
      t3 = env4;
      break;
    case 2:
      c = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      break;
    case 3:
      c = env0;
      t1 = env1;
      break;
    case 4:
      c = env0;
      t1 = env1;
      break;
    case 5:
      c = env0;
      t3 = env1;
      break;
    case 6:
      c = env0;
      t5 = env1;
      break;
    case 7:
      c = env0;
      t1 = env1;
      break;
    case 8:
      c = env0;
      t3 = env1;
      break;
    case 9:
      c = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      c.save$0();
      c.translate$2(this.x, this.y);
      this.debugRender$1(c);
      var t1 = this.animation;
      var t2 = this.currentAnimation;
      var t3 = this.currentOrientation;
      var t4 = this.currentFrame;
    case 1:
      state = 0;
      t1.render$4(c, t2, t3, $.toInt($.div(t4, 5)));
      t1 = this.weaponAnimation;
    case 2:
      if (state == 2 || (state == 0 && !(t1 == null))) {
        switch (state) {
          case 0:
            t2 = this.currentAnimation;
            t3 = this.currentOrientation;
            t4 = this.currentFrame;
          case 2:
            state = 0;
            t1.render$4(c, t2, t3, $.toInt($.div(t4, 5)));
        }
      }
      t1 = this.timeSinceHealthChange;
    case 3:
      state = 0;
    default:
      if (state == 4 || state == 5 || state == 6 || (state == 0 && $.geB(t1, 0))) {
        switch (state) {
          case 0:
            t1 = this.timeSinceHealthChange;
          case 4:
            state = 0;
            this.timeSinceHealthChange = $.sub(t1, 1);
            t3 = this.timeSinceHealthChange;
          case 5:
            state = 0;
            c.set$globalAlpha($.div(t3, 120));
            c.set$fillStyle('#f00');
            c.fillRect$4(-25.0, -25, 50.0, 5);
            c.set$fillStyle('#0f0');
            var t5 = this.health;
          case 6:
            state = 0;
            c.fillRect$4(-25.0, -25, $.mul($.div(t5, 100.0), 50.0), 5);
        }
      }
    case 7:
    case 8:
    case 9:
      if (state == 7 || state == 8 || state == 9 || (state == 0 && this.speaking === true)) {
        switch (state) {
          case 0:
            t1 = c.get$globalAlpha();
          case 7:
            state = 0;
            c.set$globalAlpha($.mul(t1, 0.75));
            c.set$font('14px Arial');
            t3 = c.measureText$1(this.speech).get$width();
          case 8:
            state = 0;
            var bubbleWidth = $.add(t3, 20);
            c.set$strokeStyle('#000');
            c.set$fillStyle('#fff');
            c.fillRect$4(8, -42, bubbleWidth, 30);
            c.strokeRect$4(8, -42, bubbleWidth, 30);
            c.set$fillStyle('#000');
            c.fillText$3(this.speech, $.add($.div(bubbleWidth, 2), 6), -22);
            t3 = c.get$globalAlpha();
          case 9:
            state = 0;
            c.set$globalAlpha($.div(t3, 0.75));
        }
      }
      c.restore$0();
  }
 },
 say$2: function(text, time) {
  this.speaking = true;
  this.speech = text;
  this.sayTime = 600;
 },
 say$1: function(text) {
  return this.say$2(text,300)
},
 hurt$2: function(damage, direction) {
  this.fireTagEvent$1('hit');
  this.health = $.sub(this.health, $.mul(damage, this.armor));
  $.gtB(damage, 10) && this.velocity.add$1(direction.multiplyScalar$1($.div(damage, 2)));
  this.timeSinceHealthChange = 120;
  if (this.alive && $.leB(this.health, 0)) {
    this.currentFrame = 0;
    this.currentAnimation = 3;
    this.currentOrientation = 0;
    $.index($.index($.tagEvents, 'corpse'), 'init').$call$1(this);
    $.add$1(this.tags, 'corpse');
    $.addTag(this, 'corpse');
    this.fireTagEvent$1('die');
    $.index($.index($.tagEvents, 'corpse'), 'init').$call$1(this);
    this.alive = false;
    for (var i = this.tags.length - 1; i >= 0; --i) {
      var t1 = this.tags;
      var t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      var tag = t1[i];
      if ($.removalOnDeath.containsKey$1(tag) === true && $.index($.removalOnDeath, tag) === true) {
        $.removeRange(this.tags, i, 1);
        var u = $.sub($.get$length($.index($.tagMap, tag)), 1);
        if (typeof u !== 'number') return this.hurt$2$bailout(1, i, u, tag);
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
 hurt$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      i = env0;
      u = env1;
      tag = env2;
      break;
  }
  switch (state) {
    case 0:
      this.fireTagEvent$1('hit');
      this.health = $.sub(this.health, $.mul(damage, this.armor));
      $.gtB(damage, 10) && $.add$1(this.velocity, direction.multiplyScalar$1($.div(damage, 2)));
      this.timeSinceHealthChange = 120;
    case 1:
      if (state == 1 || (state == 0 && (this.alive === true && $.leB(this.health, 0)))) {
        switch (state) {
          case 0:
            this.currentFrame = 0;
            this.currentAnimation = 3;
            this.currentOrientation = 0;
            $.index($.index($.tagEvents, 'corpse'), 'init').$call$1(this);
            $.add$1(this.tags, 'corpse');
            $.addTag(this, 'corpse');
            this.fireTagEvent$1('die');
            $.index($.index($.tagEvents, 'corpse'), 'init').$call$1(this);
            this.alive = false;
            var i = this.tags.length - 1;
          case 1:
            L0: while (true) {
              switch (state) {
                case 0:
                  if (!(i >= 0)) break L0;
                  var t1 = this.tags;
                  var t2 = t1.length;
                  if (i < 0 || i >= t2) throw $.ioore(i);
                  var tag = t1[i];
                case 1:
                  if (state == 1 || (state == 0 && ($.removalOnDeath.containsKey$1(tag) === true && $.index($.removalOnDeath, tag) === true))) {
                    switch (state) {
                      case 0:
                        $.removeRange(this.tags, i, 1);
                        var u = $.sub($.get$length($.index($.tagMap, tag)), 1);
                      case 1:
                        state = 0;
                        for (; $.geB(u, 0); u = $.sub(u, 1)) {
                          if ($.eqB($.index($.index($.tagMap, tag), u), this)) {
                            $.removeRange($.index($.tagMap, tag), u, 1);
                            break;
                          }
                        }
                    }
                  }
                  --i;
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
  if (b === true) {
    var t1 = this.attackType;
    if (t1 !== (t1 | 0)) throw $.iae(t1);
    if (t1 < 0 || t1 >= 3) throw $.ioore(t1);
    t1 = $.CTC33[t1];
  } else t1 = 1;
  this.currentAnimation = t1;
 },
 Avatar$1: function(properties) {
  this.velocity = $.Vec2$(0, 0);
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
 ["context?", "canvas?"],
 super: "Object",
 getImage$1: function(callback) {
  var img = $._ElementFactoryProvider_Element$tag('img');
  var dataURL = this.canvas.toDataURL$1('image/png');
  $.add$1(img.get$on().get$load(), new $.HiddenCanvas_getImage_anon(img, callback));
  img.set$src(dataURL);
  return img;
 },
 HiddenCanvas$2: function(width, height) {
  this.canvas = $._ElementFactoryProvider_Element$tag('canvas');
  var t1 = this.canvas;
  t1.set$width(width);
  t1.set$height(height);
  this.context = t1.getContext$1('2d');
 }
};

$$.Vec2 = {"":
 ["y=", "x="],
 super: "Object",
 getDirection$0: function() {
  if ($.eqB(this.y, 0)) var t1 = 0;
  else {
    if ($.gtB($.abs(this.x), $.abs(this.y))) {
      if ($.eqB(this.x, 0)) t1 = 0;
      else {
        t1 = this.x;
        var t2 = $.toInt($.add($.round($.div(t1, $.abs(t1))), 2));
        t1 = t2;
      }
    } else {
      t1 = this.y;
      t2 = $.toInt($.add($.round($.div(t1, $.abs(t1))), 1));
      t1 = t2;
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
 zeroY$0: function() {
  this.y = 0;
  return this;
 },
 zeroX$0: function() {
  this.x = 0;
  return this;
 },
 zero$0: function() {
  this.multiplyScalar$1(0);
  return this;
 },
 clone$0: function() {
  return $.Vec2$(this.x, this.y);
 },
 distanceTo$1: function(v) {
  return $.Math_sqrt(this.distanceToSquared$1(v));
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
  return $.Math_sqrt(this.lengthSq$0());
 },
 get$length: function() { return new $.BoundClosure(this, 'length$0'); },
 lengthSq$0: function() {
  var t1 = this.x;
  t1 = $.mul(t1, t1);
  var t2 = this.y;
  return $.add(t1, $.mul(t2, t2));
 },
 divideScalar$1: function(a) {
  if ($.eqB(a, 0)) a = 0.0001;
  this.x = $.div(this.x, a);
  this.y = $.div(this.y, a);
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
 get$set: function() { return new $.BoundClosure1(this, 'set$2'); },
 Vec2$2: function(x, y) {
  this.x = x;
  this.y = y;
 }
};

$$.Camera = {"":
 ["_actualZoom", "_targetZoom", "tweenSpeed", "y", "x"],
 super: "Vec2",
 update$0: function() {
  var t1 = this._actualZoom;
  if (typeof t1 !== 'number') return this.update$0$bailout(1, t1, 0);
  var t3 = this._targetZoom;
  if (typeof t3 !== 'number') return this.update$0$bailout(2, t3, t1);
  this._actualZoom = t1 - (t1 - t3) / this.tweenSpeed;
 },
 update$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._actualZoom;
    case 1:
      state = 0;
      var t3 = this._targetZoom;
    case 2:
      state = 0;
      this._actualZoom = $.sub(t1, $.div($.sub(t1, t3), this.tweenSpeed));
  }
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
  if ($.ltB(x, 0)) x = 0;
  else {
    if ($.gtB(x, 800)) x = 800;
  }
  if ($.ltB(y, 0)) y = 0;
  else {
    if ($.gtB(y, 450)) y = 450;
  }
  this.mouse_position.set$2(x, y);
 },
 mouseUpAt$2: function(x, y) {
  this.mouseDown = false;
  if ($.ltB(x, 0)) x = 0;
  else {
    if ($.gtB(x, 800)) x = 800;
  }
  if ($.ltB(y, 0)) y = 0;
  else {
    if ($.gtB(y, 450)) y = 450;
  }
  this.mouseAt$2(x, y);
 },
 mouseDownAt$2: function(x, y) {
  this.mouseDown = true;
  if ($.ltB(x, 0)) x = 0;
  else {
    if ($.gtB(x, 800)) x = 800;
  }
  if ($.ltB(y, 0)) y = 0;
  else {
    if ($.gtB(y, 450)) y = 450;
  }
  this.mouseAt$2(x, y);
 },
 key$1: function(identifier) {
  var t1 = this.keyList;
  var t2 = $.index(this.keyMap, identifier);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 get$key: function() { return new $.BoundClosure0(this, 'key$1'); },
 setKey$2: function(keyCode, value) {
  var t1 = this.keyList;
  if (keyCode !== (keyCode | 0)) throw $.iae(keyCode);
  var t2 = t1.length;
  if (keyCode < 0 || keyCode >= t2) throw $.ioore(keyCode);
  t1[keyCode] = value;
 },
 UIManager$0: function() {
  var t1 = ({});
  t1.touches_1 = null;
  var t2 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t2, ({E: 'Function'}));
  this.onKeyPress = t2;
  t2 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t2, ({E: 'Function'}));
  this.onClick = t2;
  this.mouse_position = $.Vec2$(0.0, 0.0);
  t2 = $.ListFactory_List(255);
  $.setRuntimeTypeInfo(t2, ({E: 'int'}));
  this.keyList = t2;
  for (t2 = this.keyList, i = 0; i < 255; ++i) {
    var t3 = t2.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t2[i] = 0;
  }
  $.add$1($.window().get$on().get$keyDown(), new $.anon51(this));
  $.add$1($.window().get$on().get$keyUp(), new $.anon52(this));
  $.add$1($.window().get$on().get$mouseDown(), new $.anon53(this, t1));
  $.add$1($.window().get$on().get$mouseUp(), new $.anon54(this, t1));
  $.add$1($.window().get$on().get$mouseMove(), new $.anon55(this, t1));
  $.add$1($.window().get$on().get$touchStart(), new $.anon56(this));
  $.add$1($.window().get$on().get$touchMove(), new $.anon57(this, t1));
  $.add$1($.window().get$on().get$touchEnd(), new $.anon58());
  var i;
 }
};

$$.Color = {"":
 ["_b", "_g", "_r"],
 super: "Object",
 clone$0: function() {
  return $.Color$(this.get$r(), this.get$g(), this.get$b());
 },
 blend$2: function(color, w) {
  var t1 = this.get$r();
  if (typeof w !== 'number') throw $.iae(w);
  var t2 = 1 - w;
  this.set$r($.toInt($.add($.mul(t1, t2), $.mul(color.get$r(), w))));
  this.set$g($.toInt($.add($.mul(this.get$g(), t2), $.mul(color.get$g(), w))));
  this.set$b($.toInt($.add($.mul(this.get$b(), t2), $.mul(color.get$b(), w))));
 },
 subtract$1: function(x) {
  this.set$r($.sub(this.get$r(), x));
  this.set$g($.sub(this.get$g(), x));
  this.set$b($.sub(this.get$b(), x));
  return this;
 },
 toString$0: function() {
  var s = $.toRadixString($.or($.or($.shl(this.get$r(), 16), $.shl(this.get$g(), 8)), this.get$b()), 16);
  if (typeof s !== 'string') return this.toString$0$bailout(1, s);
  for (; s.length < 6; ) {
    s = '0' + s;
  }
  return '#' + s;
 },
 toString$0$bailout: function(state, s) {
  for (; $.ltB($.get$length(s), 6); ) {
    s = '0' + $.S(s);
  }
  return '#' + $.S(s);
 },
 get$b: function() {
  return this._b;
 },
 set$b: function(x) {
  if ($.gtB(x, 255)) var t1 = 255;
  else {
    t1 = $.ltB(x, 0) ? 0 : x;
  }
  this._b = t1;
 },
 get$g: function() {
  return this._g;
 },
 set$g: function(x) {
  if ($.gtB(x, 255)) var t1 = 255;
  else {
    t1 = $.ltB(x, 0) ? 0 : x;
  }
  this._g = t1;
 },
 get$r: function() {
  return this._r;
 },
 set$r: function(x) {
  if ($.gtB(x, 255)) var t1 = 255;
  else {
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
    this.set$r($.Math_parseInt('0x' + $.S($.index(ar, 1))));
    this.set$r($.add($.shl(this.get$r(), 4), this.get$r()));
    this.set$g($.Math_parseInt('0x' + $.S($.index(ar, 2))));
    this.set$g($.add($.shl(this.get$g(), 4), this.get$g()));
    this.set$b($.Math_parseInt('0x' + $.S($.index(ar, 3))));
    this.set$b($.add($.shl(this.get$b(), 4), this.get$b()));
  } else {
    if ($.eqB($.get$length(s), 7)) {
      this.set$r($.Math_parseInt('0x' + $.S($.index(ar, 1)) + $.S($.index(ar, 2))));
      this.set$g($.Math_parseInt('0x' + $.S($.index(ar, 3)) + $.S($.index(ar, 4))));
      this.set$b($.Math_parseInt('0x' + $.S($.index(ar, 5)) + $.S($.index(ar, 6))));
    }
  }
 }
};

$$.TileManager = {"":
 ["location", "renderChunkCoordinates", "renderChunks"],
 super: "Object",
 generateTileChunk$3: function(sx, sy, callback) {
  if (typeof sx !== 'number') return this.generateTileChunk$3$bailout(1, sx, sy, callback);
  if (typeof sy !== 'number') return this.generateTileChunk$3$bailout(1, sx, sy, callback);
  return $.res_loadImage($.S(this.location) + '/' + $.S($.toInt(sx / 8)) + 'x' + $.S($.toInt(sy / 8)) + '.png', callback);
 },
 generateTileChunk$3$bailout: function(state, sx, sy, callback) {
  return $.res_loadImage($.S(this.location) + '/' + $.S($.toInt($.div(sx, 8))) + 'x' + $.S($.toInt($.div(sy, 8))) + '.png', callback);
 },
 generateTileChunk$2: function(sx,sy) {
  return this.generateTileChunk$3(sx,sy,null)
},
 render$2: function(c, camera) {
  var tx_s = $.sub(camera.get$x(), $.div($.div($.SCREEN_WIDTH, 2), camera.get$animatedZoom()));
  var tx = $.sub(tx_s, $.mod($.toInt(tx_s), 256));
  if (typeof tx !== 'number') return this.render$2$bailout(1, c, camera, tx, 0, 0, 0, 0);
  var ty_s = $.sub(camera.get$y(), $.div($.div($.SCREEN_HEIGHT, 2), camera.get$animatedZoom()));
  var ty = $.sub(ty_s, $.mod($.toInt(ty_s), 256));
  if (typeof ty !== 'number') return this.render$2$bailout(2, c, camera, ty, tx, 0, 0, 0);
  var txi = $.toInt(tx / 256);
  if (typeof txi !== 'number') return this.render$2$bailout(3, c, camera, ty, txi, tx, 0, 0);
  var tyi = $.toInt(ty / 256);
  if (typeof tyi !== 'number') return this.render$2$bailout(4, c, camera, tyi, tx, ty, txi, 0);
  var c1 = $.add($.div($.div($.SCREEN_WIDTH, 256), camera.get$animatedZoom()), 1);
  if (typeof c1 !== 'number') return this.render$2$bailout(5, c, camera, tyi, tx, ty, txi, c1);
  var c2 = $.add($.div($.div($.SCREEN_HEIGHT, 256), camera.get$animatedZoom()), 1);
  if (typeof c2 !== 'number') return this.render$2$bailout(6, c, tyi, tx, ty, c2, txi, c1);
  for (var t1 = this.renderChunkCoordinates, t2 = this.renderChunks, i = -1; i < c1; ++i) {
    var txi_i = txi + i;
    for (var t3 = i * 256, t4 = $.mod(txi_i, 6), dx = tx + t3, t3 = txi_i * 8, u = -1; u < c2; ++u) {
      var t5 = tyi + u;
      var index = t4 + $.mod(t5, 6) * 6;
      if (!(t1.operator$index$1(index) == null) && (t1.operator$index$1(index).at$2(txi_i, t5) === true && !(t2.operator$index$1(index) == null))) c.drawImage$3(t2.operator$index$1(index), dx, ty + u * 256);
      else {
        t1.operator$indexSet$2(index, $.Vec2$(txi_i, t5));
        t2.operator$indexSet$2(index, this.generateTileChunk$2(t3, t5 * 8));
      }
    }
  }
 },
 render$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var c = env0;
      var camera = env1;
      tx = env2;
      break;
    case 2:
      c = env0;
      camera = env1;
      ty = env2;
      tx = env3;
      break;
    case 3:
      c = env0;
      camera = env1;
      ty = env2;
      txi = env3;
      tx = env4;
      break;
    case 4:
      c = env0;
      camera = env1;
      tyi = env2;
      tx = env3;
      ty = env4;
      txi = env5;
      break;
    case 5:
      c = env0;
      camera = env1;
      tyi = env2;
      tx = env3;
      ty = env4;
      txi = env5;
      c1 = env6;
      break;
    case 6:
      c = env0;
      tyi = env1;
      tx = env2;
      ty = env3;
      c2 = env4;
      txi = env5;
      c1 = env6;
      break;
  }
  switch (state) {
    case 0:
      var tx_s = $.sub(camera.get$x(), $.div($.div($.SCREEN_WIDTH, 2), camera.get$animatedZoom()));
      var tx = $.sub(tx_s, $.mod($.toInt(tx_s), 256));
    case 1:
      state = 0;
      var ty_s = $.sub(camera.get$y(), $.div($.div($.SCREEN_HEIGHT, 2), camera.get$animatedZoom()));
      var ty = $.sub(ty_s, $.mod($.toInt(ty_s), 256));
    case 2:
      state = 0;
      var txi = $.toInt($.div(tx, 256));
    case 3:
      state = 0;
      var tyi = $.toInt($.div(ty, 256));
    case 4:
      state = 0;
      var c1 = $.add($.div($.div($.SCREEN_WIDTH, 256), camera.get$animatedZoom()), 1);
    case 5:
      state = 0;
      var c2 = $.add($.div($.div($.SCREEN_HEIGHT, 256), camera.get$animatedZoom()), 1);
    case 6:
      state = 0;
      for (var t1 = this.renderChunkCoordinates, t2 = this.renderChunks, i = -1; $.ltB(i, c1); ++i) {
        var txi_i = $.add(txi, i);
        for (var t3 = i * 256, u = -1; $.ltB(u, c2); ++u) {
          var index = $.add($.mod(txi_i, 6), $.mul($.mod($.add(tyi, u), 6), 6));
          if (!($.index(t1, index) == null) && ($.index(t1, index).at$2(txi_i, $.add(tyi, u)) === true && !($.index(t2, index) == null))) {
            var dx = $.add(tx, t3);
            c.drawImage$3($.index(t2, index), dx, $.add(ty, u * 256));
          } else {
            $.indexSet(t1, index, $.Vec2$(txi_i, $.add(tyi, u)));
            $.indexSet(t2, index, this.generateTileChunk$2($.mul(txi_i, 8), $.mul($.add(tyi, u), 8)));
          }
        }
      }
  }
 },
 TileManager$1: function(location$) {
  this.renderChunks = $.HashMapImplementation$();
  this.renderChunkCoordinates = $.HashMapImplementation$();
 }
};

$$.OverlayManager = {"":
 ["dusk_night", "night_dawn", "SUNSET", "SUNRISE"],
 super: "Object",
 render$2: function(c, camera) {
  var time = $.world.get$time();
  var t1 = this.SUNRISE;
  if ($.gtB(time, t1 - 1) && $.ltB(time, t1 + 1)) {
    ++t1;
    if (typeof time !== 'number') throw $.iae(time);
    var t2 = (t1 - time) / 2;
    if (typeof t2 !== 'number') throw $.iae(t2);
    var p = 1 - t2;
    c.set$globalAlpha(0.75 - p * 0.75);
    t2 = this.night_dawn;
    var t3 = t2.length - 1;
    if (typeof t3 !== 'number') throw $.iae(t3);
    var t4 = $.toInt($.floor(p * t3));
    if (t4 !== (t4 | 0)) throw $.iae(t4);
    var t5 = t2.length;
    if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
    var color1 = $.Color$fromString(t2[t4]);
    var t6 = t2.length - 1;
    if (typeof t6 !== 'number') throw $.iae(t6);
    var t7 = $.toInt($.ceil(p * t6));
    if (t7 !== (t7 | 0)) throw $.iae(t7);
    var t8 = t2.length;
    if (t7 < 0 || t7 >= t8) throw $.ioore(t7);
    var color2 = $.Color$fromString(t2[t7]);
    var t9 = t2.length - 1;
    if (typeof t9 !== 'number') throw $.iae(t9);
    t9 *= p;
    var t10 = t2.length - 1;
    if (typeof t10 !== 'number') throw $.iae(t10);
    var t11 = $.floor(p * t10);
    if (typeof t11 !== 'number') throw $.iae(t11);
    color1.blend$2(color2, t9 - t11);
    color1.subtract$1(128);
    c.set$fillStyle(color1.toString$0());
    c.fillRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
  } else {
    if ($.ltB(time, t1 - 1) || $.gtB(time, this.SUNSET + 1)) {
      if ($.ltB(time, t1 - 1)) time = $.add(time, 24);
      var ASUNRISE = t1 + 23;
      var ASUNSET = this.SUNSET + 1;
      if (typeof time !== 'number') throw $.iae(time);
      p = (ASUNRISE - time) / (ASUNRISE - ASUNSET);
      c.set$globalAlpha(0.75);
      t1 = this.night_dawn;
      t2 = t1.length;
      if (0 < 0 || 0 >= t2) throw $.ioore(0);
      var sunset = $.Color$fromString(t1[0]);
      t3 = this.dusk_night;
      t4 = t3.length - 1;
      t5 = t3.length;
      if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
      sunset.blend$2($.Color$fromString(t3[t4]), p);
      sunset.subtract$1(128);
      c.set$fillStyle(sunset.toString$0());
      c.fillRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
    } else {
      t1 = this.SUNSET;
      if ($.gtB(time, t1 - 1) && $.ltB(time, t1 + 1)) {
        ++t1;
        if (typeof time !== 'number') throw $.iae(time);
        t2 = (t1 - time) / 2;
        if (typeof t2 !== 'number') throw $.iae(t2);
        p = 1 - t2;
        c.set$globalAlpha(p * 0.75);
        t2 = this.dusk_night;
        t3 = t2.length - 1;
        if (typeof t3 !== 'number') throw $.iae(t3);
        t4 = $.toInt($.floor(p * t3));
        if (t4 !== (t4 | 0)) throw $.iae(t4);
        t5 = t2.length;
        if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
        color1 = $.Color$fromString(t2[t4]);
        t6 = t2.length - 1;
        if (typeof t6 !== 'number') throw $.iae(t6);
        t7 = $.toInt($.ceil(p * t6));
        if (t7 !== (t7 | 0)) throw $.iae(t7);
        t8 = t2.length;
        if (t7 < 0 || t7 >= t8) throw $.ioore(t7);
        color2 = $.Color$fromString(t2[t7]);
        t9 = t2.length - 1;
        if (typeof t9 !== 'number') throw $.iae(t9);
        t9 *= p;
        t10 = t2.length - 1;
        if (typeof t10 !== 'number') throw $.iae(t10);
        t11 = $.floor(p * t10);
        if (typeof t11 !== 'number') throw $.iae(t11);
        color1.blend$2(color2, t9 - t11);
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
 ["height?", "width?", "action", "text!", "y", "x"],
 super: "Vec2",
 render$1: function(c) {
  c.save$0();
  c.translate$2(this.x, this.y);
  c.scale$2(1.5, 1.5);
  var t1 = $.world.get$uiImages();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.render$1$bailout(1, c, t1);
  var t3 = t1.length;
  if (25 >= t3) throw $.ioore(25);
  c.drawImage$3(t1[25], -64, -16);
  var t4 = $.world.get$uiImages();
  if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || (t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior()))) return this.render$1$bailout(2, c, t4);
  var t6 = t4.length;
  if (26 >= t6) throw $.ioore(26);
  c.drawImage$3(t4[26], -32, -16);
  var t7 = $.world.get$uiImages();
  if (typeof t7 !== 'string' && (typeof t7 !== 'object' || t7 === null || (t7.constructor !== Array && !t7.is$JavaScriptIndexingBehavior()))) return this.render$1$bailout(3, c, t7);
  var t9 = t7.length;
  if (26 >= t9) throw $.ioore(26);
  c.drawImage$3(t7[26], 0, -16);
  var t10 = $.world.get$uiImages();
  if (typeof t10 !== 'string' && (typeof t10 !== 'object' || t10 === null || (t10.constructor !== Array && !t10.is$JavaScriptIndexingBehavior()))) return this.render$1$bailout(4, c, t10);
  var t12 = t10.length;
  if (27 >= t12) throw $.ioore(27);
  c.drawImage$3(t10[27], 32, -16);
  c.set$globalAlpha(0.75);
  c.set$font('12px Arial');
  c.set$textAlign('center');
  c.set$fillStyle('#fff');
  c.fillText$3(this.text, 0, 4);
  c.restore$0();
 },
 render$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var c = env0;
      t1 = env1;
      break;
    case 2:
      c = env0;
      t3 = env1;
      break;
    case 3:
      c = env0;
      t5 = env1;
      break;
    case 4:
      c = env0;
      t7 = env1;
      break;
  }
  switch (state) {
    case 0:
      c.save$0();
      c.translate$2(this.x, this.y);
      c.scale$2(1.5, 1.5);
      var t1 = $.world.get$uiImages();
    case 1:
      state = 0;
      c.drawImage$3($.index(t1, 25), -64, -16);
      var t3 = $.world.get$uiImages();
    case 2:
      state = 0;
      c.drawImage$3($.index(t3, 26), -32, -16);
      var t5 = $.world.get$uiImages();
    case 3:
      state = 0;
      c.drawImage$3($.index(t5, 26), 0, -16);
      var t7 = $.world.get$uiImages();
    case 4:
      state = 0;
      c.drawImage$3($.index(t7, 27), 32, -16);
      c.set$globalAlpha(0.75);
      c.set$font('12px Arial');
      c.set$textAlign('center');
      c.set$fillStyle('#fff');
      c.fillText$3(this.text, 0, 4);
      c.restore$0();
  }
 },
 clickAt$2: function(px, py) {
  if (typeof px !== 'number') return this.clickAt$2$bailout(1, px, py, 0);
  if (typeof py !== 'number') return this.clickAt$2$bailout(1, px, py, 0);
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.clickAt$2$bailout(2, px, py, t1);
  var t3 = $.abs(px - t1);
  if (typeof t3 !== 'number') return this.clickAt$2$bailout(3, py, t3, 0);
  var t5 = this.width;
  if (typeof t5 !== 'number') return this.clickAt$2$bailout(4, py, t3, t5);
  if (t3 < t5 / 2) {
    t1 = this.y;
    if (typeof t1 !== 'number') return this.clickAt$2$bailout(5, t1, py, 0);
    t3 = $.abs(py - t1);
    if (typeof t3 !== 'number') return this.clickAt$2$bailout(6, t3, 0, 0);
    t5 = this.height;
    if (typeof t5 !== 'number') return this.clickAt$2$bailout(7, t5, t3, 0);
    t3 = t3 < t5 / 2;
    t1 = t3;
  } else t1 = false;
  return t1;
 },
 clickAt$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var px = env0;
      var py = env1;
      break;
    case 2:
      px = env0;
      py = env1;
      t1 = env2;
      break;
    case 3:
      py = env0;
      t3 = env1;
      break;
    case 4:
      py = env0;
      t3 = env1;
      t5 = env2;
      break;
    case 5:
      t1 = env0;
      py = env1;
      break;
    case 6:
      t3 = env0;
      break;
    case 7:
      t5 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this.x;
    case 2:
      state = 0;
      var t3 = $.abs($.sub(px, t1));
    case 3:
      state = 0;
      var t5 = this.width;
    case 4:
      state = 0;
    default:
      if (state == 5 || state == 6 || state == 7 || (state == 0 && $.ltB(t3, $.div(t5, 2)))) {
        switch (state) {
          case 0:
            t1 = this.y;
          case 5:
            state = 0;
            t3 = $.abs($.sub(py, t1));
          case 6:
            state = 0;
            t5 = this.height;
          case 7:
            state = 0;
            t3 = $.ltB(t3, $.div(t5, 2));
            t1 = t3;
        }
      } else {
        t1 = false;
      }
      return t1;
  }
 },
 action$0: function() { return this.action.$call$0(); }
};

$$.MenuInterface = {"":
 ["ax", "buttons", "renderFunction", "data", "type="],
 super: "Object",
 renderConfirmMenu$1: function(c) {
  var cx = $.div($.SCREEN_WIDTH, 2);
  if (typeof cx !== 'number') return this.renderConfirmMenu$1$bailout(1, c, cx, 0, 0);
  var cy = $.div($.SCREEN_HEIGHT, 2);
  if (typeof cy !== 'number') return this.renderConfirmMenu$1$bailout(2, c, cy, cx, 0);
  var ui = $.world.get$uiImages();
  if (typeof ui !== 'string' && (typeof ui !== 'object' || ui === null || (ui.constructor !== Array && !ui.is$JavaScriptIndexingBehavior()))) return this.renderConfirmMenu$1$bailout(3, c, cy, ui, cx);
  var t4 = ui.length;
  if (16 >= t4) throw $.ioore(16);
  var pattern = c.createPattern$2(ui[16], 'repeat');
  c.beginPath$0();
  c.set$fillStyle(pattern);
  var t5 = cx - 300;
  var t6 = t5 + 32 + 10;
  var t7 = cy - 200;
  var t8 = t7 + 32;
  c.rect$4(t6, t8, 516, 312);
  c.fill$0();
  c.closePath$0();
  t6 = ui.length;
  if (8 >= t6) throw $.ioore(8);
  var t9 = ui[8];
  t5 += 12;
  c.drawImage$3(t9, t5, t7);
  for (var t1 = t5 + 32, t2 = cy + 200 - 64, i = 0; i < 16; ++i) {
    var t3 = ui.length;
    if (9 >= t3) throw $.ioore(9);
    t4 = ui[9];
    t6 = t1 + i * 32;
    c.drawImage$3(t4, t6, t7);
    t4 = ui.length;
    if (23 >= t4) throw $.ioore(23);
    c.drawImage$3(ui[23], t6, t2);
  }
  for (t1 = cx + 300, t3 = t1 - 12 - 32, i = 0; i < 10; ++i) {
    t4 = ui.length;
    if (15 >= t4) throw $.ioore(15);
    t6 = ui[15];
    t9 = t8 + i * 32;
    c.drawImage$3(t6, t5, t9);
    t6 = ui.length;
    if (17 >= t6) throw $.ioore(17);
    c.drawImage$3(ui[17], t3, t9);
  }
  t3 = ui.length;
  if (10 >= t3) throw $.ioore(10);
  t4 = ui[10];
  t6 = t1 - 32 - 12;
  c.drawImage$3(t4, t6, t7);
  t7 = ui.length;
  if (22 >= t7) throw $.ioore(22);
  c.drawImage$3(ui[22], t5, t2);
  t5 = ui.length;
  if (24 >= t5) throw $.ioore(24);
  c.drawImage$3(ui[24], t6, t2);
  c.set$font('18px Arial');
  c.set$fillStyle('#ab7d10');
  c.set$textAlign('center');
  c.fillText$3($.index(this.data, 'text'), cx, cy);
  $.forEach(this.buttons, new $.MenuInterface_renderConfirmMenu_anon(c));
 },
 renderConfirmMenu$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var c = env0;
      cx = env1;
      break;
    case 2:
      c = env0;
      cy = env1;
      cx = env2;
      break;
    case 3:
      c = env0;
      cy = env1;
      ui = env2;
      cx = env3;
      break;
  }
  switch (state) {
    case 0:
      var cx = $.div($.SCREEN_WIDTH, 2);
    case 1:
      state = 0;
      var cy = $.div($.SCREEN_HEIGHT, 2);
    case 2:
      state = 0;
      var ui = $.world.get$uiImages();
    case 3:
      state = 0;
      var pattern = c.createPattern$2($.index(ui, 16), 'repeat');
      c.beginPath$0();
      c.set$fillStyle(pattern);
      c.rect$4($.add($.add($.sub(cx, 300), 32), 10), $.add($.sub(cy, 200), 32), 516, 312);
      c.fill$0();
      c.closePath$0();
      c.drawImage$3($.index(ui, 8), $.add($.sub(cx, 300), 12), $.sub(cy, 200));
      for (var i = 0; i < 16; ++i) {
        var t1 = $.index(ui, 9);
        var t2 = $.add($.add($.sub(cx, 300), 12), 32);
        var t3 = i * 32;
        c.drawImage$3(t1, $.add(t2, t3), $.sub(cy, 200));
        c.drawImage$3($.index(ui, 23), $.add($.add($.add($.sub(cx, 300), 12), 32), t3), $.sub($.add(cy, 200), 64));
      }
      for (i = 0; i < 10; ++i) {
        t1 = $.index(ui, 15);
        t2 = $.add($.sub(cx, 300), 12);
        t3 = $.add($.sub(cy, 200), 32);
        var t4 = i * 32;
        c.drawImage$3(t1, t2, $.add(t3, t4));
        c.drawImage$3($.index(ui, 17), $.sub($.sub($.add(cx, 300), 12), 32), $.add($.add($.sub(cy, 200), 32), t4));
      }
      c.drawImage$3($.index(ui, 10), $.sub($.sub($.add(cx, 300), 32), 12), $.sub(cy, 200));
      c.drawImage$3($.index(ui, 22), $.add($.sub(cx, 300), 12), $.sub($.add(cy, 200), 64));
      c.drawImage$3($.index(ui, 24), $.sub($.sub($.add(cx, 300), 32), 12), $.sub($.add(cy, 200), 64));
      c.set$font('18px Arial');
      c.set$fillStyle('#ab7d10');
      c.set$textAlign('center');
      c.fillText$3($.index(this.data, 'text'), cx, cy);
      $.forEach(this.buttons, new $.MenuInterface_renderConfirmMenu_anon(c));
  }
 },
 get$renderConfirmMenu: function() { return new $.BoundClosure0(this, 'renderConfirmMenu$1'); },
 renderOptionsMenu$1: function(c) {
  $.forEach(this.buttons, new $.MenuInterface_renderOptionsMenu_anon(c));
 },
 get$renderOptionsMenu: function() { return new $.BoundClosure0(this, 'renderOptionsMenu$1'); },
 render$1: function(c) {
  c.save$0();
  c.translate$2(this.ax, 0);
  var t1 = this.ax;
  if (typeof t1 !== 'number') return this.render$1$bailout(1, c, t1);
  this.ax = t1 / 1.5;
  this.renderFunction$1(c);
  c.restore$0();
 },
 render$1$bailout: function(state, c, t1) {
  this.ax = $.div(t1, 1.5);
  this.renderFunction$1(c);
  c.restore$0();
 },
 clickAt$2: function(x, y) {
  var t1 = ({});
  t1.returner_1 = false;
  $.some(this.buttons, new $.MenuInterface_clickAt_anon(x, t1, y));
  return t1.returner_1;
 },
 renderFunction$1: function(arg0) { return this.renderFunction.$call$1(arg0); },
 MenuInterface$2: function(type, data) {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'MenuButton'}));
  this.buttons = t1;
  this.ax = $.neg($.SCREEN_WIDTH);
  switch (this.type) {
    case 'options':
      this.renderFunction = this.get$renderOptionsMenu();
      var options = $.index(this.data, 'options');
      for (t1 = this.buttons, i = 0; $.ltB(i, $.get$length(options)); ++i) {
        $.add$1(t1, $.MenuButton$($.index($.index(options, i), 'name'), $.index($.index(options, i), 'func'), $.add($.div($.SCREEN_WIDTH, 8), $.mod(i, 2) * 200), $.add($.div($.SCREEN_HEIGHT, 8), $.mul($.toInt(i / 2), 50))));
      }
      $.add$1(t1, $.MenuButton$('Exit', new $.anon62(), $.add($.div($.SCREEN_WIDTH, 8), $.mul($.mod($.get$length(options), 2), 200)), $.add($.div($.SCREEN_HEIGHT, 8), $.mul($.toInt($.div($.get$length(options), 2)), 50))));
      break;
    case 'confirm':
      this.renderFunction = this.get$renderConfirmMenu();
      var cx = $.div($.SCREEN_WIDTH, 2);
      var cy = $.div($.SCREEN_HEIGHT, 2);
      t1 = this.buttons;
      $.add$1(t1, $.MenuButton$('Cancel', new $.anon63(), $.sub(cx, 150), $.add(cy, 100)));
      $.add$1(t1, $.MenuButton$('Confirm', $.index(this.data, 'func'), $.add(cx, 150), $.add(cy, 100)));
      break;
    case 'broke':
      this.renderFunction = this.get$renderConfirmMenu();
      cx = $.div($.SCREEN_WIDTH, 2);
      cy = $.div($.SCREEN_HEIGHT, 2);
      t1 = this.buttons;
      $.add$1(t1, $.MenuButton$('Cancel', new $.anon64(), $.sub(cx, 150), $.add(cy, 100)));
      $.add$1(t1, $.MenuButton$('Not Enough Coin', new $.anon65(), $.add(cx, 150), $.add(cy, 100)));
      break;
  }
  var i;
 }
};

$$.World = {"":
 ["lastSaved", "player?", "paused=", "slide_dir", "slidey_pos", "slidex_pos", "slides", "currentSlide", "slideTime", "intro!", "player_max_health=", "player_animation", "coin=", "weaponStartFrame", "weaponName?", "weaponCost2?", "weaponCost?", "weaponAttackRadius", "weaponAttackTypes?", "weaponAttackTime?", "weaponDamage?", "currentWeapon=", "playerWeapons?", "difficultyMode", "zombies_killed=", "zombie_out", "zombie_max=", "dayCount=", "awakePopulation=", "saved=", "totalPopulation=", "night_mode", "dayLength=", "time=", "pathnodes?", "paths?", "ZOMBIE_DAMAGE?", "ZOMBIE_ARMOR?", "ZOMBIE_SPEED?", "ZOMBIE_WANDER_DISTANCE", "AGRO_DISTANCE?", "uiImages=", "itemImages!", "collisionMap", "map_width", "offscene?", "onscene?", "objects?", "camera", "overlay", "menuInterfaces?", "topTileManager", "bottomTileManager", "currentMapTree?", "mapsTree", "dataTree?"],
 super: "Object",
 render$1: function(c) {
  c.setTransform$6(1, 0, 0, 1, 0, 0);
  c.clearRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
  c.save$0();
  var t1 = $.SCREEN_WIDTH;
  if (typeof t1 !== 'number') return this.render$1$bailout(1, c, t1, 0, 0);
  t1 /= 2;
  var t3 = $.SCREEN_HEIGHT;
  if (typeof t3 !== 'number') return this.render$1$bailout(2, c, t1, t3, 0);
  c.translate$2(t1, t3 / 2);
  t1 = this.camera;
  c.scale$2(t1.get$animatedZoom(), t1.get$animatedZoom());
  var t2 = t1.x;
  if (typeof t2 !== 'number') return this.render$1$bailout(3, c, t2, t1, 0);
  var t4 = $.SCREEN_WIDTH;
  if (typeof t4 !== 'number') return this.render$1$bailout(4, c, t2, t4, t1);
  if (t2 - t4 / 2 < 0) {
    t2 = $.SCREEN_WIDTH;
    if (typeof t2 !== 'number') return this.render$1$bailout(5, c, t1, t2, 0);
    t1.x = t2 / 2;
  } else {
    if (typeof t2 !== 'number') return this.render$1$bailout(6, c, t1, t2, 0);
    t4 = $.SCREEN_WIDTH;
    if (typeof t4 !== 'number') return this.render$1$bailout(7, c, t1, t2, t4);
    t2 += t4 / 2;
    var t6 = this.map_width;
    if (typeof t6 !== 'number') return this.render$1$bailout(8, c, t2, t1, t6);
    if (t2 > t6 * 32) {
      if (typeof t6 !== 'number') return this.render$1$bailout(9, c, t6, t1, 0);
      t6 *= 32;
      t3 = $.SCREEN_WIDTH;
      if (typeof t3 !== 'number') return this.render$1$bailout(10, c, t1, t6, t3);
      t1.x = t6 - t3 / 2;
    }
  }
  t2 = t1.y;
  if (typeof t2 !== 'number') return this.render$1$bailout(11, c, t2, t1, 0);
  t4 = $.SCREEN_HEIGHT;
  if (typeof t4 !== 'number') return this.render$1$bailout(12, c, t2, t4, t1);
  if (t2 - t4 / 2 < 0) {
    t2 = $.SCREEN_HEIGHT;
    if (typeof t2 !== 'number') return this.render$1$bailout(13, c, t2, t1, 0);
    t1.y = t2 / 2;
  } else {
    if (typeof t2 !== 'number') return this.render$1$bailout(14, c, t2, t1, 0);
    t4 = $.SCREEN_HEIGHT;
    if (typeof t4 !== 'number') return this.render$1$bailout(15, c, t2, t1, t4);
    t2 += t4 / 2;
    t6 = this.map_width;
    if (typeof t6 !== 'number') return this.render$1$bailout(16, c, t1, t6, t2);
    if (t2 > t6 * 32) {
      if (typeof t6 !== 'number') return this.render$1$bailout(17, c, t1, t6, 0);
      t6 *= 32;
      t3 = $.SCREEN_HEIGHT;
      if (typeof t3 !== 'number') return this.render$1$bailout(18, c, t6, t3, t1);
      t1.y = t6 - t3 / 2;
    }
  }
  t2 = t1.x;
  if (typeof t2 !== 'number') return this.render$1$bailout(19, c, t1, t2, 0);
  t2 = -t2;
  t4 = t1.y;
  if (typeof t4 !== 'number') return this.render$1$bailout(20, c, t4, t1, t2);
  c.translate$2(t2, -t4);
  c.set$font('12px Arial');
  c.set$textAlign('center');
  this.bottomTileManager.render$2(c, t1);
  $.forEach(this.onscene, new $.World_render_anon(c));
  if ($.DEBUG === true) {
    c.set$globalAlpha(0.5);
    $.forEach(this.paths, new $.World_render_anon0(c));
  }
  this.topTileManager.render$2(c, t1);
  c.restore$0();
  this.overlay.render$2(c, t1);
  $.forEach(this.menuInterfaces, new $.World_render_anon1(c));
  $.renderNotifications(c);
  this.renderSaved$1(c);
  this.renderCoins$1(c);
  if (this.intro === true) {
    c.set$globalAlpha(1);
    c.set$fillStyle('#000');
    t1 = $.SCREEN_HEIGHT;
    if (typeof t1 !== 'number') return this.render$1$bailout(21, c, t1, 0, 0);
    c.fillRect$4(0, t1 - 50, $.SCREEN_WIDTH, 50);
    c.set$fillStyle('#fff');
    c.set$font('24px Arial');
    t3 = this.slides;
    t4 = this.currentSlide;
    if (t4 !== (t4 | 0)) throw $.iae(t4);
    var t5 = t3.length;
    if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
    t4 = t3[t4];
    t3 = $.SCREEN_HEIGHT;
    if (typeof t3 !== 'number') return this.render$1$bailout(22, c, t3, t4, 0);
    c.fillText$3(t4, 50, t3 - 20);
    c.set$fillStyle('#000');
    c.set$globalAlpha($.Math_pow((this.slideTime - 150) / 150, 2));
    c.fillRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
    c.set$globalAlpha(1);
  }
 },
 render$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var c = env0;
      t1 = env1;
      break;
    case 2:
      c = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      c = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 4:
      c = env0;
      t2 = env1;
      t4 = env2;
      t1 = env3;
      break;
    case 5:
      c = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 6:
      c = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 7:
      c = env0;
      t1 = env1;
      t2 = env2;
      t4 = env3;
      break;
    case 8:
      c = env0;
      t2 = env1;
      t1 = env2;
      t6 = env3;
      break;
    case 9:
      c = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 10:
      c = env0;
      t1 = env1;
      t2 = env2;
      t4 = env3;
      break;
    case 11:
      c = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 12:
      c = env0;
      t2 = env1;
      t4 = env2;
      t1 = env3;
      break;
    case 13:
      c = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 14:
      c = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 15:
      c = env0;
      t2 = env1;
      t1 = env2;
      t4 = env3;
      break;
    case 16:
      c = env0;
      t1 = env1;
      t6 = env2;
      t2 = env3;
      break;
    case 17:
      c = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 18:
      c = env0;
      t2 = env1;
      t4 = env2;
      t1 = env3;
      break;
    case 19:
      c = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 20:
      c = env0;
      t4 = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 21:
      c = env0;
      t1 = env1;
      break;
    case 22:
      c = env0;
      t3 = env1;
      t4 = env2;
      break;
  }
  switch (state) {
    case 0:
      c.setTransform$6(1, 0, 0, 1, 0, 0);
      c.clearRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
      c.save$0();
      var t1 = $.SCREEN_WIDTH;
    case 1:
      state = 0;
      t1 = $.div(t1, 2);
      var t3 = $.SCREEN_HEIGHT;
    case 2:
      state = 0;
      c.translate$2(t1, $.div(t3, 2));
      t1 = this.camera;
      c.scale$2(t1.get$animatedZoom(), t1.get$animatedZoom());
      var t2 = t1.get$x();
    case 3:
      state = 0;
      var t4 = $.SCREEN_WIDTH;
    case 4:
      state = 0;
    default:
      if (state == 5 || (state == 0 && $.ltB($.sub(t2, $.div(t4, 2)), 0))) {
        switch (state) {
          case 0:
            t2 = $.SCREEN_WIDTH;
          case 5:
            state = 0;
            t1.set$x($.div(t2, 2));
        }
      } else {
        switch (state) {
          case 0:
            t2 = t1.get$x();
          case 6:
            state = 0;
            t4 = $.SCREEN_WIDTH;
          case 7:
            state = 0;
            t2 = $.add(t2, $.div(t4, 2));
            var t6 = this.map_width;
          case 8:
            state = 0;
          default:
            if (state == 9 || state == 10 || (state == 0 && $.gtB(t2, $.mul(t6, 32)))) {
              switch (state) {
                case 0:
                  t2 = this.map_width;
                case 9:
                  state = 0;
                  t2 = $.mul(t2, 32);
                  t4 = $.SCREEN_WIDTH;
                case 10:
                  state = 0;
                  t1.set$x($.sub(t2, $.div(t4, 2)));
              }
            }
        }
      }
      t2 = t1.get$y();
    case 11:
      state = 0;
      t4 = $.SCREEN_HEIGHT;
    case 12:
      state = 0;
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      if (state == 13 || (state == 0 && $.ltB($.sub(t2, $.div(t4, 2)), 0))) {
        switch (state) {
          case 0:
            t2 = $.SCREEN_HEIGHT;
          case 13:
            state = 0;
            t1.set$y($.div(t2, 2));
        }
      } else {
        switch (state) {
          case 0:
            t2 = t1.get$y();
          case 14:
            state = 0;
            t4 = $.SCREEN_HEIGHT;
          case 15:
            state = 0;
            t2 = $.add(t2, $.div(t4, 2));
            t6 = this.map_width;
          case 16:
            state = 0;
          default:
            if (state == 17 || state == 18 || (state == 0 && $.gtB(t2, $.mul(t6, 32)))) {
              switch (state) {
                case 0:
                  t2 = this.map_width;
                case 17:
                  state = 0;
                  t2 = $.mul(t2, 32);
                  t4 = $.SCREEN_HEIGHT;
                case 18:
                  state = 0;
                  t1.set$y($.sub(t2, $.div(t4, 2)));
              }
            }
        }
      }
      t2 = t1.get$x();
    case 19:
      state = 0;
      t2 = $.neg(t2);
      t4 = t1.get$y();
    case 20:
      state = 0;
      c.translate$2(t2, $.neg(t4));
      c.set$font('12px Arial');
      c.set$textAlign('center');
      this.bottomTileManager.render$2(c, t1);
      $.forEach(this.onscene, new $.World_render_anon(c));
      if ($.DEBUG === true) {
        c.set$globalAlpha(0.5);
        $.forEach(this.paths, new $.World_render_anon0(c));
      }
      this.topTileManager.render$2(c, t1);
      c.restore$0();
      this.overlay.render$2(c, t1);
      $.forEach(this.menuInterfaces, new $.World_render_anon1(c));
      $.renderNotifications(c);
      this.renderSaved$1(c);
      this.renderCoins$1(c);
    case 21:
    case 22:
      if (state == 21 || state == 22 || (state == 0 && this.intro === true)) {
        switch (state) {
          case 0:
            c.set$globalAlpha(1);
            c.set$fillStyle('#000');
            t1 = $.SCREEN_HEIGHT;
          case 21:
            state = 0;
            c.fillRect$4(0, $.sub(t1, 50), $.SCREEN_WIDTH, 50);
            c.set$fillStyle('#fff');
            c.set$font('24px Arial');
            t3 = this.slides;
            t4 = this.currentSlide;
            if (t4 !== (t4 | 0)) throw $.iae(t4);
            var t5 = t3.length;
            if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
            t4 = t3[t4];
            t3 = $.SCREEN_HEIGHT;
          case 22:
            state = 0;
            c.fillText$3(t4, 50, $.sub(t3, 20));
            c.set$fillStyle('#000');
            c.set$globalAlpha($.Math_pow((this.slideTime - 150) / 150, 2));
            c.fillRect$4(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);
            c.set$globalAlpha(1);
        }
      }
  }
 },
 damageBubble$4: function(point, radius, damage, direction) {
  var attacked = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(attacked, ({E: 'Avatar'}));
  $.forEach($.index($.tags, 'actor'), new $.World_damageBubble_anon(direction, attacked, radius, point, damage));
  return attacked;
 },
 giveCoin$2: function(at, amt) {
  if (typeof amt !== 'number') return this.giveCoin$2$bailout(1, at, amt, 0);
  var t1 = this.coin;
  if (typeof t1 !== 'number') return this.giveCoin$2$bailout(2, at, amt, t1);
  this.coin = t1 + amt;
  this.spawnObject$2('floating_text', $.makeLiteralMap(['x', at.get$x(), 'y', at.get$y(), 'text', '+' + $.S(amt)]));
  $.audio.play$1('coin');
 },
 giveCoin$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var at = env0;
      var amt = env1;
      break;
    case 2:
      at = env0;
      amt = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this.coin;
    case 2:
      state = 0;
      this.coin = $.add(t1, amt);
      this.spawnObject$2('floating_text', $.makeLiteralMap(['x', at.get$x(), 'y', at.get$y(), 'text', '+' + $.S(amt)]));
      $.audio.play$1('coin');
  }
 },
 renderCoins$1: function(c) {
  c.set$fillStyle('yellow');
  c.set$font('18px Arial');
  c.set$globalAlpha(0.75);
  c.fillText$3($.S(this.coin) + 'c', 15, 18);
  c.set$globalAlpha(1);
 },
 renderSaved$1: function(c) {
  if (!$.eqB(this.lastSaved, this.saved)) {
    this.lastSaved = this.saved;
    $.notify('Saved : ' + $.S(this.saved));
  }
 },
 update$0: function() {
  var t1 = $.rpatCount;
  if (typeof t1 !== 'number') return this.update$0$bailout(1, t1, 0, 0, 0, 0);
  var t3 = $.Math_random();
  if (typeof t3 !== 'number') return this.update$0$bailout(2, t1, t3, 0, 0, 0);
  var t5 = $.toInt(t3 * 64);
  if (typeof t5 !== 'number') return this.update$0$bailout(3, t5, t1, 0, 0, 0);
  $.rpatCount = t1 + t5;
  t1 = this.night_mode;
  if (t1) {
    var t2 = this.time;
    if (typeof t2 !== 'number') return this.update$0$bailout(4, t2, 0, 0, 0, 0);
    if (t2 > 6.5) {
      if (typeof t2 !== 'number') return this.update$0$bailout(5, t2, 0, 0, 0, 0);
      t2 = t2 < 21;
    } else t2 = false;
  } else t2 = false;
  if (t2) {
    this.night_mode = false;
    t1 = this.dayCount;
    if (typeof t1 !== 'number') return this.update$0$bailout(6, t1, 0, 0, 0, 0);
    this.dayCount = t1 + 1;
    this.zombie_out = 0;
    $.notify('Day ' + $.S(this.dayCount));
    $.notify('Total Population : ' + $.S(this.totalPopulation));
    t1 = this.totalPopulation;
    if (typeof t1 !== 'number') return this.update$0$bailout(7, t1, 0, 0, 0, 0);
    if (t1 < 100) {
      if (typeof t1 !== 'number') return this.update$0$bailout(8, t1, 0, 0, 0, 0);
      if (t1 < 50) {
        $.notify('The population has fallen below 50');
        $.GameOver($.game.get$context());
      } else $.notify('WARNING! If your population falls below 50 you lose!');
    }
    t1 = this.dayCount;
    if (typeof t1 !== 'number') return this.update$0$bailout(9, t1, 0, 0, 0, 0);
    t1 > 1 && this.increaseDifficulty$0();
    $.tags.containsKey$1('lost') === true && $.forEach($.index($.tags, 'lost'), new $.World_update_anon());
    $.tags.containsKey$1('following') === true && $.forEach($.index($.tags, 'following'), new $.World_update_anon0());
    $.tags.containsKey$1('zombie') === true && $.forEach($.index($.tags, 'zombie'), new $.World_update_anon1());
  } else {
    if (!t1) {
      t1 = this.time;
      if (typeof t1 !== 'number') return this.update$0$bailout(10, t1, 0, 0, 0, 0);
      if (!(t1 > 21)) {
        if (typeof t1 !== 'number') return this.update$0$bailout(11, t1, 0, 0, 0, 0);
        t1 = t1 < 6.5;
      } else t1 = true;
    } else t1 = false;
    if (t1) {
      this.night_mode = true;
      $.forEach($.index($.tags, 'wander'), new $.World_update_anon2());
      $.notify('Lost Citizens : ' + $.S($.get$length($.index($.tags, 'lost'))));
      $.notify('Save as many as possible!');
    }
  }
  if (!this.night_mode) {
    t1 = this.time;
    if (typeof t1 !== 'number') return this.update$0$bailout(12, t1, 0, 0, 0, 0);
    t1 = t1 > 16 && $.rpat(5) === true;
  } else t1 = false;
  if (t1) {
    t1 = $.index($.tags, 'wander');
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.update$0$bailout(13, t1, 0, 0, 0, 0);
    t3 = $.get$length($.index($.tags, 'wander'));
    if (typeof t3 !== 'number') return this.update$0$bailout(14, t3, t1, 0, 0, 0);
    t5 = $.Math_random();
    if (typeof t5 !== 'number') return this.update$0$bailout(15, t3, t1, t5, 0, 0);
    var t7 = $.toInt(t3 * t5);
    if (t7 !== (t7 | 0)) throw $.iae(t7);
    var t8 = t1.length;
    if (t7 < 0 || t7 >= t8) throw $.ioore(t7);
    var citizen = t1[t7];
    if (citizen.hasTag$1('ai') === true && (citizen.hasTag$1('lost') !== true && citizen.hasTag$1('citizen') === true)) {
      t1 = $.Math_random();
      if (typeof t1 !== 'number') return this.update$0$bailout(16, citizen, t1, 0, 0, 0);
      if (t1 < 0.9) {
        $.switchTag(citizen, 'wander', 'homebound');
        $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(citizen);
      } else {
        $.add$1(citizen.get$tags(), 'lost');
        $.addTag(citizen, 'lost');
      }
    }
  }
  if (!this.night_mode) {
    t1 = this.time;
    if (typeof t1 !== 'number') return this.update$0$bailout(17, t1, 0, 0, 0, 0);
    if (t1 < 12) {
      t1 = this.awakePopulation;
      if (typeof t1 !== 'number') return this.update$0$bailout(18, t1, 0, 0, 0, 0);
      t3 = this.totalPopulation;
      if (typeof t3 !== 'number') return this.update$0$bailout(19, t1, t3, 0, 0, 0);
      t3 = t1 < t3;
      t1 = t3;
    } else t1 = false;
  } else t1 = false;
  if (t1) {
    t1 = $.index($.tags, 'house');
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.update$0$bailout(20, t1, 0, 0, 0, 0);
    t3 = $.get$length($.index($.tags, 'house'));
    if (typeof t3 !== 'number') return this.update$0$bailout(21, t3, t1, 0, 0, 0);
    t5 = $.Math_random();
    if (typeof t5 !== 'number') return this.update$0$bailout(22, t3, t1, t5, 0, 0);
    t7 = $.toInt(t3 * t5);
    if (t7 !== (t7 | 0)) throw $.iae(t7);
    t8 = t1.length;
    if (t7 < 0 || t7 >= t8) throw $.ioore(t7);
    var house = t1[t7];
    t1 = $.Math_random();
    if (typeof t1 !== 'number') return this.update$0$bailout(23, t1, house, 0, 0, 0);
    this.spawnObject$2('citizen', $.makeLiteralMap(['tag', ['friendly', t1 < 0.5 ? 'wander' : 'traveler', 'ai'], 'x', house.get$x(), 'y', house.get$y(), 'home', house]));
    t1 = this.awakePopulation;
    if (typeof t1 !== 'number') return this.update$0$bailout(24, t1, 0, 0, 0, 0);
    this.awakePopulation = t1 + 1;
  }
  if (this.night_mode) {
    t1 = this.time;
    if (typeof t1 !== 'number') return this.update$0$bailout(25, t1, 0, 0, 0, 0);
    if (!(t1 < 4)) {
      if (typeof t1 !== 'number') return this.update$0$bailout(26, t1, 0, 0, 0, 0);
      t1 = t1 > 21;
    } else t1 = true;
    if (t1) {
      t1 = this.zombie_out;
      t2 = this.zombie_max;
      if (typeof t2 !== 'number') return this.update$0$bailout(27, t2, t1, 0, 0, 0);
      if (!(t1 < t2 - 50)) {
        if (typeof t2 !== 'number') return this.update$0$bailout(28, t1, t2, 0, 0, 0);
        t1 = t1 < t2 && $.rpat(32) === true;
      } else t1 = true;
      if (t1) {
        this.zombie_out = this.zombie_out + 1;
        var zs_list = $.index($.tags, 'zombie-spawn');
        if (typeof zs_list !== 'string' && (typeof zs_list !== 'object' || zs_list === null || (zs_list.constructor !== Array && !zs_list.is$JavaScriptIndexingBehavior()))) return this.update$0$bailout(29, zs_list, 0, 0, 0, 0);
        t2 = zs_list.length;
        t3 = $.Math_random();
        if (typeof t3 !== 'number') return this.update$0$bailout(30, t2, t3, zs_list, 0, 0);
        t5 = $.toInt(t2 * t3);
        if (t5 !== (t5 | 0)) throw $.iae(t5);
        var t6 = zs_list.length;
        if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
        var zs = zs_list[t5];
        this.spawnObject$2('zombie', $.makeLiteralMap(['x', zs.get$x(), 'y', zs.get$y()]));
      }
    } else {
      if (this.zombie_out > 0 && $.rpat(16) === true) {
        t1 = $.index($.tags, 'zombie');
        if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.update$0$bailout(31, t1, 0, 0, 0, 0);
        t3 = $.get$length($.index($.tags, 'zombie'));
        if (typeof t3 !== 'number') return this.update$0$bailout(32, t3, t1, 0, 0, 0);
        t5 = $.Math_random();
        if (typeof t5 !== 'number') return this.update$0$bailout(33, t3, t1, t5, 0, 0);
        t7 = $.toInt(t3 * t5);
        if (t7 !== (t7 | 0)) throw $.iae(t7);
        t8 = t1.length;
        if (t7 < 0 || t7 >= t8) throw $.ioore(t7);
        var zom = t1[t7];
        if (zom.hasTag$1('nestbound') !== true) {
          zom.removeTag$1('hostile');
          $.rmTag(zom, 'hostile');
          zom.removeTag$1('hostile-wander');
          $.rmTag(zom, 'hostile-wander');
          $.add$1(zom.get$tags(), 'nestbound');
          $.addTag(zom, 'nestbound');
          $.index($.index($.tagEvents, 'nestbound'), 'init').$call$1(zom);
        }
      }
    }
  }
  if ($.rpat(1000) === true) {
    var protips = ['You can switch weapons with E', 'Villagers tend to be meaner when you kill them', 'All weapons, upgrades and coins are preserved between games', 'Upgrades can be purchased for all weapons', 'Zombies grow stronger every day, equip yourself accordingly', 'You can press T to speed up time'];
    t1 = protips.length;
    t2 = $.Math_random();
    if (typeof t2 !== 'number') throw $.iae(t2);
    t3 = $.toInt(t1 * t2);
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    var t4 = protips.length;
    if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
    $.notify('Tip : ' + $.S(protips[t3]));
  }
  if (this.night_mode) {
    if ($.rpat(60) === true) {
      if ($.tags.containsKey$1('lost') === true) {
        t1 = $.get$length($.index($.tags, 'lost'));
        if (typeof t1 !== 'number') return this.update$0$bailout(34, t1, 0, 0, 0, 0);
        t1 = t1 > 0;
      } else t1 = false;
    } else t1 = false;
  } else t1 = false;
  if (t1) {
    t1 = $.index($.tags, 'lost');
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.update$0$bailout(35, t1, 0, 0, 0, 0);
    t3 = $.get$length($.index($.tags, 'lost'));
    if (typeof t3 !== 'number') return this.update$0$bailout(36, t3, t1, 0, 0, 0);
    t5 = $.Math_random();
    if (typeof t5 !== 'number') return this.update$0$bailout(37, t3, t1, t5, 0, 0);
    t7 = $.toInt(t3 * t5);
    if (t7 !== (t7 | 0)) throw $.iae(t7);
    t8 = t1.length;
    if (t7 < 0 || t7 >= t8) throw $.ioore(t7);
    t7 = t1[t7];
    t1 = $.Math_random();
    if (typeof t1 !== 'number') throw $.iae(t1);
    var t9 = $.toInt(5 * t1);
    if (t9 !== (t9 | 0)) throw $.iae(t9);
    if (t9 < 0 || t9 >= 5) throw $.ioore(t9);
    t7.say$1($.CTC32[t9]);
  }
  if (this.intro !== true) {
    t1 = $.event.key$1('d');
    if (typeof t1 !== 'number') return this.update$0$bailout(38, t1, 0, 0, 0, 0);
    t3 = $.event.key$1('a');
    if (typeof t3 !== 'number') return this.update$0$bailout(39, t3, t1, 0, 0, 0);
    t3 = t1 - t3;
    t1 = $.event.key$1('s');
    if (typeof t1 !== 'number') return this.update$0$bailout(40, t3, t1, 0, 0, 0);
    t6 = $.event.key$1('w');
    if (typeof t6 !== 'number') return this.update$0$bailout(41, t6, t3, t1, 0, 0);
    var inc = $.Vec2$(t3, t1 - t6);
    t3 = inc.normalize$0();
    t8 = $.event.key$1('shift');
    if (typeof t8 !== 'number') throw $.iae(t8);
    t3.multiplyScalar$1(2 * (1 + 1 * t8));
    $.add$1(this.player.get$velocity(), inc);
  } else {
    this.slideTime = this.slideTime + 1;
    t1 = this.slidex_pos;
    t2 = this.currentSlide;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    t1 = t1[t2];
    if (typeof t1 !== 'number') return this.update$0$bailout(42, t1, 0, 0, 0, 0);
    t5 = this.slideTime;
    t6 = this.slide_dir;
    t7 = t6.length;
    if (t2 < 0 || t2 >= t7) throw $.ioore(t2);
    t2 = t6[t2];
    if (typeof t2 !== 'number') return this.update$0$bailout(43, t2, t5, t1, 0, 0);
    t1 += t5 * t2;
    t8 = this.camera;
    t8.x = t1;
    t1 = this.slidey_pos;
    t9 = this.currentSlide;
    if (t9 !== (t9 | 0)) throw $.iae(t9);
    var t10 = t1.length;
    if (t9 < 0 || t9 >= t10) throw $.ioore(t9);
    t8.y = t1[t9];
    this.player.set$2(t8.x, t8.y);
    if (this.slideTime >= 300) {
      this.slideTime = 0;
      this.currentSlide = this.currentSlide + 1;
      if (this.currentSlide >= this.slides.length) {
        this.intro = false;
        $.notify('Day ' + $.S(this.dayCount));
        $.notify('Total Population : ' + $.S(this.totalPopulation));
        this.player.set$2(4793, 4342);
        t1 = this.player_animation;
        this.player.set$animation(t1);
        $.notify('Explore the island while it\'s safe!');
      }
    }
  }
  if ($.event.get$mouseDown() === true) {
    t1 = this.player.get$currentAttackTime();
    if (typeof t1 !== 'number') return this.update$0$bailout(44, t1, 0, 0, 0, 0);
    if (t1 === 0) {
      t1 = this.weaponStartFrame;
      t2 = this.currentWeapon;
      if (t2 !== (t2 | 0)) throw $.iae(t2);
      t3 = t1.length;
      if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
      t2 = t1[t2];
      if (typeof t2 !== 'number') return this.update$0$bailout(45, t2, 0, 0, 0, 0);
      t2 *= 5;
      this.player.set$currentFrame(t2);
    }
    this.player.set$attacking(true);
    t1 = $.event.get$mouse_position().clone$0();
    t2 = $.SCREEN_WIDTH;
    if (typeof t2 !== 'number') return this.update$0$bailout(46, t2, t1, 0, 0, 0);
    t2 /= 2;
    t4 = $.SCREEN_HEIGHT;
    if (typeof t4 !== 'number') return this.update$0$bailout(47, t2, t4, t1, 0, 0);
    t6 = t1.subTo$2(t2, t4 / 2).normalize$0();
    this.player.set$attackDirection(t6);
  } else {
    this.player.set$currentAttackTime(0);
    this.player.set$attacking(false);
  }
  t1 = this.camera;
  t2 = t1.x;
  if (typeof t2 !== 'number') return this.update$0$bailout(48, t2, t1, 0, 0, 0);
  if (typeof t2 !== 'number') return this.update$0$bailout(49, t2, t2, t1, 0, 0);
  t5 = this.player.get$x();
  if (typeof t5 !== 'number') return this.update$0$bailout(50, t2, t2, t1, t5, 0);
  t7 = this.player.get$velocity().get$x();
  if (typeof t7 !== 'number') return this.update$0$bailout(51, t7, t2, t2, t1, t5);
  t1.x = t2 - (t2 - (t5 + t7 * 5)) / 5;
  t9 = t1.y;
  if (typeof t9 !== 'number') return this.update$0$bailout(52, t1, t9, 0, 0, 0);
  if (typeof t9 !== 'number') return this.update$0$bailout(53, t1, t9, t9, 0, 0);
  var t12 = this.player.get$y();
  if (typeof t12 !== 'number') return this.update$0$bailout(54, t12, t1, t9, t9, 0);
  var t14 = this.player.get$velocity().get$y();
  if (typeof t14 !== 'number') return this.update$0$bailout(55, t12, t1, t14, t9, t9);
  t1.y = t9 - (t9 - (t12 + t14 * 5)) / 5;
  if ($.DEBUG === true) {
    t2 = t1.get$zoom();
    if (typeof t2 !== 'number') return this.update$0$bailout(56, t1, t2, 0, 0, 0);
    t4 = $.event.key$1('up');
    if (typeof t4 !== 'number') return this.update$0$bailout(57, t4, t1, t2, 0, 0);
    t6 = $.event.key$1('down');
    if (typeof t6 !== 'number') return this.update$0$bailout(58, t4, t1, t6, t2, 0);
    t1.set$zoom(t2 + (t4 - t6) / 10.0);
  }
  t1.update$0();
  if ($.tags.containsKey$1('uninit') === true) {
    $.forEach($.index($.tags, 'uninit'), new $.World_update_anon3());
    t1 = $.tags;
    t2 = $.ListFactory_List(null);
    $.setRuntimeTypeInfo(t2, ({E: 'GameObject'}));
    $.indexSet(t1, 'uninit', t2);
  }
  for (t1 = $.iterator($.tags.getKeys$0()); t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    t3 = $.tags;
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.update$0$bailout(59, t2, t1, t3, 0, 0);
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    t5 = t3.length;
    if (t2 < 0 || t2 >= t5) throw $.ioore(t2);
    var lst = t3[t2];
    if (typeof lst !== 'string' && (typeof lst !== 'object' || lst === null || (lst.constructor !== Array && !lst.is$JavaScriptIndexingBehavior()))) return this.update$0$bailout(60, t1, lst, 0, 0, 0);
    t2 = $.Math_random();
    if (typeof t2 !== 'number') return this.update$0$bailout(61, t2, t1, lst, 0, 0);
    var i = $.toInt(t2 * lst.length);
    if (typeof i !== 'number') return this.update$0$bailout(62, t1, lst, i, 0, 0);
    var iter = 0;
    for (; t2 = lst.length, iter < t2 / 16; ++iter, ++i) {
      var index = $.mod(i, t2);
      if (index !== (index | 0)) throw $.iae(index);
      if (index < 0 || index >= t2) throw $.ioore(index);
      lst[index].get$markedForRemoval() === true && $.removeRange(lst, index, 1);
    }
  }
  t1 = this.objects;
  t2 = t1.length;
  t3 = $.Math_random();
  if (typeof t3 !== 'number') return this.update$0$bailout(63, t3, t1, t2, 0, 0);
  i = $.toInt(t2 * t3);
  if (typeof i !== 'number') return this.update$0$bailout(64, i, t1, 0, 0, 0);
  iter = 0;
  for (; t2 = t1.length, iter < t2 / 16; ++iter, ++i) {
    index = $.mod(i, t2);
    if (index !== (index | 0)) throw $.iae(index);
    if (index < 0 || index >= t2) throw $.ioore(index);
    t1[index].get$markedForRemoval() === true && $.removeRange(t1, index, 1);
  }
  $.forEach(t1, new $.World_update_anon4());
  $.tags.containsKey$1('actor') === true && $.forEach($.index($.tags, 'actor'), new $.World_update_anon5(this));
  $.tags.containsKey$1('spawn') === true && $.forEach($.index($.tags, 'spawn'), new $.World_update_anon6());
  this.sortScreenObjects$0();
  t1 = this.time;
  if (typeof t1 !== 'number') return this.update$0$bailout(65, t1, 0, 0, 0, 0);
  t3 = this.dayLength;
  if (typeof t3 !== 'number') throw $.iae(t3);
  this.time = t1 + 24 / t3;
  t1 = this.time;
  if (typeof t1 !== 'number') return this.update$0$bailout(66, t1, 0, 0, 0, 0);
  if (t1 > 24) this.time = 0;
 },
 update$0$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
    case 3:
      t5 = env0;
      t1 = env1;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t1 = env0;
      break;
    case 6:
      t1 = env0;
      break;
    case 7:
      t1 = env0;
      break;
    case 8:
      t1 = env0;
      break;
    case 9:
      t1 = env0;
      break;
    case 10:
      t1 = env0;
      break;
    case 11:
      t1 = env0;
      break;
    case 12:
      t1 = env0;
      break;
    case 13:
      t1 = env0;
      break;
    case 14:
      t3 = env0;
      t1 = env1;
      break;
    case 15:
      t3 = env0;
      t1 = env1;
      t5 = env2;
      break;
    case 16:
      citizen = env0;
      t1 = env1;
      break;
    case 17:
      t1 = env0;
      break;
    case 18:
      t1 = env0;
      break;
    case 19:
      t1 = env0;
      t3 = env1;
      break;
    case 20:
      t1 = env0;
      break;
    case 21:
      t3 = env0;
      t1 = env1;
      break;
    case 22:
      t3 = env0;
      t1 = env1;
      t5 = env2;
      break;
    case 23:
      t1 = env0;
      house = env1;
      break;
    case 24:
      t1 = env0;
      break;
    case 25:
      t1 = env0;
      break;
    case 26:
      t1 = env0;
      break;
    case 27:
      t2 = env0;
      t1 = env1;
      break;
    case 28:
      t1 = env0;
      t2 = env1;
      break;
    case 29:
      zs_list = env0;
      break;
    case 30:
      t2 = env0;
      t3 = env1;
      zs_list = env2;
      break;
    case 31:
      t1 = env0;
      break;
    case 32:
      t3 = env0;
      t1 = env1;
      break;
    case 33:
      t3 = env0;
      t1 = env1;
      t5 = env2;
      break;
    case 34:
      t1 = env0;
      break;
    case 35:
      t1 = env0;
      break;
    case 36:
      t3 = env0;
      t1 = env1;
      break;
    case 37:
      t3 = env0;
      t1 = env1;
      t5 = env2;
      break;
    case 38:
      t1 = env0;
      break;
    case 39:
      t3 = env0;
      t1 = env1;
      break;
    case 40:
      t3 = env0;
      t1 = env1;
      break;
    case 41:
      t6 = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 42:
      t2 = env0;
      break;
    case 43:
      t6 = env0;
      t4 = env1;
      t2 = env2;
      break;
    case 44:
      t1 = env0;
      break;
    case 45:
      t2 = env0;
      break;
    case 46:
      t2 = env0;
      t1 = env1;
      break;
    case 47:
      t2 = env0;
      t4 = env1;
      t1 = env2;
      break;
    case 48:
      t2 = env0;
      t1 = env1;
      break;
    case 49:
      t2 = env0;
      t4 = env1;
      t1 = env2;
      break;
    case 50:
      t2 = env0;
      t4 = env1;
      t1 = env2;
      t6 = env3;
      break;
    case 51:
      t8 = env0;
      t2 = env1;
      t4 = env2;
      t1 = env3;
      t6 = env4;
      break;
    case 52:
      t1 = env0;
      t10 = env1;
      break;
    case 53:
      t1 = env0;
      t10 = env1;
      t12 = env2;
      break;
    case 54:
      t14 = env0;
      t1 = env1;
      t10 = env2;
      t12 = env3;
      break;
    case 55:
      t14 = env0;
      t1 = env1;
      t16 = env2;
      t10 = env3;
      t12 = env4;
      break;
    case 56:
      t1 = env0;
      t2 = env1;
      break;
    case 57:
      t4 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 58:
      t4 = env0;
      t1 = env1;
      t6 = env2;
      t2 = env3;
      break;
    case 59:
      t2 = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 60:
      t1 = env0;
      lst = env1;
      break;
    case 61:
      t2 = env0;
      t1 = env1;
      lst = env2;
      break;
    case 62:
      t1 = env0;
      lst = env1;
      i = env2;
      break;
    case 63:
      t3 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 64:
      i = env0;
      t1 = env1;
      break;
    case 65:
      t1 = env0;
      break;
    case 66:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.rpatCount;
    case 1:
      state = 0;
      var t3 = $.Math_random();
    case 2:
      state = 0;
      var t5 = $.toInt($.mul(t3, 64));
    case 3:
      state = 0;
      $.rpatCount = $.add(t1, t5);
    default:
      if (state == 4 || state == 5 || (state == 0 && this.night_mode === true)) {
        switch (state) {
          case 0:
            t1 = this.time;
          case 4:
            state = 0;
          case 5:
            if (state == 5 || (state == 0 && $.gtB(t1, 6.5))) {
              switch (state) {
                case 0:
                  t1 = this.time;
                case 5:
                  state = 0;
                  t1 = $.ltB(t1, 21);
              }
            } else {
              t1 = false;
            }
        }
      } else {
        t1 = false;
      }
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      if (state == 6 || state == 7 || state == 8 || state == 9 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            this.night_mode = false;
            t1 = this.dayCount;
          case 6:
            state = 0;
            this.dayCount = $.add(t1, 1);
            this.zombie_out = 0;
            $.notify('Day ' + $.S(this.dayCount));
            $.notify('Total Population : ' + $.S(this.totalPopulation));
            t1 = this.totalPopulation;
          case 7:
            state = 0;
          case 8:
            if (state == 8 || (state == 0 && $.ltB(t1, 100))) {
              switch (state) {
                case 0:
                  t1 = this.totalPopulation;
                case 8:
                  state = 0;
                  if ($.ltB(t1, 50)) {
                    $.notify('The population has fallen below 50');
                    $.GameOver($.game.get$context());
                  } else $.notify('WARNING! If your population falls below 50 you lose!');
              }
            }
            t1 = this.dayCount;
          case 9:
            state = 0;
            $.gtB(t1, 1) && this.increaseDifficulty$0();
            $.tags.containsKey$1('lost') === true && $.forEach($.index($.tags, 'lost'), new $.World_update_anon());
            $.tags.containsKey$1('following') === true && $.forEach($.index($.tags, 'following'), new $.World_update_anon0());
            $.tags.containsKey$1('zombie') === true && $.forEach($.index($.tags, 'zombie'), new $.World_update_anon1());
        }
      } else {
        switch (state) {
          case 0:
          default:
            if (state == 10 || state == 11 || (state == 0 && this.night_mode !== true)) {
              switch (state) {
                case 0:
                  t1 = this.time;
                case 10:
                  state = 0;
                case 11:
                  if (state == 11 || (state == 0 && !$.gtB(t1, 21))) {
                    switch (state) {
                      case 0:
                        t1 = this.time;
                      case 11:
                        state = 0;
                        t1 = $.ltB(t1, 6.5);
                    }
                  } else {
                    t1 = true;
                  }
              }
            } else {
              t1 = false;
            }
            if (t1) {
              this.night_mode = true;
              $.forEach($.index($.tags, 'wander'), new $.World_update_anon2());
              $.notify('Lost Citizens : ' + $.S($.get$length($.index($.tags, 'lost'))));
              $.notify('Save as many as possible!');
            }
        }
      }
    case 12:
      if (state == 12 || (state == 0 && this.night_mode !== true)) {
        switch (state) {
          case 0:
            t1 = this.time;
          case 12:
            state = 0;
            t1 = $.gtB(t1, 16) && $.rpat(5) === true;
        }
      } else {
        t1 = false;
      }
    case 13:
    case 14:
    case 15:
    case 16:
      if (state == 13 || state == 14 || state == 15 || state == 16 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = $.index($.tags, 'wander');
          case 13:
            state = 0;
            t3 = $.get$length($.index($.tags, 'wander'));
          case 14:
            state = 0;
            t5 = $.Math_random();
          case 15:
            state = 0;
            var citizen = $.index(t1, $.toInt($.mul(t3, t5)));
          case 16:
            if (state == 16 || (state == 0 && (citizen.hasTag$1('ai') === true && (citizen.hasTag$1('lost') !== true && citizen.hasTag$1('citizen') === true)))) {
              switch (state) {
                case 0:
                  t1 = $.Math_random();
                case 16:
                  state = 0;
                  if ($.ltB(t1, 0.9)) {
                    $.switchTag(citizen, 'wander', 'homebound');
                    $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(citizen);
                  } else {
                    $.add$1(citizen.get$tags(), 'lost');
                    $.addTag(citizen, 'lost');
                  }
              }
            }
        }
      }
    case 17:
    case 18:
    case 19:
      if (state == 17 || state == 18 || state == 19 || (state == 0 && this.night_mode !== true)) {
        switch (state) {
          case 0:
            t1 = this.time;
          case 17:
            state = 0;
          default:
            if (state == 18 || state == 19 || (state == 0 && $.ltB(t1, 12))) {
              switch (state) {
                case 0:
                  t1 = this.awakePopulation;
                case 18:
                  state = 0;
                  t3 = this.totalPopulation;
                case 19:
                  state = 0;
                  t3 = $.ltB(t1, t3);
                  t1 = t3;
              }
            } else {
              t1 = false;
            }
        }
      } else {
        t1 = false;
      }
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
      if (state == 20 || state == 21 || state == 22 || state == 23 || state == 24 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = $.index($.tags, 'house');
          case 20:
            state = 0;
            t3 = $.get$length($.index($.tags, 'house'));
          case 21:
            state = 0;
            t5 = $.Math_random();
          case 22:
            state = 0;
            var house = $.index(t1, $.toInt($.mul(t3, t5)));
            t1 = $.Math_random();
          case 23:
            state = 0;
            this.spawnObject$2('citizen', $.makeLiteralMap(['tag', ['friendly', $.ltB(t1, 0.5) ? 'wander' : 'traveler', 'ai'], 'x', house.get$x(), 'y', house.get$y(), 'home', house]));
            t1 = this.awakePopulation;
          case 24:
            state = 0;
            this.awakePopulation = $.add(t1, 1);
        }
      }
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
    case 33:
      if (state == 25 || state == 26 || state == 27 || state == 28 || state == 29 || state == 30 || state == 31 || state == 32 || state == 33 || (state == 0 && this.night_mode === true)) {
        switch (state) {
          case 0:
            t1 = this.time;
          case 25:
            state = 0;
          case 26:
            if (state == 26 || (state == 0 && !$.ltB(t1, 4))) {
              switch (state) {
                case 0:
                  t1 = this.time;
                case 26:
                  state = 0;
                  t1 = $.gtB(t1, 21);
              }
            } else {
              t1 = true;
            }
          default:
            if (state == 27 || state == 28 || state == 29 || state == 30 || (state == 0 && t1)) {
              switch (state) {
                case 0:
                  t1 = this.zombie_out;
                  var t2 = this.zombie_max;
                case 27:
                  state = 0;
                case 28:
                  if (state == 28 || (state == 0 && !$.ltB(t1, $.sub(t2, 50)))) {
                    switch (state) {
                      case 0:
                        t1 = this.zombie_out;
                        t2 = this.zombie_max;
                      case 28:
                        state = 0;
                        t1 = $.ltB(t1, t2) && $.rpat(32) === true;
                    }
                  } else {
                    t1 = true;
                  }
                default:
                  if (state == 29 || state == 30 || (state == 0 && t1)) {
                    switch (state) {
                      case 0:
                        this.zombie_out = this.zombie_out + 1;
                        var zs_list = $.index($.tags, 'zombie-spawn');
                      case 29:
                        state = 0;
                        t2 = $.get$length(zs_list);
                        t3 = $.Math_random();
                      case 30:
                        state = 0;
                        var zs = $.index(zs_list, $.toInt($.mul(t2, t3)));
                        this.spawnObject$2('zombie', $.makeLiteralMap(['x', zs.get$x(), 'y', zs.get$y()]));
                    }
                  }
              }
            } else {
              switch (state) {
                case 0:
                default:
                  if (state == 31 || state == 32 || state == 33 || (state == 0 && (this.zombie_out > 0 && $.rpat(16) === true))) {
                    switch (state) {
                      case 0:
                        t1 = $.index($.tags, 'zombie');
                      case 31:
                        state = 0;
                        t3 = $.get$length($.index($.tags, 'zombie'));
                      case 32:
                        state = 0;
                        t5 = $.Math_random();
                      case 33:
                        state = 0;
                        var zom = $.index(t1, $.toInt($.mul(t3, t5)));
                        if (zom.hasTag$1('nestbound') !== true) {
                          zom.removeTag$1('hostile');
                          $.rmTag(zom, 'hostile');
                          zom.removeTag$1('hostile-wander');
                          $.rmTag(zom, 'hostile-wander');
                          $.add$1(zom.get$tags(), 'nestbound');
                          $.addTag(zom, 'nestbound');
                          $.index($.index($.tagEvents, 'nestbound'), 'init').$call$1(zom);
                        }
                    }
                  }
              }
            }
        }
      }
      if ($.rpat(1000) === true) {
        var protips = ['You can switch weapons with E', 'Villagers tend to be meaner when you kill them', 'All weapons, upgrades and coins are preserved between games', 'Upgrades can be purchased for all weapons', 'Zombies grow stronger every day, equip yourself accordingly', 'You can press T to speed up time'];
        t1 = protips.length;
        t2 = $.Math_random();
        if (typeof t2 !== 'number') throw $.iae(t2);
        t3 = $.toInt(t1 * t2);
        if (t3 !== (t3 | 0)) throw $.iae(t3);
        var t4 = protips.length;
        if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
        $.notify('Tip : ' + $.S(protips[t3]));
      }
    case 34:
      if (state == 34 || (state == 0 && this.night_mode === true)) {
        switch (state) {
          case 0:
          case 34:
            if (state == 34 || (state == 0 && $.rpat(60) === true)) {
              switch (state) {
                case 0:
                case 34:
                  if (state == 34 || (state == 0 && $.tags.containsKey$1('lost') === true)) {
                    switch (state) {
                      case 0:
                        t1 = $.get$length($.index($.tags, 'lost'));
                      case 34:
                        state = 0;
                        t1 = $.gtB(t1, 0);
                    }
                  } else {
                    t1 = false;
                  }
              }
            } else {
              t1 = false;
            }
        }
      } else {
        t1 = false;
      }
    case 35:
    case 36:
    case 37:
      if (state == 35 || state == 36 || state == 37 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = $.index($.tags, 'lost');
          case 35:
            state = 0;
            t3 = $.get$length($.index($.tags, 'lost'));
          case 36:
            state = 0;
            t5 = $.Math_random();
          case 37:
            state = 0;
            t1 = $.index(t1, $.toInt($.mul(t3, t5)));
            var t7 = $.Math_random();
            if (typeof t7 !== 'number') throw $.iae(t7);
            var t8 = $.toInt(5 * t7);
            if (t8 !== (t8 | 0)) throw $.iae(t8);
            if (t8 < 0 || t8 >= 5) throw $.ioore(t8);
            t1.say$1($.CTC32[t8]);
        }
      }
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
      if (state == 38 || state == 39 || state == 40 || state == 41 || (state == 0 && this.intro !== true)) {
        switch (state) {
          case 0:
            t1 = $.event.key$1('d');
          case 38:
            state = 0;
            t3 = $.event.key$1('a');
          case 39:
            state = 0;
            t3 = $.sub(t1, t3);
            t1 = $.event.key$1('s');
          case 40:
            state = 0;
            var t6 = $.event.key$1('w');
          case 41:
            state = 0;
            var inc = $.Vec2$(t3, $.sub(t1, t6));
            t3 = inc.normalize$0();
            t8 = $.event.key$1('shift');
            if (typeof t8 !== 'number') throw $.iae(t8);
            t3.multiplyScalar$1(2 * (1 + 1 * t8));
            $.add$1(this.player.get$velocity(), inc);
        }
      } else {
        switch (state) {
          case 0:
            this.slideTime = this.slideTime + 1;
            t1 = this.slidex_pos;
            t2 = this.currentSlide;
            if (t2 !== (t2 | 0)) throw $.iae(t2);
            t3 = t1.length;
            if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
            t2 = t1[t2];
          case 42:
            state = 0;
            t4 = this.slideTime;
            t5 = this.slide_dir;
            t6 = this.currentSlide;
            if (t6 !== (t6 | 0)) throw $.iae(t6);
            t7 = t5.length;
            if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
            t6 = t5[t6];
          case 43:
            state = 0;
            if (typeof t6 !== 'number') throw $.iae(t6);
            t2 = $.add(t2, t4 * t6);
            t8 = this.camera;
            t8.set$x(t2);
            t2 = this.slidey_pos;
            var t9 = this.currentSlide;
            if (t9 !== (t9 | 0)) throw $.iae(t9);
            var t10 = t2.length;
            if (t9 < 0 || t9 >= t10) throw $.ioore(t9);
            t8.set$y(t2[t9]);
            this.player.set$2(t8.get$x(), t8.get$y());
            if (this.slideTime >= 300) {
              this.slideTime = 0;
              this.currentSlide = this.currentSlide + 1;
              if (this.currentSlide >= this.slides.length) {
                this.intro = false;
                $.notify('Day ' + $.S(this.dayCount));
                $.notify('Total Population : ' + $.S(this.totalPopulation));
                this.player.set$2(4793, 4342);
                t1 = this.player_animation;
                this.player.set$animation(t1);
                $.notify('Explore the island while it\'s safe!');
              }
            }
        }
      }
    case 44:
    case 45:
    case 46:
    case 47:
      if (state == 44 || state == 45 || state == 46 || state == 47 || (state == 0 && $.event.get$mouseDown() === true)) {
        switch (state) {
          case 0:
            t1 = this.player.get$currentAttackTime();
          case 44:
            state = 0;
          case 45:
            if (state == 45 || (state == 0 && $.eqB(t1, 0))) {
              switch (state) {
                case 0:
                  t1 = this.weaponStartFrame;
                  t2 = this.currentWeapon;
                  if (t2 !== (t2 | 0)) throw $.iae(t2);
                  t3 = t1.length;
                  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
                  t2 = t1[t2];
                case 45:
                  state = 0;
                  t2 = $.mul(t2, 5);
                  this.player.set$currentFrame(t2);
              }
            }
            this.player.set$attacking(true);
            t1 = $.event.get$mouse_position().clone$0();
            t2 = $.SCREEN_WIDTH;
          case 46:
            state = 0;
            t2 = $.div(t2, 2);
            t4 = $.SCREEN_HEIGHT;
          case 47:
            state = 0;
            t6 = t1.subTo$2(t2, $.div(t4, 2)).normalize$0();
            this.player.set$attackDirection(t6);
        }
      } else {
        this.player.set$currentAttackTime(0);
        this.player.set$attacking(false);
      }
      t1 = this.camera;
      t2 = t1.get$x();
    case 48:
      state = 0;
      t4 = t1.get$x();
    case 49:
      state = 0;
      t6 = this.player.get$x();
    case 50:
      state = 0;
      t8 = this.player.get$velocity().get$x();
    case 51:
      state = 0;
      t1.set$x($.sub(t2, $.div($.sub(t4, $.add(t6, $.mul(t8, 5))), 5)));
      t10 = t1.get$y();
    case 52:
      state = 0;
      var t12 = t1.get$y();
    case 53:
      state = 0;
      var t14 = this.player.get$y();
    case 54:
      state = 0;
      var t16 = this.player.get$velocity().get$y();
    case 55:
      state = 0;
      t1.set$y($.sub(t10, $.div($.sub(t12, $.add(t14, $.mul(t16, 5))), 5)));
    case 56:
    case 57:
    case 58:
      if (state == 56 || state == 57 || state == 58 || (state == 0 && $.DEBUG === true)) {
        switch (state) {
          case 0:
            t2 = t1.get$zoom();
          case 56:
            state = 0;
            t4 = $.event.key$1('up');
          case 57:
            state = 0;
            t6 = $.event.key$1('down');
          case 58:
            state = 0;
            t1.set$zoom($.add(t2, $.div($.sub(t4, t6), 10.0)));
        }
      }
      t1.update$0();
      if ($.tags.containsKey$1('uninit') === true) {
        $.forEach($.index($.tags, 'uninit'), new $.World_update_anon3());
        t1 = $.tags;
        t2 = $.ListFactory_List(null);
        $.setRuntimeTypeInfo(t2, ({E: 'GameObject'}));
        $.indexSet(t1, 'uninit', t2);
      }
      t1 = $.iterator($.tags.getKeys$0());
    case 59:
    case 60:
    case 61:
    case 62:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!(t1.hasNext$0() === true)) break L0;
            t2 = t1.next$0();
            t3 = $.tags;
          case 59:
            state = 0;
            var lst = $.index(t3, t2);
          case 60:
            state = 0;
            t2 = $.Math_random();
          case 61:
            state = 0;
            var i = $.toInt($.mul(t2, $.get$length(lst)));
          case 62:
            state = 0;
            var iter = 0;
            for (; $.ltB(iter, $.div($.get$length(lst), 16)); ++iter, i = $.add(i, 1)) {
              var index = $.mod(i, $.get$length(lst));
              $.index(lst, index).get$markedForRemoval() === true && $.removeRange(lst, index, 1);
            }
        }
      }
      t1 = this.objects;
      t2 = t1.length;
      t3 = $.Math_random();
    case 63:
      state = 0;
      if (typeof t3 !== 'number') throw $.iae(t3);
      i = $.toInt(t2 * t3);
    case 64:
      state = 0;
      iter = 0;
      for (; iter < t1.length / 16; ++iter, i = $.add(i, 1)) {
        index = $.mod(i, t1.length);
        if (index !== (index | 0)) throw $.iae(index);
        t2 = t1.length;
        if (index < 0 || index >= t2) throw $.ioore(index);
        t1[index].get$markedForRemoval() === true && $.removeRange(t1, index, 1);
      }
      $.forEach(t1, new $.World_update_anon4());
      $.tags.containsKey$1('actor') === true && $.forEach($.index($.tags, 'actor'), new $.World_update_anon5(this));
      $.tags.containsKey$1('spawn') === true && $.forEach($.index($.tags, 'spawn'), new $.World_update_anon6());
      this.sortScreenObjects$0();
      t1 = this.time;
    case 65:
      state = 0;
      t3 = this.dayLength;
      if (typeof t3 !== 'number') throw $.iae(t3);
      this.time = $.add(t1, 24 / t3);
      t1 = this.time;
    case 66:
      state = 0;
      if ($.gtB(t1, 24)) this.time = 0;
  }
 },
 sortScreenObjects$0: function() {
  var t1 = this.offscene;
  if (t1.length >= 1) {
    var iter = $.toInt($.mul($.Math_random(), t1.length));
    if (typeof iter !== 'number') return this.sortScreenObjects$0$bailout(1, iter, t1, 0);
    var t3 = this.onscene;
    var times = 0;
    for (; t2 = t1.length, times < t2 / 16 + 1; ++iter, ++times) {
      var i = $.mod(iter, t2);
      if (i !== (i | 0)) throw $.iae(i);
      if (i < 0 || i >= t2) throw $.ioore(i);
      if ($.ltB(t1[i].distanceTo$1(this.player), $.RENDER_DISTANCE)) {
        t2 = t1.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        t3.push(t1[i]);
        $.removeRange(t1, i, 1);
      } else {
        t2 = t1.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        t1[i].get$markedForRemoval() === true && $.removeRange(t1, i, 1);
      }
    }
  }
  t2 = $.Math_random();
  t3 = this.onscene;
  iter = $.toInt($.mul(t2, t3.length));
  if (typeof iter !== 'number') return this.sortScreenObjects$0$bailout(2, t3, iter, t1);
  times = 0;
  for (; t2 = t3.length, times < t2 / 16; ++iter, ++times) {
    i = $.mod(iter, t2);
    if (i !== (i | 0)) throw $.iae(i);
    if (i < 0 || i >= t2) throw $.ioore(i);
    if ($.gtB(t3[i].distanceTo$1(this.player), $.RENDER_DISTANCE)) {
      t2 = t3.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t1.push(t3[i]);
      $.removeRange(t3, i, 1);
    } else {
      t2 = t3.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3[i].get$markedForRemoval() === true && $.removeRange(t3, i, 1);
    }
  }
  if (t2 >= 1) {
    for (iter = 0; iter < 1 + t3.length / 4; ++iter) {
      var i0 = $.toInt($.mul($.Math_random(), t3.length));
      var i1 = $.mod($.toInt($.sub($.add(i0, $.mul($.Math_random(), 6)), 3)), t3.length);
      if ($.gtB(i0, i1)) {
        var t0 = i0;
        i0 = i1;
        i1 = t0;
      }
      if (!$.eqB(i0, i1)) {
        if (i0 !== (i0 | 0)) throw $.iae(i0);
        t1 = t3.length;
        if (i0 < 0 || i0 >= t1) throw $.ioore(i0);
        var a0 = t3[i0];
        if (i1 !== (i1 | 0)) throw $.iae(i1);
        if (i1 < 0 || i1 >= t1) throw $.ioore(i1);
        var a1 = t3[i1];
        if ($.gtB(a0.get$y(), a1.get$y())) {
          t1 = t3.length;
          if (i0 < 0 || i0 >= t1) throw $.ioore(i0);
          t3[i0] = a1;
          t2 = t3.length;
          if (i1 < 0 || i1 >= t2) throw $.ioore(i1);
          t3[i1] = a0;
        }
      }
    }
  }
  var t2;
 },
 sortScreenObjects$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      iter = env0;
      t1 = env1;
      break;
    case 2:
      t3 = env0;
      iter = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.offscene;
    case 1:
      if (state == 1 || (state == 0 && t1.length >= 1)) {
        switch (state) {
          case 0:
            var iter = $.toInt($.mul($.Math_random(), t1.length));
          case 1:
            state = 0;
            var t3 = this.onscene;
            var times = 0;
            for (; times < t1.length / 16 + 1; iter = $.add(iter, 1), ++times) {
              var i = $.mod(iter, t1.length);
              if (i !== (i | 0)) throw $.iae(i);
              var t2 = t1.length;
              if (i < 0 || i >= t2) throw $.ioore(i);
              if ($.ltB(t1[i].distanceTo$1(this.player), $.RENDER_DISTANCE)) {
                t2 = t1.length;
                if (i < 0 || i >= t2) throw $.ioore(i);
                t3.push(t1[i]);
                $.removeRange(t1, i, 1);
              } else {
                t2 = t1.length;
                if (i < 0 || i >= t2) throw $.ioore(i);
                t1[i].get$markedForRemoval() === true && $.removeRange(t1, i, 1);
              }
            }
        }
      }
      t2 = $.Math_random();
      t3 = this.onscene;
      iter = $.toInt($.mul(t2, t3.length));
    case 2:
      state = 0;
      times = 0;
      for (; times < t3.length / 16; iter = $.add(iter, 1), ++times) {
        i = $.mod(iter, t3.length);
        if (i !== (i | 0)) throw $.iae(i);
        t2 = t3.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        if ($.gtB(t3[i].distanceTo$1(this.player), $.RENDER_DISTANCE)) {
          t2 = t3.length;
          if (i < 0 || i >= t2) throw $.ioore(i);
          t1.push(t3[i]);
          $.removeRange(t3, i, 1);
        } else {
          t2 = t3.length;
          if (i < 0 || i >= t2) throw $.ioore(i);
          t3[i].get$markedForRemoval() === true && $.removeRange(t3, i, 1);
        }
      }
      if (t3.length >= 1) {
        iter = 0;
        while (true) {
          t1 = t3.length / 4;
          if (typeof t1 !== 'number') throw $.iae(t1);
          if (!(iter < 1 + t1)) break;
          var i0 = $.toInt($.mul($.Math_random(), t3.length));
          var i1 = $.mod($.toInt($.sub($.add(i0, $.mul($.Math_random(), 6)), 3)), t3.length);
          if ($.gtB(i0, i1)) {
            var t0 = i0;
            i0 = i1;
            i1 = t0;
          }
          if (!$.eqB(i0, i1)) {
            if (i0 !== (i0 | 0)) throw $.iae(i0);
            t1 = t3.length;
            if (i0 < 0 || i0 >= t1) throw $.ioore(i0);
            var a0 = t3[i0];
            if (i1 !== (i1 | 0)) throw $.iae(i1);
            t2 = t3.length;
            if (i1 < 0 || i1 >= t2) throw $.ioore(i1);
            var a1 = t3[i1];
            if ($.gtB(a0.get$y(), a1.get$y())) {
              t1 = t3.length;
              if (i0 < 0 || i0 >= t1) throw $.ioore(i0);
              t3[i0] = a1;
              t2 = t3.length;
              if (i1 < 0 || i1 >= t2) throw $.ioore(i1);
              t3[i1] = a0;
            }
          }
          ++iter;
        }
      }
  }
 },
 pickUpItem$1: function(item) {
  $.print('TODO : MAKE PICK UP ITEM');
 },
 getItemImage$1: function(index) {
  var t1 = this.itemImages;
  if (!(t1 == null)) return $.index(t1, index);
  return $.BLANK_IMAGE;
 },
 startCycle$1: function(context) {
  var t1 = ({});
  this.player = $.index($.index($.tags, 'player'), 0);
  var t2 = this.difficultyMode;
  t2 > 0 && this.increaseDifficulty$1(t2);
  if (this.intro === true) {
    this.player_animation = this.player.get$animation();
    t2 = $.Animation$($.makeLiteralMap([]));
    this.player.set$animation(t2);
  }
  this.player.removeTag$1('citizen');
  this.sortScreenObjects$0();
  this.camera.set$2(this.player.get$x(), this.player.get$y());
  this.paused = false;
  $.add$1($.event.get$onKeyPress(), new $.World_startCycle_anon(this));
  if ($.DEBUG === true) {
    var debugPathNodes = $.ListFactory_List(null);
    $.setRuntimeTypeInfo(debugPathNodes, ({E: 'Vec2'}));
    t1.debugPathNodes_4 = debugPathNodes;
    $.add$1($.event.get$onKeyPress(), new $.World_startCycle_anon0(this, t1));
  }
  $.add$1($.event.get$onClick(), new $.World_startCycle_anon1(this));
  $.add$1($.event.get$onKeyPress(), new $.World_startCycle_anon2(this));
  t1.c_inc_5 = 0;
  new $.World_startCycle_cycle(context, t1, 2, this).$call$1(0);
 },
 getClosePathNodes$1: function(v) {
  var cnodes = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(cnodes, ({E: 'PathNode'}));
  $.forEach(this.pathnodes, new $.World_getClosePathNodes_anon(v, cnodes));
  return cnodes;
 },
 addObject$1: function(instance) {
  this.objects.push(instance);
  this.onscene.push(instance);
 },
 purchaseUpgrade$2: function(type, weaponID) {
  switch (type) {
    case 'damage':
      var t1 = this.weaponDamage;
      $.indexSet(t1, weaponID, $.mul($.index(t1, weaponID), 1.5));
      t1 = this.coin;
      var t2 = this.weaponCost;
      this.coin = $.sub(t1, $.index(t2, weaponID));
      $.indexSet(t2, weaponID, $.mul($.index(t2, weaponID), 2));
      break;
    case 'rate':
      t1 = this.weaponAttackTime;
      $.indexSet(t1, weaponID, $.sub($.index(t1, weaponID), 2));
      t1 = this.coin;
      t2 = this.weaponCost2;
      this.coin = $.sub(t1, $.index(t2, weaponID));
      $.indexSet(t2, weaponID, $.mul($.index(t2, weaponID), 2));
      break;
  }
 },
 purchaseWeapon$1: function(weaponID) {
  var t1 = this.coin;
  var t2 = this.weaponCost;
  if (weaponID !== (weaponID | 0)) throw $.iae(weaponID);
  var t3 = t2.length;
  if (weaponID < 0 || weaponID >= t3) throw $.ioore(weaponID);
  this.coin = $.sub(t1, t2[weaponID]);
  var t4 = this.playerWeapons;
  var t5 = t4.length;
  if (weaponID < 0 || weaponID >= t5) throw $.ioore(weaponID);
  t4[weaponID] = true;
  t4 = t2.length;
  if (weaponID < 0 || weaponID >= t4) throw $.ioore(weaponID);
  var t6 = $.toInt($.div(t2[weaponID], 2));
  var t7 = t2.length;
  if (weaponID < 0 || weaponID >= t7) throw $.ioore(weaponID);
  t2[weaponID] = t6;
  t6 = this.weaponCost2;
  var t8 = t2.length;
  if (weaponID < 0 || weaponID >= t8) throw $.ioore(weaponID);
  t2 = t2[weaponID];
  var t9 = t6.length;
  if (weaponID < 0 || weaponID >= t9) throw $.ioore(weaponID);
  t6[weaponID] = t2;
  $.notify('Press E to change weapons');
 },
 openMenu$1: function(type) {
  $.print('Opening ' + $.S(type) + ' menu');
  switch (type) {
    case 'weapons':
      var optionMap = [];
      for (var t1 = this.playerWeapons, t2 = this.weaponName, t3 = this.weaponCost, nci = 0; $.ltB(nci, $.get$length(t1)); ++nci) {
        $.index(t1, nci) !== true && $.add$1(optionMap, $.makeLiteralMap(['name', $.S($.concat($.toUpperCase($.index($.splitChars($.index(t2, nci)), 0)), $.substring$1($.index(t2, nci), 1))) + ' ' + $.S($.index(t3, nci)) + 'c', 'func', new $.World_openMenu_anon(nci, this)]));
      }
      $.add$1(this.menuInterfaces, $.MenuInterface$('options', $.makeLiteralMap(['options', optionMap])));
      break;
    case 'upgrades':
      optionMap = [];
      for (t1 = this.playerWeapons, t2 = this.weaponName, t3 = this.weaponCost, t4 = this.weaponCost2, nci = 1; $.ltB(nci, $.get$length(t1)); ++nci) {
        if ($.index(t1, nci) === true) {
          $.add$1(optionMap, $.makeLiteralMap(['name', $.S($.concat($.toUpperCase($.index($.splitChars($.index(t2, nci)), 0)), $.substring$1($.index(t2, nci), 1))) + ' Damage ' + $.S($.index(t3, nci)) + 'c', 'func', new $.World_openMenu_anon0(nci, this)]));
          $.add$1(optionMap, $.makeLiteralMap(['name', $.S($.concat($.toUpperCase($.index($.splitChars($.index(t2, nci)), 0)), $.substring$1($.index(t2, nci), 1))) + ' Attack Rate ' + $.S($.index(t4, nci)) + 'c', 'func', new $.World_openMenu_anon1(nci, this)]));
        }
      }
      $.add$1(this.menuInterfaces, $.MenuInterface$('options', $.makeLiteralMap(['options', optionMap])));
      break;
    case 'health':
      t1 = $.geB(this.coin, 300);
      t2 = this.menuInterfaces;
      if (t1) $.add$1(t2, $.MenuInterface$('confirm', $.makeLiteralMap(['text', 'Would you like to buy a health upgrade for 300c?', 'func', new $.World_openMenu_anon2(this)])));
      else $.add$1(t2, $.MenuInterface$('broke', $.makeLiteralMap(['text', 'Would you like to buy a health upgrade for 300c?'])));
      break;
  }
  var t4;
 },
 increaseDifficulty$1: function(times) {
  if (typeof times !== 'number') return this.increaseDifficulty$1$bailout(1, times, 0);
  var t1 = this.ZOMBIE_WANDER_DISTANCE;
  if (typeof t1 !== 'number') return this.increaseDifficulty$1$bailout(2, times, t1);
  this.ZOMBIE_WANDER_DISTANCE = $.toInt(t1 * 1.5);
  var t3 = this.ZOMBIE_SPEED;
  if (typeof t3 !== 'number') return this.increaseDifficulty$1$bailout(3, times, t3);
  this.ZOMBIE_SPEED = t3 * 1.1;
  t1 = this.ZOMBIE_SPEED;
  if (typeof t1 !== 'number') return this.increaseDifficulty$1$bailout(4, times, t1);
  if (t1 < 2) {
    if (typeof t1 !== 'number') return this.increaseDifficulty$1$bailout(5, times, t1);
  } else t1 = 2;
  this.ZOMBIE_SPEED = t1;
  t1 = this.ZOMBIE_DAMAGE;
  if (typeof t1 !== 'number') return this.increaseDifficulty$1$bailout(6, times, t1);
  this.ZOMBIE_DAMAGE = t1 + 10 * ((75 - t1) / 75);
  t3 = this.ZOMBIE_ARMOR;
  if (typeof t3 !== 'number') return this.increaseDifficulty$1$bailout(7, times, t3);
  this.ZOMBIE_ARMOR = t3 - (t3 - 0.25) / 10;
  var t5 = this.AGRO_DISTANCE;
  if (typeof t5 !== 'number') return this.increaseDifficulty$1$bailout(8, times, t5);
  this.AGRO_DISTANCE = t5 - (t5 - 512) / 10;
  var t7 = this.zombie_max;
  if (typeof t7 !== 'number') return this.increaseDifficulty$1$bailout(9, times, t7);
  this.zombie_max = t7 + 20;
  return times > 0 ? this.increaseDifficulty$1(times - 1) : null;
 },
 increaseDifficulty$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var times = env0;
      break;
    case 2:
      times = env0;
      t1 = env1;
      break;
    case 3:
      times = env0;
      t3 = env1;
      break;
    case 4:
      times = env0;
      t1 = env1;
      break;
    case 5:
      times = env0;
      t1 = env1;
      break;
    case 6:
      times = env0;
      t1 = env1;
      break;
    case 7:
      times = env0;
      t3 = env1;
      break;
    case 8:
      times = env0;
      t5 = env1;
      break;
    case 9:
      times = env0;
      t7 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this.ZOMBIE_WANDER_DISTANCE;
    case 2:
      state = 0;
      this.ZOMBIE_WANDER_DISTANCE = $.toInt($.mul(t1, 1.5));
      var t3 = this.ZOMBIE_SPEED;
    case 3:
      state = 0;
      this.ZOMBIE_SPEED = $.mul(t3, 1.1);
      t1 = this.ZOMBIE_SPEED;
    case 4:
      state = 0;
    case 5:
      if (state == 5 || (state == 0 && $.ltB(t1, 2))) {
        switch (state) {
          case 0:
            t1 = this.ZOMBIE_SPEED;
          case 5:
            state = 0;
        }
      } else {
        t1 = 2;
      }
      this.ZOMBIE_SPEED = t1;
      t1 = this.ZOMBIE_DAMAGE;
    case 6:
      state = 0;
      if (typeof t1 !== 'number') throw $.iae(t1);
      this.ZOMBIE_DAMAGE = $.add(t1, 10 * ((75 - t1) / 75));
      t3 = this.ZOMBIE_ARMOR;
    case 7:
      state = 0;
      this.ZOMBIE_ARMOR = $.sub(t3, $.div($.sub(t3, 0.25), 10));
      var t5 = this.AGRO_DISTANCE;
    case 8:
      state = 0;
      this.AGRO_DISTANCE = $.sub(t5, $.div($.sub(t5, 512), 10));
      var t7 = this.zombie_max;
    case 9:
      state = 0;
      this.zombie_max = $.add(t7, 20);
      return $.gtB(times, 0) ? this.increaseDifficulty$1($.sub(times, 1)) : null;
  }
 },
 increaseDifficulty$0: function() {
  return this.increaseDifficulty$1(0)
},
 increaseDifficulty$0: function() {
  return this.increaseDifficulty$1(0)
},
 collisionAtVec2$1: function(v) {
  return this.collisionAt$2(v.get$x(), v.get$y());
 },
 collisionAt$2: function(x, y) {
  var x0 = $.toInt($.div(x, 32));
  var y0 = $.toInt($.add($.div(y, 32), 0.5));
  return $.index(this.collisionMap, $.add(x0, $.mul(y0, this.map_width)));
 },
 fmtCollisionMap$1: function(data) {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'bool'}));
  this.collisionMap = t1;
  var chars = $.splitChars(data);
  if (typeof chars !== 'string' && (typeof chars !== 'object' || chars === null || (chars.constructor !== Array && !chars.is$JavaScriptIndexingBehavior()))) return this.fmtCollisionMap$1$bailout(1, data, chars);
  for (var cir = 0; $.ltB(cir, $.mul($.get$length(data), 4)); ++cir) {
    var ci = $.toInt(cir / 4);
    var bseq = $.mod(cir, 4);
    if (ci !== (ci | 0)) throw $.iae(ci);
    t1 = chars.length;
    if (ci < 0 || ci >= t1) throw $.ioore(ci);
    var hexMap = $.CTC27.operator$index$1(chars[ci]);
    if (!(hexMap == null)) {
      t1 = this.collisionMap;
      $.add$1(t1, $.eqB($.index(hexMap, bseq), 1) && true);
    }
  }
  this.map_width = $.toInt($.ceil($.Math_sqrt($.get$length(this.collisionMap))));
  $.print('Collision Map Loaded, Size : ' + $.S($.get$length(this.collisionMap)));
 },
 fmtCollisionMap$1$bailout: function(state, data, chars) {
  for (var cir = 0; $.ltB(cir, $.mul($.get$length(data), 4)); ++cir) {
    var ci = $.toInt(cir / 4);
    var bseq = $.mod(cir, 4);
    var hexMap = $.CTC27.operator$index$1($.index(chars, ci));
    if (!(hexMap == null)) {
      var t1 = this.collisionMap;
      $.add$1(t1, $.eqB($.index(hexMap, bseq), 1) && true);
    }
  }
  this.map_width = $.toInt($.ceil($.Math_sqrt($.get$length(this.collisionMap))));
  $.print('Collision Map Loaded, Size : ' + $.S($.get$length(this.collisionMap)));
 },
 unpackObjects$1: function(list) {
  var box_0 = ({});
  for (box_0.i_1 = 0; $.ltB(box_0.i_1, $.get$length(list)); box_00 = ({}), box_00.i_1 = box_0.i_1, box_00.i_1 = $.add(box_00.i_1, 1), box_0 = box_00) {
    var t1 = $.index($.index(list, box_0.i_1), 'type');
    var t2 = box_0.i_1;
    switch (t1) {
      case 'animation':
        $.indexSet($.animationMap, $.index($.index(list, t2), 'name'), $.Animation$($.index(list, box_0.i_1)));
        break;
      case 'avatar':
        $.indexSet($.classMap, $.index($.index(list, t2), 'name'), new $.World_unpackObjects_anon(list, box_0));
        break;
      case 'item':
        $.indexSet($.classMap, $.index($.index(list, t2), 'name'), new $.World_unpackObjects_anon0(list, box_0));
        break;
      case 'node':
        $.indexSet($.classMap, $.index($.index(list, t2), 'name'), new $.World_unpackObjects_anon1(list, box_0));
        break;
      default:
        $.print('Type not found: ' + $.S($.index($.index(list, t2), 'type')));
        break;
    }
  }
  var box_00;
 },
 unpackMapPaths$1: function(lst) {
  $.forEach(lst, new $.World_unpackMapPaths_anon(this));
 },
 unpackMapObjects$1: function(rol) {
  if (typeof rol !== 'string' && (typeof rol !== 'object' || rol === null || (rol.constructor !== Array && !rol.is$JavaScriptIndexingBehavior()))) return this.unpackMapObjects$1$bailout(1, rol);
  for (var i = 0; t1 = rol.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = $.index(rol[i], 'type');
    var t3 = rol.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    this.spawnObject$2(t2, rol[i]);
  }
  var t1;
 },
 unpackMapObjects$1$bailout: function(state, rol) {
  for (var i = 0; $.ltB(i, $.get$length(rol)); ++i) {
    this.spawnObject$2($.index($.index(rol, i), 'type'), $.index(rol, i));
  }
 },
 spawnObject$2: function(type, props) {
  var t1 = $.classMap;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.spawnObject$2$bailout(1, type, props, t1);
  if (type !== (type | 0)) throw $.iae(type);
  var t3 = t1.length;
  if (type < 0 || type >= t3) throw $.ioore(type);
  var ob = t1[type].$call$1(props);
  ob.set$type(type);
  $.add$1(ob.get$tags(), type);
  $.add$1(ob.get$tags(), 'uninit');
  $.addTag(ob, type);
  $.addTag(ob, 'uninit');
  this.addObject$1(ob);
  return ob;
 },
 spawnObject$2$bailout: function(state, type, props, t1) {
  var ob = $.index(t1, type).$call$1(props);
  ob.set$type(type);
  $.add$1(ob.get$tags(), type);
  $.add$1(ob.get$tags(), 'uninit');
  $.addTag(ob, type);
  $.addTag(ob, 'uninit');
  this.addObject$1(ob);
  return ob;
 },
 loadMap$2: function(name$, callback) {
  var map = $.index(this.mapsTree, name$);
  this.currentMapTree = map;
  this.unpackMapObjects$1($.index(map, 'objects'));
  this.unpackMapPaths$1($.index(map, 'paths'));
  this.bottomTileManager = $.TileManager$('map_bottom');
  this.topTileManager = $.TileManager$('map_top');
  $.res_loadFile($.index(map, 'collision-map'), new $.World_loadMap_anon(this, callback));
 },
 load$2: function(json, callback) {
  $.print('Beginning Parse');
  this.dataTree = $.JSON_parse(json);
  var objectList = $.index(this.dataTree, 'objects');
  this.mapsTree = $.index(this.dataTree, 'maps');
  $.print('Unpacking Game');
  this.unpackObjects$1(objectList);
  $.print('Data Parsed');
  $.res_loadSplitImage('items.png', new $.World_load_anon(this, callback), 32, 32);
 },
 get$load: function() { return new $.BoundClosure1(this, 'load$2'); },
 World$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'GameObject'}));
  this.objects = t1;
  t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'GameObject'}));
  this.onscene = t1;
  t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'GameObject'}));
  this.offscene = t1;
  this.camera = $.Camera$(0, 0, 1);
  this.overlay = $.OverlayManager$();
  t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'MenuInterface'}));
  this.menuInterfaces = t1;
  t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'Path'}));
  this.paths = t1;
  t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'PathNode'}));
  this.pathnodes = t1;
  this.playerWeapons = [true, true, true, true, true, true];
  this.playerWeapons = [true, false, false, false, false, false];
  this.weaponDamage = [25, 34, 20, 34, 75, 45, 70];
  this.weaponAttackTypes = [0, 0, 1, 2, 2, 0, 0];
  this.weaponAttackTime = [12, 10, 24, 15, 20, 12, 18];
  this.weaponAttackRadius = [64, 64, 0, 128, 128, 128, 128];
  this.weaponCost = [0, 120, 240, 150, 400, 300, 500];
  this.weaponCost2 = [0, 120, 240, 150, 400, 300, 500];
  this.weaponStartFrame = [0, 0, 25, 0, 0, 0, 0];
  this.weaponName = ['fist', 'dagger', 'bow', 'staff', 'spear', 'rapier', 'longsword'];
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
 ["mid", "size", "frameMapIndex?"],
 super: "Object",
 render$4: function(c, animation, orientation, frame) {
  c.save$0();
  var t1 = this.mid;
  c.translate$2($.neg(t1), $.neg(t1));
  var t2 = this.frameMapIndex;
  if (animation !== (animation | 0)) throw $.iae(animation);
  var t3 = t2.length;
  if (animation < 0 || animation >= t3) throw $.ioore(animation);
  var fmap = t2[animation];
  !(fmap == null) && fmap.render$3(c, orientation, frame);
  c.restore$0();
 },
 loadThrustAnimation$2: function(path, callback) {
  var t1 = new $.Animation_loadThrustAnimation_anon(callback);
  var t2 = this.size;
  $.res_loadSplitImage(path, t1, t2, t2);
 },
 loadShootAnimation$2: function(path, callback) {
  var t1 = new $.Animation_loadShootAnimation_anon(callback);
  var t2 = this.size;
  $.res_loadSplitImage(path, t1, t2, t2);
 },
 loadDeathAnimation$2: function(path, callback) {
  var t1 = new $.Animation_loadDeathAnimation_anon(callback);
  var t2 = this.size;
  $.res_loadSplitImage(path, t1, t2, t2);
 },
 loadSlashAnimation$2: function(path, callback) {
  var t1 = new $.Animation_loadSlashAnimation_anon(callback);
  var t2 = this.size;
  $.res_loadSplitImage(path, t1, t2, t2);
 },
 loadWalkAnimation$2: function(path, callback) {
  var t1 = new $.Animation_loadWalkAnimation_anon(callback);
  var t2 = this.size;
  $.res_loadSplitImage(path, t1, t2, t2);
 },
 loadProperties$1: function(properties) {
  $.forEach(properties, new $.Animation_loadProperties_anon(this));
 },
 Animation$1: function(properties) {
  this.size = $.index(properties, 'size') == null ? 64 : $.index(properties, 'size');
  this.mid = $.toInt($.div(this.size, 2));
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'FrameMap'}));
  this.frameMapIndex = t1;
  this.loadProperties$1(properties);
 }
};

$$.Notification = {"":
 ["ay", "y=", "timeLeft", "text!"],
 super: "Object",
 render$1: function(c) {
  var t1 = this.timeLeft;
  t1 = t1 < 60 ? t1 / 60 : 1;
  c.set$globalAlpha(0.5 * t1);
  c.set$fillStyle('#000');
  c.set$font('18px Arial');
  var t2 = $.SCREEN_HEIGHT;
  if (typeof t2 !== 'number') return this.render$1$bailout(1, c, t2, 0, 0);
  var t4 = this.ay;
  if (typeof t4 !== 'number') return this.render$1$bailout(2, c, t4, t2, 0);
  t4 = t2 - t4;
  t2 = c.measureText$1(this.text).get$width();
  if (typeof t2 !== 'number') return this.render$1$bailout(3, c, t2, t4, 0);
  c.fillRect$4(0, t4, t2 + 20, 32);
  c.set$fillStyle('#fff');
  t4 = this.text;
  var t7 = $.SCREEN_HEIGHT;
  if (typeof t7 !== 'number') return this.render$1$bailout(4, c, t4, t7, 0);
  var t9 = this.ay;
  if (typeof t9 !== 'number') return this.render$1$bailout(5, c, t4, t7, t9);
  c.fillText$3(t4, 10, t7 - t9 + 20);
  t4 = this.ay;
  if (typeof t4 !== 'number') return this.render$1$bailout(6, c, t4, 0, 0);
  var t12 = this.y;
  if (typeof t12 !== 'number') return this.render$1$bailout(7, c, t4, t12, 0);
  this.ay = t4 - (t4 - t12) / 10;
  c.set$globalAlpha(1);
  var t14 = this.timeLeft;
  this.timeLeft = t14 - 1;
  return t14 <= 0;
 },
 render$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var c = env0;
      t2 = env1;
      break;
    case 2:
      c = env0;
      t4 = env1;
      t2 = env2;
      break;
    case 3:
      c = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 4:
      c = env0;
      t4 = env1;
      t7 = env2;
      break;
    case 5:
      c = env0;
      t4 = env1;
      t7 = env2;
      t9 = env3;
      break;
    case 6:
      c = env0;
      t4 = env1;
      break;
    case 7:
      c = env0;
      t4 = env1;
      t12 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.timeLeft < 60 ? this.timeLeft / 60 : 1;
      if (typeof t1 !== 'number') throw $.iae(t1);
      c.set$globalAlpha(0.5 * t1);
      c.set$fillStyle('#000');
      c.set$font('18px Arial');
      var t2 = $.SCREEN_HEIGHT;
    case 1:
      state = 0;
      var t4 = this.ay;
    case 2:
      state = 0;
      t4 = $.sub(t2, t4);
      t2 = c.measureText$1(this.text).get$width();
    case 3:
      state = 0;
      c.fillRect$4(0, t4, $.add(t2, 20), 32);
      c.set$fillStyle('#fff');
      t4 = this.text;
      var t7 = $.SCREEN_HEIGHT;
    case 4:
      state = 0;
      var t9 = this.ay;
    case 5:
      state = 0;
      c.fillText$3(t4, 10, $.add($.sub(t7, t9), 20));
      t4 = this.ay;
    case 6:
      state = 0;
      var t12 = this.y;
    case 7:
      state = 0;
      this.ay = $.sub(t4, $.div($.sub(t4, t12), 10));
      c.set$globalAlpha(1);
      var t14 = this.timeLeft;
      this.timeLeft = t14 - 1;
      return t14 <= 0;
  }
 }
};

$$.AudioManager = {"":
 ["audioGroup", "audioElements?"],
 super: "Object",
 play$1: function(soundName) {
  var t1 = this.audioGroup;
  var t2 = t1.containsKey$1(soundName) === true;
  var t3 = this.audioElements;
  if (t2) $.index(t3, $.index($.index(t1, soundName), $.toInt($.mul($.get$length($.index(t1, soundName)), $.Math_random())))).play$0();
  else $.index(t3, soundName).play$0();
 },
 AudioManager$0: function() {
  var soundList = ['bump', 'shoot1', 'hurt3', 'shoot', 'hurt2', 'hurt', 'hurt1', 'coin'];
  this.audioElements = $.HashMapImplementation$();
  $.forEach(soundList, new $.anon60(this));
  this.audioGroup = $.HashMapImplementation$();
  var t1 = this.audioGroup;
  $.indexSet(t1, 'shoot', ['shoot', 'shoot1']);
  $.indexSet(t1, 'hurt', ['hurt', 'hurt1', 'hurt2', 'hurt3']);
 }
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._DeprecatedPeerConnectionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
 },
 open$2: function(arg0, arg1) { return this.get$open().$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.get$open().$call$3(arg0, arg1, arg2); },
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
 },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$touchEnd: function() {
  return this.operator$index$1('touchend');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$readyStateChange: function() {
  return this.operator$index$1('readystatechange');
 },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$keyUp: function() {
  return this.operator$index$1('keyup');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$.EmptyElementRect = {"":
 ["clientRects", "bounding", "scroll", "offset", "client"],
 super: "Object"
};

$$._SimpleClientRect = {"":
 ["height?", "width?", "top?", "left?"],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.left) + ', ' + $.S(this.top) + ', ' + $.S(this.width) + ', ' + $.S(this.height) + ')';
 },
 operator$eq$1: function(other) {
  return !(other == null) && ($.eqB(this.left, other.get$left()) && ($.eqB(this.top, other.get$top()) && ($.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height()))));
 }
};

$$._ElementRectImpl = {"":
 ["_clientRects", "_boundingClientRect", "scroll", "offset", "client"],
 super: "Object"
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
 },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$touchEnd: function() {
  return this.operator$index$1('touchend');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$keyUp: function() {
  return this.operator$index$1('keyup');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
 },
 open$2: function(arg0, arg1) { return this.get$open().$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.get$open().$call$3(arg0, arg1, arg2); },
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
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
  return this.operator$index$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 },
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
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

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
 },
 open$2: function(arg0, arg1) { return this.get$open().$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.get$open().$call$3(arg0, arg1, arg2); }
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$keyUp: function() {
  return this.operator$index$1('keyup');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$error: function() {
  return this.operator$index$1('error');
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
  return this.operator$index$1('start');
 },
 get$error: function() {
  return this.operator$index$1('error');
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
  return this.operator$index$1('open');
 },
 open$2: function(arg0, arg1) { return this.get$open().$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.get$open().$call$3(arg0, arg1, arg2); },
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
 },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$touchEnd: function() {
  return this.operator$index$1('touchend');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$play: function() {
  return this.operator$index$1('play');
 },
 play$0: function() { return this.get$play().$call$0(); },
 play$1: function(arg0) { return this.get$play().$call$1(arg0); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$keyUp: function() {
  return this.operator$index$1('keyup');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$readyStateChange: function() {
  return this.operator$index$1('readystatechange');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$load: function() {
  return this.operator$index$1('load');
 },
 load$2: function(arg0, arg1) { return this.get$load().$call$2(arg0, arg1); },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._MeasurementRequest = {"":
 ["exception=", "value=", "completer?", "computeValue"],
 super: "Object",
 computeValue$0: function() { return this.computeValue.$call$0(); }
};

$$._DOMWindowCrossFrameImpl = {"":
 ["_window"],
 super: "Object",
 postMessage$3: function(message, targetOrigin, messagePorts) {
  var t1 = messagePorts == null;
  var t2 = this._window;
  if (t1) $._DOMWindowCrossFrameImpl__postMessage2(t2, message, targetOrigin);
  else $._DOMWindowCrossFrameImpl__postMessage3(t2, message, targetOrigin, messagePorts);
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage$3(message,targetOrigin,null)
},
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe($._DOMWindowCrossFrameImpl__top(this._window));
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
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  var t5 = t1.length;
  if (t3 < 0 || t3 >= t5) throw $.ioore(t3);
  return t1[t3];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
 }
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null)) return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null)) return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
 },
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null)) return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    result[i] = t2;
  }
  return result;
 },
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Manager = {"":
 ["managers", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
 }
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
 }
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!($._window() == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true) $._globalState().maybeCloseWorker$0();
    else {
      if (!($._globalState().get$rootContext() == null) && ($._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && ($._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true))) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true) return;
  return t1.removeFirst$0();
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
 },
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort) {
    var t1 = $.eqB(this._workerId, other._workerId) && ($.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId));
  } else t1 = false;
  return t1;
 },
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
 },
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number') return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$._JsonParser = {"":
 ["position!", "length?", "json"],
 super: "Object",
 length$0: function() { return this.length.$call$0(); },
 _error$1: function(message) {
  throw $.captureStackTrace(message);
 },
 _token$0: function() {
  for (var t1 = this.json; true; ) {
    if ($.geB(this.position, $.get$length(this))) return;
    var char$ = $.charCodeAt(t1, this.position);
    var token = $.index($._JsonParser_tokens, char$);
    if (token === 32) {
      this.position = $.add(this.position, 1);
      continue;
    }
    if (token == null) return 0;
    return token;
  }
 },
 _nextChar$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number') return this._nextChar$0$bailout(1, t1, 0);
  this.position = t1 + 1;
  t1 = this.position;
  if (typeof t1 !== 'number') return this._nextChar$0$bailout(2, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number') return this._nextChar$0$bailout(3, t3, t1);
  if (t1 >= t3) return 0;
  return $.charCodeAt(this.json, this.position);
 },
 _nextChar$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      this.position = $.add(t1, 1);
      t1 = this.position;
    case 2:
      state = 0;
      var t3 = $.get$length(this);
    case 3:
      state = 0;
      if ($.geB(t1, t3)) return 0;
      return $.charCodeAt(this.json, this.position);
  }
 },
 _char$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number') return this._char$0$bailout(1, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number') return this._char$0$bailout(2, t1, t3);
  t1 >= t3 && this._error$1('Unexpected end of JSON stream');
  return $.charCodeAt(this.json, this.position);
 },
 _char$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      var t3 = $.get$length(this);
    case 2:
      state = 0;
      $.geB(t1, t3) && this._error$1('Unexpected end of JSON stream');
      return $.charCodeAt(this.json, this.position);
  }
 },
 _isToken$1: function(tokenKind) {
  return $.eq(this._token$0(), tokenKind);
 },
 _isDigit$1: function(char$) {
  if (typeof char$ !== 'number') return this._isDigit$1$bailout(1, char$);
  return char$ >= 48 && char$ <= 57;
 },
 _isDigit$1$bailout: function(state, char$) {
  return $.geB(char$, 48) && $.leB(char$, 57);
 },
 _parseNumber$0: function() {
  this._isToken$1(45) !== true && this._error$1('Expected number literal');
  var startPos = this.position;
  var char$ = this._char$0();
  if (char$ === 45) char$ = this._nextChar$0();
  if (char$ === 48) char$ = this._nextChar$0();
  else {
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
    } else this._error$1('Expected digit when parsing number');
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
  } else isInt = true;
  if (char$ === 101 || char$ === 69) {
    char$ = this._nextChar$0();
    if (char$ === 45 || char$ === 43) char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
      isInt = false;
    } else this._error$1('Expected digit following \'e\' or \'E\'');
  }
  var number = $.substring$2(this.json, startPos, this.position);
  if (isInt) return $.Math_parseInt(number);
  return $.Math_parseDouble(number);
 },
 _parseString$0: function() {
  this._isToken$1(34) !== true && this._error$1('Expected string literal');
  this.position = $.add(this.position, 1);
  var charCodes = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(charCodes, ({E: 'int'}));
  for (var t1 = this.json; true; ) {
    var c = this._char$0();
    if ($.eqB(c, 34)) {
      this.position = $.add(this.position, 1);
      break;
    }
    if ($.eqB(c, 92)) {
      this.position = $.add(this.position, 1);
      $.eqB(this.position, $.get$length(this)) && this._error$1('\\ at the end of input');
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
          $.gtB($.add(this.position, 5), $.get$length(this)) && this._error$1('Invalid unicode esacape sequence');
          var codeString = $.substring$2(t1, $.add(this.position, 1), $.add(this.position, 5));
          try {
            c = $.Math_parseInt('0x' + $.S(codeString));
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
  return $.Strings_String$fromCharCodes(charCodes);
 },
 _parseList$0: function() {
  var list = [];
  this.position = $.add(this.position, 1);
  if (this._isToken$1(93) !== true) {
    for (; true; ) {
      $.add$1(list, this._parseValue$0());
      if (this._isToken$1(44) !== true) break;
      this.position = $.add(this.position, 1);
    }
    this._isToken$1(93) !== true && this._error$1('Expected \']\' at end of list');
  }
  this.position = $.add(this.position, 1);
  return list;
 },
 _parseObject$0: function() {
  var object = $.makeLiteralMap([]);
  if (typeof object !== 'object' || object === null || ((object.constructor !== Array || !!object.immutable$list) && !object.is$JavaScriptIndexingBehavior())) return this._parseObject$0$bailout(1, object);
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true; ) {
      var key = this._parseString$0();
      this._isToken$1(58) !== true && this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      var t1 = this._parseValue$0();
      if (key !== (key | 0)) throw $.iae(key);
      var t2 = object.length;
      if (key < 0 || key >= t2) throw $.ioore(key);
      object[key] = t1;
      if (this._isToken$1(44) !== true) break;
      this.position = $.add(this.position, 1);
    }
    this._isToken$1(125) !== true && this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
 },
 _parseObject$0$bailout: function(state, object) {
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true; ) {
      var key = this._parseString$0();
      this._isToken$1(58) !== true && this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      $.indexSet(object, key, this._parseValue$0());
      if (this._isToken$1(44) !== true) break;
      this.position = $.add(this.position, 1);
    }
    this._isToken$1(125) !== true && this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
 },
 _expectKeyword$2: function(word, value) {
  for (var i = 0; $.ltB(i, $.get$length(word)); ++i) {
    !$.eqB(this._char$0(), $.charCodeAt(word, i)) && this._error$1('Expected keyword \'' + $.S(word) + '\'');
    this.position = $.add(this.position, 1);
  }
  return value;
 },
 _parseValue$0: function() {
  var token = this._token$0();
  token == null && this._error$1('Nothing to parse');
  switch (token) {
    case 34:
      return this._parseString$0();
    case 45:
      return this._parseNumber$0();
    case 110:
      return this._expectKeyword$2('null', null);
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
  !(this._token$0() == null) && this._error$1('Junk at the end of JSON input');
  return result;
 },
 _JsonParser$_internal$1: function(json) {
  if (!($._JsonParser_tokens == null)) return;
  var t1 = $.ListFactory_List(126);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  $._JsonParser_tokens = t1;
  $.indexSet($._JsonParser_tokens, 9, 32);
  $.indexSet($._JsonParser_tokens, 10, 32);
  $.indexSet($._JsonParser_tokens, 13, 32);
  $.indexSet($._JsonParser_tokens, 32, 32);
  $.indexSet($._JsonParser_tokens, 48, 45);
  $.indexSet($._JsonParser_tokens, 49, 45);
  $.indexSet($._JsonParser_tokens, 50, 45);
  $.indexSet($._JsonParser_tokens, 51, 45);
  $.indexSet($._JsonParser_tokens, 52, 45);
  $.indexSet($._JsonParser_tokens, 53, 45);
  $.indexSet($._JsonParser_tokens, 54, 45);
  $.indexSet($._JsonParser_tokens, 55, 45);
  $.indexSet($._JsonParser_tokens, 56, 45);
  $.indexSet($._JsonParser_tokens, 57, 45);
  $.indexSet($._JsonParser_tokens, 45, 45);
  $.indexSet($._JsonParser_tokens, 123, 123);
  $.indexSet($._JsonParser_tokens, 125, 125);
  $.indexSet($._JsonParser_tokens, 91, 91);
  $.indexSet($._JsonParser_tokens, 93, 93);
  $.indexSet($._JsonParser_tokens, 34, 34);
  $.indexSet($._JsonParser_tokens, 58, 58);
  $.indexSet($._JsonParser_tokens, 44, 44);
  $.indexSet($._JsonParser_tokens, 110, 110);
  $.indexSet($._JsonParser_tokens, 116, 116);
  $.indexSet($._JsonParser_tokens, 102, 102);
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
    $.add$1(this._sb, $.JsonStringifier__numberToString(object));
    return;
  }
  if (object === true) {
    $.add$1(this._sb, 'true');
    return;
  }
  if (object === false) {
    $.add$1(this._sb, 'false');
    return;
  }
  if (object == null) {
    $.add$1(this._sb, 'null');
    return;
  }
  if (typeof object === 'string') {
    t1 = this._sb;
    $.add$1(t1, '"');
    $.JsonStringifier__escape(t1, object);
    $.add$1(t1, '"');
    return;
  }
  if (typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List())) {
    if (typeof object !== 'object' || object === null || (object.constructor !== Array && !object.is$JavaScriptIndexingBehavior())) return this._stringify$1$bailout(1, object, object);
    this._checkCycle$1(object);
    var t2 = this._sb;
    $.add$1(t2, '[');
    t1 = object.length;
    if (t1 > 0) {
      if (0 >= t1) throw $.ioore(0);
      this._stringify$1(object[0]);
      for (var i = 1; i < object.length; ++i) {
        $.add$1(t2, ',');
        t1 = object.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        this._stringify$1(object[i]);
      }
    }
    $.add$1(t2, ']');
    $.removeLast(this._seen);
    return;
  }
  if (typeof object === 'object' && object !== null && object.is$Map()) {
    this._checkCycle$1(object);
    t2 = this._sb;
    $.add$1(t2, '{');
    t1.first_10 = true;
    object.forEach$1(new $.JsonStringifier__stringify_anon(this, t1));
    $.add$1(t2, '}');
    $.removeLast(this._seen);
    return;
  }
  throw $.captureStackTrace($.CTC39);
 },
 _stringify$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var object = env0;
      object = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = ({});
    case 1:
      if ((state == 0 && typeof object === 'number')) {
        $.add$1(this._sb, $.JsonStringifier__numberToString(object));
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
                        if ((state == 0 && object == null)) {
                          $.add$1(this._sb, 'null');
                          return;
                        } else {
                          switch (state) {
                            case 0:
                            case 1:
                              if ((state == 0 && typeof object === 'string')) {
                                t1 = this._sb;
                                $.add$1(t1, '"');
                                $.JsonStringifier__escape(t1, object);
                                $.add$1(t1, '"');
                                return;
                              } else {
                                switch (state) {
                                  case 0:
                                  case 1:
                                    if (state == 1 || (state == 0 && ((typeof object === 'object' && object !== null) && ((object.constructor === Array || object.is$List()))))) {
                                      switch (state) {
                                        case 0:
                                        case 1:
                                          state = 0;
                                          this._checkCycle$1(object);
                                          var t2 = this._sb;
                                          $.add$1(t2, '[');
                                          if ($.gtB($.get$length(object), 0)) {
                                            this._stringify$1($.index(object, 0));
                                            for (var i = 1; $.ltB(i, $.get$length(object)); ++i) {
                                              $.add$1(t2, ',');
                                              this._stringify$1($.index(object, i));
                                            }
                                          }
                                          $.add$1(t2, ']');
                                          $.removeLast(this._seen);
                                          return;
                                      }
                                    } else {
                                      if (typeof object === 'object' && object !== null && object.is$Map()) {
                                        this._checkCycle$1(object);
                                        t2 = this._sb;
                                        $.add$1(t2, '{');
                                        t1.first_10 = true;
                                        object.forEach$1(new $.JsonStringifier__stringify_anon(this, t1));
                                        $.add$1(t2, '}');
                                        $.removeLast(this._seen);
                                        return;
                                      }
                                      throw $.captureStackTrace($.CTC39);
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
  for (var t1 = this._seen, i = 0; i < t1.length; ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t3 = t1[i];
    if (t3 == null ? object == null : t3 === object) throw $.captureStackTrace('Cyclic structure');
  }
  $.add$1(t1, object);
 }
};

$$.main_anon = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  $.openMainMenu();
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(img) {
  var t1 = $.res_loadImage('mainMenuBackground.png', new $.anon0(this.this_0));
  this.this_0.set$background(t1);
 }
};

$$.anon0 = {"":
 ["this_1"],
 super: "Closure",
 $call$1: function(img) {
  var t1 = $.res_loadImage('attribution.png', new $.anon1(this.this_1));
  this.this_1.set$creditsImage(t1);
 }
};

$$.anon1 = {"":
 ["this_2"],
 super: "Closure",
 $call$1: function(img) {
  $.event = $.UIManager$();
  var t1 = [0, 0, 0, 0, 0];
  this.this_2.set$anim(t1);
  this.this_2.cycle$1(0);
 }
};

$$.res_loadImage_anon = {"":
 ["img_2", "box_0"],
 super: "Closure",
 $call$1: function(e) {
  this.box_0.callback_1.$call$1(this.img_2);
 }
};

$$.res_loadImage_anon0 = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(e) {
  this.box_0.callback_1.$call$1($._Elements_ImageElement(null, null, null));
 }
};

$$.res_loadImage_anon1 = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
 }
};

$$.MainMenu_render_anon = {"":
 ["box_4", "buttonWidth_10", "linex_9", "buttonHeight_8", "this_7"],
 super: "Closure",
 $call$1: function(s) {
  var t1 = ({});
  this.this_7.get$context().save$0();
  this.this_7.get$context().set$fillStyle('#000');
  var t2 = $.ltB($.abs($.sub($.event.get$mouse_position().get$x(), this.linex_9)), $.div(this.buttonWidth_10, 2)) && $.ltB($.abs($.sub($.event.get$mouse_position().get$y(), this.box_4.ypos_5)), $.div(this.buttonHeight_8, 2));
  var t3 = this.this_7;
  if (t2) {
    t2 = t3.get$anim();
    t3 = this.box_4.i_6;
    if ($.ltB($.index(this.this_7.get$anim(), this.box_4.i_6), 1)) {
      var t4 = this.this_7.get$anim();
      var t5 = this.box_4.i_6;
      var t6 = $.add($.index(t4, t5), 0.1);
      $.indexSet(t4, t5, t6);
      t4 = t6;
    } else t4 = 1;
    $.indexSet(t2, t3, t4);
    if ($.event.get$mouseDown() === true) {
      switch (s) {
        case 'Credits':
          this.this_7.set$credits(true);
          $.event.set$mouseDown(false);
          break;
        case 'Play':
          this.this_7.set$active(false);
          t1 = new $.MainMenu_render_anon0();
          this.this_7.set$fin(t1);
          break;
        case 'Dev Mode':
          this.this_7.set$active(false);
          t1 = new $.MainMenu_render_anon1();
          this.this_7.set$fin(t1);
          break;
        case 'Long Night':
          this.this_7.set$active(false);
          t1.count_3 = 1;
          t1 = new $.MainMenu_render_anon2(t1);
          this.this_7.set$fin(t1);
          break;
      }
    } else $.document().get$body().get$style().set$cursor('pointer');
  } else {
    t1 = t3.get$anim();
    t2 = this.box_4.i_6;
    if ($.gtB($.index(this.this_7.get$anim(), this.box_4.i_6), 0)) {
      t3 = this.this_7.get$anim();
      t4 = this.box_4.i_6;
      t5 = $.sub($.index(t3, t4), 0.1);
      $.indexSet(t3, t4, t5);
      t3 = t5;
    } else t3 = 0;
    $.indexSet(t1, t2, t3);
  }
  t1 = this.this_7.get$context();
  t2 = t1.get$globalAlpha();
  t3 = $.div($.index(this.this_7.get$anim(), this.box_4.i_6), 2);
  if (typeof t3 !== 'number') throw $.iae(t3);
  t1.set$globalAlpha($.mul(t2, 0.5 + t3));
  var bw = $.add(this.buttonWidth_10, $.mul($.index(this.this_7.get$anim(), this.box_4.i_6), 20));
  var bh = $.add(this.buttonHeight_8, $.mul($.index(this.this_7.get$anim(), this.box_4.i_6), 10));
  this.this_7.get$context().fillRect$4($.sub(this.linex_9, $.div(bw, 2)), $.sub(this.box_4.ypos_5, $.div(bh, 2)), bw, bh);
  t1 = this.this_7.get$context();
  t4 = t1.get$globalAlpha();
  t5 = $.div($.index(this.this_7.get$anim(), this.box_4.i_6), 2);
  if (typeof t5 !== 'number') throw $.iae(t5);
  t1.set$globalAlpha($.div(t4, 0.5 + t5));
  this.this_7.get$context().set$fillStyle('white');
  this.this_7.get$context().set$font('24px Arial');
  this.this_7.get$context().set$textAlign('center');
  this.this_7.get$context().fillText$3(s, this.linex_9, $.add($.sub(this.box_4.ypos_5, $.div(this.buttonHeight_8, 2)), 32));
  var ypos = $.add(this.box_4.ypos_5, $.add(this.buttonHeight_8, 10));
  this.box_4.ypos_5 = ypos;
  this.this_7.get$context().restore$0();
  var i = $.add(this.box_4.i_6, 1);
  this.box_4.i_6 = i;
 }
};

$$.MainMenu_render_anon0 = {"":
 [],
 super: "Closure",
 $call$0: function() {
  return $.startGame();
 }
};

$$.MainMenu_render_anon1 = {"":
 [],
 super: "Closure",
 $call$0: function() {
  $.DEBUG = true;
  $.startGame();
  $.world.set$intro(false);
 }
};

$$.MainMenu_render_anon2 = {"":
 ["box_2"],
 super: "Closure",
 $call$0: function() {
  var t1 = ({});
  $.startGame();
  $.world.set$intro(false);
  $.world.set$dayLength(432000);
  $.world.set$time(21);
  t1.interval_1 = null;
  t1.interval_1 = $.window().setInterval$2(new $.MainMenu_render_anon3(t1, this.box_2), 500);
 }
};

$$.MainMenu_render_anon3 = {"":
 ["box_0", "box_2"],
 super: "Closure",
 $call$0: function() {
  if ($.eqB($.mod(this.box_2.count_3, 120), 0)) {
    var t1 = $.world;
    t1.set$dayCount($.add(t1.get$dayCount(), 1));
    $.world.increaseDifficulty$0();
    $.notify('Difficulty Increased (Night ' + $.S($.world.get$dayCount()) + ')');
    ($.game == null || $.world.get$paused() === true) && $.window().clearInterval$1(this.box_0.interval_1);
  }
  var count = $.add(this.box_2.count_3, 1);
  this.box_2.count_3 = count;
 }
};

$$.anon2 = {"":
 [],
 super: "Closure",
 $call$1: function(p) {
  return $.SpawnPoint$(p);
 }
};

$$.anon3 = {"":
 [],
 super: "Closure",
 $call$1: function(p) {
  return $.Avatar$(p);
 }
};

$$.anon4 = {"":
 [],
 super: "Closure",
 $call$1: function(p) {
  return $.GameObject$(p, 0, 0);
 }
};

$$.anon5 = {"":
 [],
 super: "Closure",
 $call$1: function(p) {
  return $.Arrow$(p);
 }
};

$$.anon6 = {"":
 [],
 super: "Closure",
 $call$1: function(p) {
  return $.FloatingText$(p);
 }
};

$$.anon7 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  if (avatar.get$damage() == null) {
    avatar.set$armor(1);
    avatar.set$damage(0);
  }
  var t1 = $.mul($.Math_random(), 1.5);
  if (typeof t1 !== 'number') throw $.iae(t1);
  avatar.set$speed(0.5 + t1);
  $.indexSet(avatar, 'destination', avatar.clone$0());
  $.indexSet(avatar, 'waitTime', 0);
  var r = $.add($.Math_random(), $.niceFactor);
  if ($.ltB(r, 0.1)) {
    $.add$1(avatar.get$tags(), 'mean');
    $.addTag(avatar, 'mean');
  } else {
    if ($.gtB(r, 1)) {
      $.add$1(avatar.get$tags(), 'nice');
      $.addTag(avatar, 'nice');
    }
  }
  $.indexSet(avatar, 'followOffset', $.Vec2$($.sub($.mul($.Math_random(), 128), 64), $.sub($.mul($.Math_random(), 128), 64)));
 }
};

$$.anon8 = {"":
 [],
 super: "Closure",
 $call$1: function(citizen) {
  if (citizen.hasTag$1('scared') !== true) {
    var zoms = $.index($.tags, 'zombie');
    if (typeof zoms !== 'string' && (typeof zoms !== 'object' || zoms === null || (zoms.constructor !== Array && !zoms.is$JavaScriptIndexingBehavior()))) return this.$call$1$bailout(1, citizen, zoms, 0);
    var i = $.toInt($.mul($.Math_random(), zoms.length));
    if (typeof i !== 'number') return this.$call$1$bailout(2, citizen, zoms, i);
    var iter = 0;
    for (; t1 = zoms.length, iter < t1 / 16; ++iter, ++i) {
      var index = $.mod(i, t1);
      if (index !== (index | 0)) throw $.iae(index);
      if (index < 0 || index >= t1) throw $.ioore(index);
      if (zoms[index].get$alive() === true) {
        t1 = zoms.length;
        if (index < 0 || index >= t1) throw $.ioore(index);
        var t2 = $.ltB(zoms[index].distanceTo$1(citizen), 96);
        t1 = t2;
      } else t1 = false;
      if (t1) {
        $.forEach(['wander', 'traveler', 'lost', 'following', 'homebound'], new $.anon74(citizen));
        t1 = $.Math_random();
        if (typeof t1 !== 'number') throw $.iae(t1);
        t2 = $.toInt(5 * t1);
        if (t2 !== (t2 | 0)) throw $.iae(t2);
        if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
        citizen.say$2($.CTC43[t2], 100);
        $.add$1(citizen.get$tags(), 'scared');
        $.addTag(citizen, 'scared');
        var t3 = zoms.length;
        if (index < 0 || index >= t3) throw $.ioore(index);
        $.indexSet(citizen, 'scaredOf', zoms[index]);
        $.index($.index($.tagEvents, 'scared'), 'init').$call$1(citizen);
        return;
      }
    }
    zoms = $.index($.tags, 'corpse');
    if (typeof zoms !== 'string' && (typeof zoms !== 'object' || zoms === null || (zoms.constructor !== Array && !zoms.is$JavaScriptIndexingBehavior()))) return this.$call$1$bailout(3, citizen, zoms, 0);
    i = $.toInt($.mul($.Math_random(), zoms.length));
    if (typeof i !== 'number') return this.$call$1$bailout(4, citizen, zoms, i);
    iter = 0;
    for (; t1 = zoms.length, iter < t1 / 16; ++iter, ++i) {
      index = $.mod(i, t1);
      if (index !== (index | 0)) throw $.iae(index);
      if (index < 0 || index >= t1) throw $.ioore(index);
      if (zoms[index].hasTag$1('zombie') !== true) {
        t1 = zoms.length;
        if (index < 0 || index >= t1) throw $.ioore(index);
        t2 = $.ltB(zoms[index].distanceTo$1(citizen), 96);
        t1 = t2;
      } else t1 = false;
      if (t1) {
        $.forEach(['wander', 'traveler', 'lost', 'following', 'homebound'], new $.anon75(citizen));
        t1 = $.Math_random();
        if (typeof t1 !== 'number') throw $.iae(t1);
        t2 = $.toInt(5 * t1);
        if (t2 !== (t2 | 0)) throw $.iae(t2);
        if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
        citizen.say$1($.CTC43[t2]);
        $.add$1(citizen.get$tags(), 'scared');
        $.addTag(citizen, 'scared');
        t3 = zoms.length;
        if (index < 0 || index >= t3) throw $.ioore(index);
        $.indexSet(citizen, 'scaredOf', zoms[index]);
        $.index($.index($.tagEvents, 'scared'), 'init').$call$1(citizen);
        return;
      }
    }
  }
  var t1;
 },
 $call$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var citizen = env0;
      zoms = env1;
      break;
    case 2:
      citizen = env0;
      zoms = env1;
      i = env2;
      break;
    case 3:
      citizen = env0;
      zoms = env1;
      break;
    case 4:
      citizen = env0;
      zoms = env1;
      i = env2;
      break;
  }
  switch (state) {
    case 0:
    default:
      if (state == 1 || state == 2 || state == 3 || state == 4 || (state == 0 && citizen.hasTag$1('scared') !== true)) {
        switch (state) {
          case 0:
            var zoms = $.index($.tags, 'zombie');
          case 1:
            state = 0;
            var i = $.toInt($.mul($.Math_random(), $.get$length(zoms)));
          case 2:
            state = 0;
            var iter = 0;
            for (; $.ltB(iter, $.div($.get$length(zoms), 16)); ++iter, i = $.add(i, 1)) {
              var index = $.mod(i, $.get$length(zoms));
              if ($.index(zoms, index).get$alive() === true && $.ltB($.index(zoms, index).distanceTo$1(citizen), 96)) {
                $.forEach(['wander', 'traveler', 'lost', 'following', 'homebound'], new $.anon74(citizen));
                var t1 = $.Math_random();
                if (typeof t1 !== 'number') throw $.iae(t1);
                var t2 = $.toInt(5 * t1);
                if (t2 !== (t2 | 0)) throw $.iae(t2);
                if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
                citizen.say$2($.CTC43[t2], 100);
                $.add$1(citizen.get$tags(), 'scared');
                $.addTag(citizen, 'scared');
                $.indexSet(citizen, 'scaredOf', $.index(zoms, index));
                $.index($.index($.tagEvents, 'scared'), 'init').$call$1(citizen);
                return;
              }
            }
            zoms = $.index($.tags, 'corpse');
          case 3:
            state = 0;
            i = $.toInt($.mul($.Math_random(), $.get$length(zoms)));
          case 4:
            state = 0;
            iter = 0;
            for (; $.ltB(iter, $.div($.get$length(zoms), 16)); ++iter, i = $.add(i, 1)) {
              index = $.mod(i, $.get$length(zoms));
              if ($.index(zoms, index).hasTag$1('zombie') !== true && $.ltB($.index(zoms, index).distanceTo$1(citizen), 96)) {
                $.forEach(['wander', 'traveler', 'lost', 'following', 'homebound'], new $.anon75(citizen));
                t1 = $.Math_random();
                if (typeof t1 !== 'number') throw $.iae(t1);
                t2 = $.toInt(5 * t1);
                if (t2 !== (t2 | 0)) throw $.iae(t2);
                if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
                citizen.say$1($.CTC43[t2]);
                $.add$1(citizen.get$tags(), 'scared');
                $.addTag(citizen, 'scared');
                $.indexSet(citizen, 'scaredOf', $.index(zoms, index));
                $.index($.index($.tagEvents, 'scared'), 'init').$call$1(citizen);
                return;
              }
            }
        }
      }
  }
 }
};

$$.anon74 = {"":
 ["citizen_2"],
 super: "Closure",
 $call$1: function(tag) {
  if (this.citizen_2.hasTag$1(tag) === true) {
    this.citizen_2.removeTag$1(tag);
    $.rmTag(this.citizen_2, tag);
  }
 }
};

$$.anon75 = {"":
 ["citizen_3"],
 super: "Closure",
 $call$1: function(tag) {
  if (this.citizen_3.hasTag$1(tag) === true) {
    this.citizen_3.removeTag$1(tag);
    $.rmTag(this.citizen_3, tag);
  }
 }
};

$$.anon9 = {"":
 [],
 super: "Closure",
 $call$1: function(citizen) {
  $.ltB(citizen.distanceTo$1($.world.get$player()), 256) && $.audio.play$1('hurt');
  if ($.world.get$player().get$attacking() === true) {
    $.niceFactor = $.sub($.niceFactor, 0.005);
    $.forEach(['wander', 'traveler', 'lost', 'following', 'homebound', 'scared'], new $.anon73(citizen));
    var t1 = $.Math_random();
    if (typeof t1 !== 'number') throw $.iae(t1);
    var t2 = $.toInt(5 * t1);
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
    citizen.say$1($.CTC43[t2]);
    $.add$1(citizen.get$tags(), 'scared');
    $.addTag(citizen, 'scared');
    $.indexSet(citizen, 'scaredOf', $.world.get$player());
    $.index($.index($.tagEvents, 'scared'), 'init').$call$1(citizen);
  }
 }
};

$$.anon73 = {"":
 ["citizen_4"],
 super: "Closure",
 $call$1: function(tag) {
  if (this.citizen_4.hasTag$1(tag) === true) {
    this.citizen_4.removeTag$1(tag);
    $.rmTag(this.citizen_4, tag);
  }
 }
};

$$.anon10 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  var t1 = $.world;
  t1.set$totalPopulation($.sub(t1.get$totalPopulation(), 1));
  t1 = $.world;
  t1.set$awakePopulation($.sub(t1.get$awakePopulation(), 1));
  t1 = $.world;
  t1.set$zombie_max($.add(t1.get$zombie_max(), 1));
  $.niceFactor = $.sub($.niceFactor, 0.01);
  if ($.world.get$player().get$attacking() === true && $.ltB($.world.get$player().distanceTo$1(avatar), 256)) {
    $.niceFactor = $.sub($.niceFactor, 0.05);
    t1 = $.world;
    var t2 = $.Math_random();
    if (typeof t2 !== 'number') throw $.iae(t2);
    t1.giveCoin$2(avatar, $.toInt(10 * t2 + 2));
  }
 }
};

$$.anon11 = {"":
 [],
 super: "Closure",
 $call$1: function(citizen) {
  $.rpat(120) === true && $.add$1(citizen, citizen.get$velocity());
 }
};

$$.anon12 = {"":
 [],
 super: "Closure",
 $call$1: function(player) {
  player.set$damage(25);
  player.set$armor(0.5);
  player.set$speed(1);
 }
};

$$.anon13 = {"":
 [],
 super: "Closure",
 $call$1: function(player) {
  $.notify('You have died, please wait');
  $.indexSet(player, 'deadTime', 540);
 }
};

$$.anon14 = {"":
 ["this_5"],
 super: "Closure",
 $call$1: function(player) {
  $.GameOver(this.this_5.get$context());
 }
};

$$.anon15 = {"":
 [],
 super: "Closure",
 $call$1: function(player) {
  player.set$health($.ltB(player.get$health(), $.world.get$player_max_health()) ? $.add(player.get$health(), 0.2) : $.world.get$player_max_health());
  $.world.collisionAtVec2$1(player) === true && $.add$1(player, player.get$velocity());
 }
};

$$.anon16 = {"":
 [],
 super: "Closure",
 $call$1: function(citizen) {
  $.indexSet(citizen, 'runDirection', citizen.clone$0().sub$1($.index(citizen, 'scaredOf')).normalize$0().multiplyScalar$1(citizen.get$speed()));
 }
};

$$.anon17 = {"":
 [],
 super: "Closure",
 $call$1: function(citizen) {
  $.add$1(citizen.get$velocity(), $.index(citizen, 'runDirection'));
  if ($.rpat(8) === true) {
    if ($.gtB($.index(citizen, 'scaredOf').distanceTo$1(citizen), $.add($.world.get$AGRO_DISTANCE(), 32))) {
      $.switchTag(citizen, 'scared', 'lost');
      $.add$1(citizen.get$tags(), 'wander');
      $.addTag(citizen, 'wander');
    }
  }
 }
};

$$.anon18 = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
  var cnodes = $.world.getClosePathNodes$1(a);
  if (typeof cnodes !== 'string' && (typeof cnodes !== 'object' || cnodes === null || (cnodes.constructor !== Array && !cnodes.is$JavaScriptIndexingBehavior()))) return this.$call$1$bailout(1, a, cnodes);
  if (cnodes.length > 0) {
    if ($.ltB($.world.get$time(), 16)) {
      var t1 = cnodes.length;
      var t2 = $.Math_random();
      if (typeof t2 !== 'number') throw $.iae(t2);
      var ni = $.toInt(t1 * t2);
      if (ni !== (ni | 0)) throw $.iae(ni);
      var t3 = cnodes.length;
      if (ni < 0 || ni >= t3) throw $.ioore(ni);
      $.indexSet(a, 'path', cnodes[ni].get$path());
      t1 = cnodes.length;
      if (ni < 0 || ni >= t1) throw $.ioore(ni);
      $.indexSet(a, 'pathDirection', cnodes[ni].get$start() === true ? 1 : -1);
      t1 = cnodes.length;
      if (ni < 0 || ni >= t1) throw $.ioore(ni);
      if (cnodes[ni].get$start() === true) t1 = 0;
      else {
        t1 = cnodes.length;
        if (ni < 0 || ni >= t1) throw $.ioore(ni);
        t2 = $.sub($.get$length(cnodes[ni].get$path().get$points()), 1);
        t1 = t2;
      }
      $.indexSet(a, 'pathIndex', t1);
      t1 = cnodes.length;
      if (ni < 0 || ni >= t1) throw $.ioore(ni);
      $.indexSet(a, 'pathPoint', cnodes[ni].clone$0());
      t2 = cnodes.length;
      if (ni < 0 || ni >= t2) throw $.ioore(ni);
      $.indexSet(a, 'pathMove', cnodes[ni].clone$0().sub$1(a).normalize$0().multiplyScalar$1(a.get$speed()));
    } else {
      for (var i = cnodes.length - 1; i >= 0; --i) {
        t1 = cnodes.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        if (cnodes[i].get$house() === true) {
          $.some($.index($.tags, 'house'), new $.anon72(a));
          $.switchTag(a, 'traveler', 'homebound');
          $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(a);
          return;
        }
      }
      $.switchTag(a, 'traveler', 'wander');
      $.index($.index($.tagEvents, 'wander'), 'init').$call$1(a);
      return;
    }
  } else {
    $.switchTag(a, 'traveler', 'wander');
    $.index($.index($.tagEvents, 'wander'), 'init').$call$1(a);
  }
 },
 $call$1$bailout: function(state, a, cnodes) {
  if ($.gtB($.get$length(cnodes), 0)) {
    if ($.ltB($.world.get$time(), 16)) {
      var ni = $.toInt($.mul($.get$length(cnodes), $.Math_random()));
      $.indexSet(a, 'path', $.index(cnodes, ni).get$path());
      $.indexSet(a, 'pathDirection', $.index(cnodes, ni).get$start() === true ? 1 : -1);
      $.indexSet(a, 'pathIndex', $.index(cnodes, ni).get$start() === true ? 0 : $.sub($.get$length($.index(cnodes, ni).get$path().get$points()), 1));
      $.indexSet(a, 'pathPoint', $.index(cnodes, ni).clone$0());
      $.indexSet(a, 'pathMove', $.index(cnodes, ni).clone$0().sub$1(a).normalize$0().multiplyScalar$1(a.get$speed()));
    } else {
      for (var i = $.sub($.get$length(cnodes), 1); $.geB(i, 0); i = $.sub(i, 1)) {
        if ($.index(cnodes, i).get$house() === true) {
          $.some($.index($.tags, 'house'), new $.anon72(a));
          $.switchTag(a, 'traveler', 'homebound');
          $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(a);
          return;
        }
      }
      $.switchTag(a, 'traveler', 'wander');
      $.index($.index($.tagEvents, 'wander'), 'init').$call$1(a);
      return;
    }
  } else {
    $.switchTag(a, 'traveler', 'wander');
    $.index($.index($.tagEvents, 'wander'), 'init').$call$1(a);
  }
 }
};

$$.anon72 = {"":
 ["a_6"],
 super: "Closure",
 $call$1: function(house) {
  if ($.ltB(house.distanceTo$1(this.a_6), 256)) {
    $.indexSet(this.a_6, 'home', house);
    return true;
  }
  return false;
 }
};

$$.anon19 = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
  $.indexSet(a, 'pathPoint', $.index($.index(a, 'path').get$points(), $.index(a, 'pathIndex')));
  $.indexSet(a, 'pathMove', $.index(a, 'pathPoint').clone$0().sub$1(a).normalize$0().multiplyScalar$1(a.get$speed()));
  $.add$1(a, $.index(a, 'pathMove'));
 }
};

$$.anon20 = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
  $.add$1(a.get$velocity(), $.index(a, 'pathMove'));
  if ($.ltB($.index(a, 'pathPoint').distanceTo$1(a), 32)) {
    var t1 = $.index(a, 'pathDirection');
    $.indexSet(a, 'pathIndex', $.add($.index(a, 'pathIndex'), t1));
    if ($.ltB($.index(a, 'pathIndex'), 0) || $.geB($.index(a, 'pathIndex'), $.get$length($.index(a, 'path').get$points()))) $.index($.index($.tagEvents, 'traveler'), 'init').$call$1(a);
    else {
      $.indexSet(a, 'pathPoint', $.index($.index(a, 'path').get$points(), $.index(a, 'pathIndex')).clone$0());
      var d = $.div(a.distanceTo$1($.index(a, 'pathPoint')), 4);
      $.index(a, 'pathPoint').addTo$2($.sub($.mul($.Math_random(), d), $.div(d, 2)), $.sub($.mul($.Math_random(), d), $.div(d, 2)));
      $.indexSet(a, 'pathMove', $.index(a, 'pathPoint').clone$0().sub$1(a).normalize$0().multiplyScalar$1(a.get$speed()));
    }
  }
 }
};

$$.anon21 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  $.indexSet(avatar, 'collisionCount', 0);
  $.indexSet(avatar, 'homeboundDirection', $.index(avatar, 'home').clone$0().sub$1(avatar).normalize$0().multiplyScalar$1(avatar.get$speed()));
 }
};

$$.anon22 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  var t1 = ({});
  $.add$1(avatar.get$velocity(), $.index(avatar, 'homeboundDirection'));
  if ($.rpat(8) === true) {
    var d = $.index(avatar, 'home').distanceTo$1(avatar);
    if ($.gtB(d, 256)) {
      t1.found_1 = false;
      $.some($.index($.tags, 'house'), new $.anon71(t1, avatar));
      if (t1.found_1 === true) {
        $.indexSet(avatar, 'collisionCount', 0);
        $.indexSet(avatar, 'homeboundDirection', $.index(avatar, 'home').clone$0().sub$1(avatar).normalize$0().multiplyScalar$1(avatar.get$speed()));
      } else {
        $.switchTag(avatar, 'homebound', 'lost');
        $.add$1(avatar.get$tags(), 'wander');
        $.addTag(avatar, 'wander');
      }
    } else {
      if ($.ltB(d, 32)) {
        avatar.markForRemoval$0();
        t1 = $.world;
        t1.set$awakePopulation($.sub(t1.get$awakePopulation(), 1));
      }
    }
  }
 }
};

$$.anon71 = {"":
 ["box_0", "avatar_7"],
 super: "Closure",
 $call$1: function(house) {
  if ($.ltB(house.distanceTo$1(this.avatar_7), 256)) {
    $.indexSet(this.avatar_7, 'home', house);
    this.box_0.found_1 = true;
    return true;
  }
  return false;
 }
};

$$.anon23 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  $.indexSet(avatar, 'collisionCount', $.add($.index(avatar, 'collisionCount'), 1));
  if ($.gtB($.index(avatar, 'collisionCount'), 120)) {
    $.switchTag(avatar, 'homebound', 'lost');
    $.add$1(avatar.get$tags(), 'wander');
    $.addTag(avatar, 'wander');
  } else {
    if ($.ltB(avatar.distanceTo$1($.index(avatar, 'home')), 256)) {
      avatar.markForRemoval$0();
      var t1 = $.world;
      t1.set$awakePopulation($.sub(t1.get$awakePopulation(), 1));
    }
  }
 }
};

$$.anon24 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  if (avatar.get$speaking() === true) {
    avatar.set$sayTime($.sub(avatar.get$sayTime(), 1));
    $.ltB(avatar.get$sayTime(), 0) && avatar.set$speaking(false);
  }
  if ($.rpat(8) === true && $.ltB(avatar.distanceTo$1($.world.get$player()), 64)) {
    var t1 = $.Math_random();
    if (typeof t1 !== 'number') throw $.iae(t1);
    var t2 = $.toInt(3 * t1);
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    if (t2 < 0 || t2 >= 3) throw $.ioore(t2);
    avatar.say$1($.CTC42[t2]);
    $.switchTag(avatar, 'lost', 'following');
    avatar.removeTag$1('wander');
    $.rmTag(avatar, 'wander');
  } else {
    var i = $.toInt($.mul($.Math_random(), $.get$length($.index($.tags, 'house'))));
    if (typeof i !== 'number') return this.$call$1$bailout(1, avatar, i);
    var iter = 0;
    for (; iter < 4; ++iter, ++i) {
      t1 = $.get$length($.index($.tags, 'house'));
      if (typeof t1 !== 'number') throw $.iae(t1);
      var index = $.mod(i, t1);
      if ($.ltB($.index($.index($.tags, 'house'), index).distanceTo$1(avatar), 256)) {
        $.indexSet(avatar, 'home', $.index($.index($.tags, 'house'), index));
        $.switchTag(avatar, 'lost', 'homebound');
        $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(avatar);
        avatar.removeTag$1('wander');
        $.rmTag(avatar, 'wander');
        iter = 9999;
      }
    }
  }
 },
 $call$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var avatar = env0;
      i = env1;
      break;
  }
  switch (state) {
    case 0:
      if (avatar.get$speaking() === true) {
        avatar.set$sayTime($.sub(avatar.get$sayTime(), 1));
        $.ltB(avatar.get$sayTime(), 0) && avatar.set$speaking(false);
      }
    case 1:
      if ((state == 0 && ($.rpat(8) === true && $.ltB(avatar.distanceTo$1($.world.get$player()), 64)))) {
        var t1 = $.Math_random();
        if (typeof t1 !== 'number') throw $.iae(t1);
        var t2 = $.toInt(3 * t1);
        if (t2 !== (t2 | 0)) throw $.iae(t2);
        if (t2 < 0 || t2 >= 3) throw $.ioore(t2);
        avatar.say$1($.CTC42[t2]);
        $.switchTag(avatar, 'lost', 'following');
        avatar.removeTag$1('wander');
        $.rmTag(avatar, 'wander');
      } else {
        switch (state) {
          case 0:
            var i = $.toInt($.mul($.Math_random(), $.get$length($.index($.tags, 'house'))));
          case 1:
            state = 0;
            var iter = 0;
            for (; iter < 4; ++iter, i = $.add(i, 1)) {
              var index = $.mod(i, $.get$length($.index($.tags, 'house')));
              if ($.ltB($.index($.index($.tags, 'house'), index).distanceTo$1(avatar), 256)) {
                $.indexSet(avatar, 'home', $.index($.index($.tags, 'house'), index));
                $.switchTag(avatar, 'lost', 'homebound');
                $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(avatar);
                avatar.removeTag$1('wander');
                $.rmTag(avatar, 'wander');
                iter = 9999;
              }
            }
        }
      }
  }
 }
};

$$.anon25 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  $.indexSet(avatar, 'deadTime', 0);
  avatar.set$speaking(false);
 }
};

$$.anon26 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  $.indexSet(avatar, 'deadTime', $.add($.index(avatar, 'deadTime'), 1));
  if ($.gtB($.index(avatar, 'deadTime'), 600)) {
    avatar.fireTagEvent$1('decomposed');
    avatar.markForRemoval$0();
  }
 }
};

$$.anon27 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  if (avatar.get$speaking() === true) {
    avatar.set$sayTime($.sub(avatar.get$sayTime(), 1));
    $.ltB(avatar.get$sayTime(), 0) && avatar.set$speaking(false);
  }
  $.gtB(avatar.distanceTo$1($.world.get$player()), 64) && $.add$1(avatar.get$velocity(), $.add$1($.world.get$player().clone$0(), $.index(avatar, 'followOffset')).sub$1(avatar).normalize$0().multiplyScalar$1(2));
  var i = $.toInt($.mul($.Math_random(), $.get$length($.index($.tags, 'house'))));
  if (typeof i !== 'number') return this.$call$1$bailout(1, avatar, i);
  var iter = 0;
  for (; iter < 4; ++iter, ++i) {
    var t1 = $.get$length($.index($.tags, 'house'));
    if (typeof t1 !== 'number') throw $.iae(t1);
    var index = $.mod(i, t1);
    if ($.ltB($.index($.index($.tags, 'house'), index).distanceTo$1(avatar), 256)) {
      avatar.say$2($.rpat(2) === true ? 'Thank you!' : 'Thanks!', 100);
      $.indexSet(avatar, 'home', $.index($.index($.tags, 'house'), index));
      $.world.giveCoin$2(avatar, $.toInt($.add($.mul($.Math_random(), 20), 5)));
      $.niceFactor = $.add($.niceFactor, 0.05);
      t1 = $.world;
      t1.set$saved($.add(t1.get$saved(), 1));
      $.switchTag(avatar, 'following', 'homebound');
      $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(avatar);
      iter = 9999;
    }
  }
 },
 $call$1$bailout: function(state, avatar, i) {
  var iter = 0;
  for (; iter < 4; ++iter, i = $.add(i, 1)) {
    var index = $.mod(i, $.get$length($.index($.tags, 'house')));
    if ($.ltB($.index($.index($.tags, 'house'), index).distanceTo$1(avatar), 256)) {
      avatar.say$2($.rpat(2) === true ? 'Thank you!' : 'Thanks!', 100);
      $.indexSet(avatar, 'home', $.index($.index($.tags, 'house'), index));
      $.world.giveCoin$2(avatar, $.toInt($.add($.mul($.Math_random(), 20), 5)));
      $.niceFactor = $.add($.niceFactor, 0.05);
      var t1 = $.world;
      t1.set$saved($.add(t1.get$saved(), 1));
      $.switchTag(avatar, 'following', 'homebound');
      $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(avatar);
      iter = 9999;
    }
  }
 }
};

$$.anon28 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  $.indexSet(avatar.get$prop(), 'destination', avatar.clone$0().addTo$2($.sub($.mul($.Math_random(), 100), 50), $.sub($.mul($.Math_random(), 100), 50)));
 }
};

$$.anon29 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  $.indexSet(avatar.get$prop(), 'destination', avatar.clone$0());
  $.indexSet(avatar.get$prop(), 'waitTime', 0);
 }
};

$$.anon30 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  if ($.gtB($.index(avatar.get$prop(), 'waitTime'), 0)) {
    var t1 = avatar.get$prop();
    $.indexSet(t1, 'waitTime', $.sub($.index(t1, 'waitTime'), 1));
  } else {
    if ($.gtB($.index(avatar.get$prop(), 'destination').distanceTo$1(avatar), 2)) {
      var destination = $.index(avatar.get$prop(), 'destination');
      $.add$1(avatar.get$velocity(), destination.clone$0().sub$1(avatar).normalize$0().multiplyScalar$1(avatar.get$speed()));
    } else {
      if ($.ltB($.Math_random(), 0.75)) $.indexSet(avatar.get$prop(), 'destination', avatar.clone$0().addTo$2($.sub($.mul($.Math_random(), 400), 200), $.sub($.mul($.Math_random(), 400), 200)));
      else {
        $.indexSet(avatar.get$prop(), 'destination', avatar.clone$0());
        $.indexSet(avatar.get$prop(), 'waitTime', $.mul($.Math_random(), 200));
        avatar.set$currentFrame(0);
        avatar.get$velocity().zero$0();
      }
    }
  }
 }
};

$$.anon31 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  avatar.set$sayTime($.mul($.Math_random(), 500));
 }
};

$$.anon32 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  if ($.ltB(avatar.get$sayTime(), 0)) {
    avatar.set$speaking(false);
    $.forEach($.index($.tags, 'player'), new $.anon70(avatar));
    avatar.set$sayTime($.mul($.Math_random(), 500));
  } else avatar.set$sayTime($.sub(avatar.get$sayTime(), 1));
 }
};

$$.anon70 = {"":
 ["avatar_8"],
 super: "Closure",
 $call$1: function(player) {
  if ($.ltB(player.distanceTo$1(this.avatar_8), 80)) {
    var t1 = this.avatar_8;
    var t2 = $.toInt($.mul($.Math_random(), 5));
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
    t1.say$1($.CTC41[t2]);
  }
 }
};

$$.anon33 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  avatar.set$sayTime($.mul($.Math_random(), 500));
 }
};

$$.anon34 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  if ($.ltB(avatar.get$sayTime(), 0)) {
    avatar.set$speaking(false);
    $.forEach($.index($.tags, 'player'), new $.anon69(avatar));
    avatar.set$sayTime($.mul($.Math_random(), 500));
  } else avatar.set$sayTime($.sub(avatar.get$sayTime(), 1));
 }
};

$$.anon69 = {"":
 ["avatar_9"],
 super: "Closure",
 $call$1: function(player) {
  if ($.ltB(player.distanceTo$1(this.avatar_9), 80)) {
    var t1 = this.avatar_9;
    var t2 = $.toInt($.mul($.Math_random(), 5));
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    if (t2 < 0 || t2 >= 5) throw $.ioore(t2);
    t1.say$1($.CTC40[t2]);
  }
 }
};

$$.anon35 = {"":
 [],
 super: "Closure",
 $call$1: function(avatar) {
  if ($.ltB(avatar.get$sayTime(), 0)) {
    avatar.set$speaking(false);
    $.rpat(2) === true && avatar.say$1($.index($.index(avatar, 'calls'), $.toInt($.mul($.get$length($.index(avatar, 'calls')), $.Math_random()))));
    var t1 = $.mul($.Math_random(), 200);
    if (typeof t1 !== 'number') throw $.iae(t1);
    avatar.set$sayTime(100 + t1);
  } else avatar.set$sayTime($.sub(avatar.get$sayTime(), 1));
  $.ltB($.world.get$player().distanceTo$1(avatar), 128) && $.eqB($.get$length($.notifications), 0) && $.notify('Press Space to Interact');
 }
};

$$.anon36 = {"":
 [],
 super: "Closure",
 $call$1: function(arrow) {
  $.add$1(arrow, $.index(arrow, 'direction').divideScalar$1(1.5));
  if (!$.gtB($.get$length($.world.damageBubble$4(arrow, 32, $.index(arrow, 'damage'), $.index(arrow, 'direction').clone$0().normalize$0())), 0)) {
    if ($.world.collisionAtVec2$1(arrow) !== true) {
      var t1 = arrow.get$distance();
      arrow.set$distance($.add(t1, 1));
      t1 = $.gtB(t1, 12);
    } else t1 = true;
  } else t1 = true;
  t1 && arrow.remove$0();
 }
};

$$.anon37 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  var t1 = $.Math_random();
  if (typeof t1 !== 'number') throw $.iae(t1);
  zom.set$speed(0.5 + t1);
 }
};

$$.anon38 = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
  if ($.ltB($.world.get$player().distanceTo$1(a), 256) && $.world.get$player().get$attacking() === true) {
    var t1 = $.world;
    t1.set$zombies_killed($.add(t1.get$zombies_killed(), 1));
    $.world.giveCoin$2(a, $.toInt($.add($.mul($.Math_random(), 4), 1)));
  }
 }
};

$$.anon39 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  $.indexSet(zom, 'originalPosition', zom.clone$0());
  zom.set$damage($.world.get$ZOMBIE_DAMAGE());
  zom.set$armor($.world.get$ZOMBIE_ARMOR());
  $.index($.index($.tagEvents, 'wander'), 'init').$call$1(zom);
 }
};

$$.anon40 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  if ($.rpat(20) === true) {
    if ($.gtB($.index(zom.get$prop(), 'waitTime'), 0)) {
      var t1 = zom.get$prop();
      $.indexSet(t1, 'waitTime', $.sub($.index(t1, 'waitTime'), 1));
    } else {
      if ($.gtB($.index(zom.get$prop(), 'destination').distanceTo$1(zom), 2)) {
        var destination = $.index(zom.get$prop(), 'destination');
        $.add$1(zom.get$velocity(), destination.clone$0().sub$1(zom).normalize$0().multiplyScalar$1($.mul(zom.get$speed(), $.world.get$ZOMBIE_SPEED())));
      } else {
        if ($.ltB($.Math_random(), 0.75)) $.indexSet(zom.get$prop(), 'destination', zom.clone$0().addTo$2($.sub($.mul($.Math_random(), 400), 200), $.sub($.mul($.Math_random(), 400), 200)));
        else {
          $.indexSet(zom.get$prop(), 'destination', zom.clone$0());
          $.indexSet(zom.get$prop(), 'waitTime', $.mul($.Math_random(), 200));
          zom.set$currentFrame(0);
          zom.get$velocity().zero$0();
        }
      }
    }
    $.some($.index($.tags, 'friendly'), new $.anon68(zom));
  }
 }
};

$$.anon68 = {"":
 ["zom_10"],
 super: "Closure",
 $call$1: function(avatar) {
  if (avatar.get$alive() === true && $.ltB(avatar.distanceTo$1(this.zom_10), $.world.get$AGRO_DISTANCE())) {
    $.rmTag(this.zom_10, 'hostile-wander');
    this.zom_10.removeTag$1('hostile-wander');
    $.addTag(this.zom_10, 'hostile');
    $.add$1(this.zom_10.get$tags(), 'hostile');
    $.indexSet(this.zom_10, 'target', avatar);
    return true;
  }
  return false;
 }
};

$$.anon41 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  $.indexSet(zom.get$prop(), 'destination', zom.clone$0().addTo$2($.sub($.mul($.Math_random(), 100), 50), $.sub($.mul($.Math_random(), 100), 50)));
 }
};

$$.anon42 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  $.some($.index($.tags, 'friendly'), new $.anon67(zom));
 }
};

$$.anon67 = {"":
 ["zom_11"],
 super: "Closure",
 $call$1: function(avatar) {
  if (avatar.get$alive() === true && (avatar.get$attacking() === true && $.ltB(avatar.distanceTo$1(this.zom_11), $.mul($.world.get$AGRO_DISTANCE(), 2)))) {
    $.rmTag(this.zom_11, 'hostile-wander');
    this.zom_11.removeTag$1('hostile-wander');
    $.addTag(this.zom_11, 'hostile');
    $.add$1(this.zom_11.get$tags(), 'hostile');
    $.indexSet(this.zom_11, 'target', avatar);
    return true;
  }
  return false;
 }
};

$$.anon43 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  if (!($.index(zom, 'target') == null) && ($.index(zom, 'target').get$alive() === true && $.index(zom, 'target').get$markedForRemoval() !== true)) {
    var target = $.index(zom, 'target');
    var distance = target.distanceTo$1(zom);
    if ($.ltB(distance, 32)) {
      zom.set$attacking(true);
      zom.set$attackDirection(target.clone$0().sub$1(zom).normalize$0());
      zom.get$velocity().divideScalar$1(2);
    } else {
      if ($.ltB(distance, $.mul($.world.get$AGRO_DISTANCE(), 2))) {
        zom.set$attacking(false);
        zom.get$velocity().sub$1(zom.clone$0().sub$1(target).normalize$0().multiplyScalar$1($.mul($.world.get$ZOMBIE_SPEED(), zom.get$speed())));
      } else {
        $.switchTag(zom, 'hostile', 'hostile-wander');
        $.indexSet(zom, 'target', null);
      }
    }
  } else $.switchTag(zom, 'hostile', 'hostile-wander');
 }
};

$$.anon44 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  if ($.index(zom, 'target').get$alive() !== true) {
    zom.removeTag$1('hostile');
    $.add$1(zom.get$tags(), 'hostile-wander');
    $.addTag(zom, 'hostile-wander');
    $.rmTag(zom, 'hostile');
    $.indexSet(zom, 'target', null);
    zom.set$attacking(false);
  }
 }
};

$$.anon45 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  $.some($.index($.tags, 'friendly'), new $.anon66(zom));
 }
};

$$.anon66 = {"":
 ["zom_12"],
 super: "Closure",
 $call$1: function(friend) {
  if (friend.get$attacking() === true && $.ltB(friend.distanceTo$1(this.zom_12), 96)) {
    $.indexSet(this.zom_12, 'target', friend);
    return true;
  }
  return false;
 }
};

$$.anon46 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  $.indexSet(zom, 'nestDirection', $.index(zom, 'originalPosition').clone$0().sub$1(zom).normalize$0());
  $.indexSet(zom, 'collisionCount', 0);
 }
};

$$.anon47 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  $.add$1(zom.get$velocity(), $.index(zom, 'nestDirection'));
  $.rpat(4) === true && $.ltB(zom.distanceTo$1($.index(zom, 'originalPosition')), 32) && zom.markForRemoval$0();
 }
};

$$.anon48 = {"":
 [],
 super: "Closure",
 $call$1: function(zom) {
  $.indexSet(zom, 'collisionCount', $.add($.index(zom, 'collisionCount'), 1));
  $.gtB($.index(zom, 'collisionCount'), 120) && zom.markForRemoval$0();
 }
};

$$.anon49 = {"":
 [],
 super: "Closure",
 $call$1: function(ftext) {
  ftext.set$time($.add(ftext.get$time(), 1));
  ftext.set$y($.sub(ftext.get$y(), 0.5));
  $.gtB(ftext.get$time(), 150) && ftext.remove$0();
 }
};

$$.anon50 = {"":
 ["this_13"],
 super: "Closure",
 $call$1: function(data) {
  $.world.load$2(data, new $.anon61(this.this_13));
 }
};

$$.anon61 = {"":
 ["this_14"],
 super: "Closure",
 $call$0: function() {
  this.this_14.loadFinish$0();
 }
};

$$.web_load_anon = {"":
 ["callback_1", "req_0"],
 super: "Closure",
 $call$1: function(e) {
  $.eqB(this.req_0.get$readyState(), 4) && $.eqB(this.req_0.get$status(), 200) && this.callback_1.$call$1(this.req_0.get$responseText());
 }
};

$$.World_load_anon = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 $call$1: function(imgs) {
  this.this_1.set$itemImages(imgs);
  $.print('items loaded');
  $.res_loadSplitImage('ui.png', new $.World_load_anon0(this.this_1, this.callback_0), 32, 32);
 }
};

$$.World_load_anon0 = {"":
 ["this_3", "callback_2"],
 super: "Closure",
 $call$1: function(ui_imgs) {
  this.this_3.set$uiImages(ui_imgs);
  $.print('Loading \'test\' map');
  this.this_3.loadMap$2('test', this.callback_2);
 }
};

$$.res_loadSplitImage_anon = {"":
 ["img_3", "callback_2", "py_1", "px_0"],
 super: "Closure",
 $call$1: function(e) {
  $.HiddenCanvas_split(this.img_3, this.px_0, this.py_1, this.callback_2);
 }
};

$$.HiddenCanvas_split_addToList = {"":
 ["list_4", "box_0", "callback_3", "hc_2"],
 super: "Closure",
 $call$1: function(n) {
  this.hc_2.getImage$1(new $.HiddenCanvas_split_addToList_anon(this.list_4, this.callback_3, this.box_0, n));
 }
};

$$.HiddenCanvas_split_addToList_anon = {"":
 ["list_7", "callback_6", "box_0", "n_5"],
 super: "Closure",
 $call$1: function(img) {
  $.indexSet(this.list_7, this.n_5, img);
  var amt = $.add(this.box_0.amt_1, 1);
  this.box_0.amt_1 = amt;
  $.geB(this.box_0.amt_1, $.get$length(this.list_7)) && this.callback_6.$call$1(this.list_7);
 }
};

$$.HiddenCanvas_getImage_anon = {"":
 ["img_1", "callback_0"],
 super: "Closure",
 $call$1: function(e) {
  this.callback_0.$call$1(this.img_1);
 }
};

$$.World_unpackObjects_anon = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(p) {
  var a = $.Avatar$($.index($.index(this.list_2, this.box_0.i_1), 'properties'));
  a.loadProperties$1(p);
  return a;
 }
};

$$.World_unpackObjects_anon0 = {"":
 ["list_3", "box_0"],
 super: "Closure",
 $call$1: function(p) {
  var a = $.Item$($.index($.index(this.list_3, this.box_0.i_1), 'properties'));
  a.loadProperties$1(p);
  return a;
 }
};

$$.World_unpackObjects_anon1 = {"":
 ["list_4", "box_0"],
 super: "Closure",
 $call$1: function(p) {
  var a = $.GameObject$($.index($.index(this.list_4, this.box_0.i_1), 'properties'), 0, 0);
  a.loadProperties$1(p);
  return a;
 }
};

$$.Animation_loadProperties_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$2: function(k, v) {
  switch (k) {
    case 'walk':
      var t1 = this.this_0;
      t1.loadWalkAnimation$2(v, new $.Animation_loadProperties_anon0(t1));
      break;
    case 'slash':
      t1 = this.this_0;
      t1.loadSlashAnimation$2(v, new $.Animation_loadProperties_anon1(t1));
      break;
    case 'death':
      t1 = this.this_0;
      t1.loadDeathAnimation$2(v, new $.Animation_loadProperties_anon2(t1));
      break;
    case 'shoot':
      t1 = this.this_0;
      t1.loadShootAnimation$2(v, new $.Animation_loadProperties_anon3(t1));
      break;
    case 'thrust':
      t1 = this.this_0;
      t1.loadThrustAnimation$2(v, new $.Animation_loadProperties_anon4(t1));
      break;
  }
 }
};

$$.Animation_loadProperties_anon0 = {"":
 ["this_1"],
 super: "Closure",
 $call$1: function(animation) {
  $.indexSet(this.this_1.get$frameMapIndex(), 1, animation);
 }
};

$$.Animation_loadProperties_anon1 = {"":
 ["this_2"],
 super: "Closure",
 $call$1: function(animation) {
  $.indexSet(this.this_2.get$frameMapIndex(), 2, animation);
 }
};

$$.Animation_loadProperties_anon2 = {"":
 ["this_3"],
 super: "Closure",
 $call$1: function(animation) {
  $.indexSet(this.this_3.get$frameMapIndex(), 3, animation);
 }
};

$$.Animation_loadProperties_anon3 = {"":
 ["this_4"],
 super: "Closure",
 $call$1: function(animation) {
  $.indexSet(this.this_4.get$frameMapIndex(), 4, animation);
 }
};

$$.Animation_loadProperties_anon4 = {"":
 ["this_5"],
 super: "Closure",
 $call$1: function(animation) {
  $.indexSet(this.this_5.get$frameMapIndex(), 5, animation);
 }
};

$$.Animation_loadThrustAnimation_anon = {"":
 ["callback_0"],
 super: "Closure",
 $call$1: function(imgs) {
  this.callback_0.$call$1($.FrameMap$(4, 8, imgs));
 }
};

$$.Animation_loadShootAnimation_anon = {"":
 ["callback_0"],
 super: "Closure",
 $call$1: function(imgs) {
  this.callback_0.$call$1($.FrameMap$(4, 13, imgs));
 }
};

$$.Animation_loadDeathAnimation_anon = {"":
 ["callback_0"],
 super: "Closure",
 $call$1: function(imgs) {
  this.callback_0.$call$1($.FrameMap$(1, 6, imgs));
 }
};

$$.Animation_loadSlashAnimation_anon = {"":
 ["callback_0"],
 super: "Closure",
 $call$1: function(imgs) {
  this.callback_0.$call$1($.FrameMap$(4, 6, imgs));
 }
};

$$.Animation_loadWalkAnimation_anon = {"":
 ["callback_0"],
 super: "Closure",
 $call$1: function(imgs) {
  this.callback_0.$call$1($.FrameMap$(4, 9, imgs));
 }
};

$$.GameObject_loadProperties_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$2: function(k, v) {
  this.this_0.setProperty$2(k, v);
 }
};

$$.GameObject_setProperty_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(v) {
  $.addTag(this.this_0, v);
  $.add$1(this.this_0.get$tags(), v);
 }
};

$$.GameObject_remove_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(tag) {
  $.rmTag(this.this_0, tag);
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$.World_loadMap_anon = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 $call$1: function(data) {
  this.this_1.fmtCollisionMap$1(data);
  this.callback_0.$call$0();
 }
};

$$.res_loadFile_anon = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
 }
};

$$.World_unpackMapPaths_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(raw) {
  var points = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(points, ({E: 'Vec2'}));
  for (var i = 0; $.ltB(i, $.get$length($.index(raw, 'point_x'))); ++i) {
    points.push($.Vec2$($.index($.index(raw, 'point_x'), i), $.index($.index(raw, 'point_y'), i)));
  }
  var t1 = this.this_0.get$paths();
  var t2 = points.length;
  if (0 >= t2) throw $.ioore(0);
  var t3 = points[0];
  var t4 = t2 - 1;
  if (t4 < 0 || t4 >= t2) throw $.ioore(t4);
  var path = $.Path$(t3, points[t4], points, $.index(raw, 'startHouse'), $.index(raw, 'endHouse'));
  $.add$1(t1, path);
  $.add$1(this.this_0.get$pathnodes(), path.start);
  $.add$1(this.this_0.get$pathnodes(), path.end);
 }
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 $call$1: function(key) {
  return this.f_0.$call$2(key, $.index(this.this_1, key));
 }
};

$$.anon51 = {"":
 ["this_2"],
 super: "Closure",
 $call$1: function(e) {
  this.this_2.setKey$2(e.get$keyCode(), 1);
  var i = $.sub($.get$length(this.this_2.get$onKeyPress()), 1);
  if (typeof i !== 'number') return this.$call$1$bailout(1, e, i);
  for (; i >= 0; --i) {
    if ($.eqB($.index(this.this_2.get$onKeyPress(), i).$call$1(e), true)) return;
  }
 },
 $call$1$bailout: function(state, e, i) {
  for (; $.geB(i, 0); i = $.sub(i, 1)) {
    if ($.eqB($.index(this.this_2.get$onKeyPress(), i).$call$1(e), true)) return;
  }
 }
};

$$.anon52 = {"":
 ["this_3"],
 super: "Closure",
 $call$1: function(e) {
  this.this_3.setKey$2(e.get$keyCode(), 0);
 }
};

$$.anon53 = {"":
 ["this_4", "box_0"],
 super: "Closure",
 $call$1: function(e) {
  if (this.box_0.touches_1 == null) {
    this.this_4.mouseDownAt$2($.div($.sub(e.get$pageX(), $.CANVAS_OFFSETX), $.RESOLUTION), $.div($.sub(e.get$pageY(), $.CANVAS_OFFSETY), $.RESOLUTION));
    var i = $.sub($.get$length(this.this_4.get$onClick()), 1);
    if (typeof i !== 'number') return this.$call$1$bailout(1, e, i);
    for (; i >= 0; --i) {
      $.eqB($.index(this.this_4.get$onClick(), i).$call$1(e), true) && $.removeRange(this.this_4.get$onClick(), i, 1);
    }
  }
 },
 $call$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var e = env0;
      i = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      if (state == 1 || (state == 0 && this.box_0.touches_1 == null)) {
        switch (state) {
          case 0:
            this.this_4.mouseDownAt$2($.div($.sub(e.get$pageX(), $.CANVAS_OFFSETX), $.RESOLUTION), $.div($.sub(e.get$pageY(), $.CANVAS_OFFSETY), $.RESOLUTION));
            var i = $.sub($.get$length(this.this_4.get$onClick()), 1);
          case 1:
            state = 0;
            for (; $.geB(i, 0); i = $.sub(i, 1)) {
              $.eqB($.index(this.this_4.get$onClick(), i).$call$1(e), true) && $.removeRange(this.this_4.get$onClick(), i, 1);
            }
        }
      }
  }
 }
};

$$.anon54 = {"":
 ["this_5", "box_0"],
 super: "Closure",
 $call$1: function(e) {
  this.box_0.touches_1 == null && this.this_5.mouseUpAt$2($.div($.sub(e.get$pageX(), $.CANVAS_OFFSETX), $.RESOLUTION), $.div($.sub(e.get$pageY(), $.CANVAS_OFFSETY), $.RESOLUTION));
 }
};

$$.anon55 = {"":
 ["this_6", "box_0"],
 super: "Closure",
 $call$1: function(e) {
  this.box_0.touches_1 == null && this.this_6.mouseAt$2($.div($.sub(e.get$pageX(), $.CANVAS_OFFSETX), $.RESOLUTION), $.div($.sub(e.get$pageY(), $.CANVAS_OFFSETY), $.RESOLUTION));
 }
};

$$.anon56 = {"":
 ["this_7"],
 super: "Closure",
 $call$1: function(e) {
  $.forEach(e.get$changedTouches(), new $.anon59(this.this_7));
  e.preventDefault$0();
 }
};

$$.anon59 = {"":
 ["this_8"],
 super: "Closure",
 $call$1: function(touch) {
  this.this_8.mouseDownAt$2($.div($.sub(touch.get$pageX(), $.CANVAS_OFFSETX), $.RESOLUTION), $.div($.sub(touch.get$pageY(), $.CANVAS_OFFSETY), $.RESOLUTION));
 }
};

$$.anon57 = {"":
 ["this_9", "box_0"],
 super: "Closure",
 $call$1: function(e) {
  var touches = e.get$touches();
  this.box_0.touches_1 = touches;
  this.this_9.mouseAt$2($.div($.sub($.index(this.box_0.touches_1, 0).get$pageX(), $.CANVAS_OFFSETX), $.RESOLUTION), $.div($.sub($.index(this.box_0.touches_1, 0).get$pageY(), $.CANVAS_OFFSETY), $.RESOLUTION));
  e.preventDefault$0();
 }
};

$$.anon58 = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  e.preventDefault$0();
 }
};

$$.anon60 = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(soundName) {
  $.indexSet(this.this_0.get$audioElements(), soundName, $.document().query$1('#audio_' + $.S(soundName)));
 }
};

$$.World_startCycle_anon = {"":
 ["this_6"],
 super: "Closure",
 $call$1: function(e) {
  if ($.eqB($.event.key$1('E'), 1) || $.eqB($.event.key$1('Q'), 1)) {
    var t1 = $.mod($.sub($.add(this.this_6.get$currentWeapon(), $.event.key$1('E')), $.event.key$1('Q')), $.get$length(this.this_6.get$playerWeapons()));
    this.this_6.set$currentWeapon(t1);
    for (; $.index(this.this_6.get$playerWeapons(), this.this_6.get$currentWeapon()) !== true; ) {
      t1 = $.mod($.add(this.this_6.get$currentWeapon(), 1), $.get$length(this.this_6.get$playerWeapons()));
      this.this_6.set$currentWeapon(t1);
    }
    t1 = !$.eqB(this.this_6.get$currentWeapon(), 0);
    var t2 = this.this_6;
    if (t1) {
      t1 = $.index($.animationMap, 'weapon' + $.S(t2.get$currentWeapon()));
      this.this_6.get$player().set$weaponAnimation(t1);
    } else t2.get$player().set$weaponAnimation(null);
    t1 = $.index(this.this_6.get$weaponDamage(), this.this_6.get$currentWeapon());
    this.this_6.get$player().set$damage(t1);
    t1 = $.index(this.this_6.get$weaponAttackTime(), this.this_6.get$currentWeapon());
    this.this_6.get$player().set$attackTime(t1);
    t1 = $.index(this.this_6.get$weaponAttackTypes(), this.this_6.get$currentWeapon());
    this.this_6.get$player().set$attackType(t1);
    $.notify('Using ' + $.S($.index(this.this_6.get$weaponName(), this.this_6.get$currentWeapon())));
  } else {
    if ($.eqB($.event.key$1('F'), 1)) {
      if ($.document().get$webkitIsFullScreen() !== true) $.document().get$body().webkitRequestFullscreen$0();
      else $.document().webkitCancelFullScreen$0();
    }
  }
 }
};

$$.World_startCycle_anon0 = {"":
 ["this_7", "box_3"],
 super: "Closure",
 $call$1: function(e) {
  if ($.eqB($.event.key$1('space'), 1) && $.eqB($.get$length(this.this_7.get$menuInterfaces()), 0)) {
    var t1 = new $.World_startCycle_prompt();
    $.add$1(this.this_7.get$menuInterfaces(), $.MenuInterface$('options', $.makeLiteralMap(['options', [$.makeLiteralMap(['name', 'Place Spawn', 'func', new $.World_startCycle_anon5(this.this_7, t1)]), $.makeLiteralMap(['name', 'Place Object', 'func', new $.World_startCycle_anon6(this.this_7, t1)]), $.makeLiteralMap(['name', 'Place Node', 'func', new $.World_startCycle_anon7(this.this_7, this.box_3)]), $.makeLiteralMap(['name', 'Advance time one hour', 'func', new $.World_startCycle_anon8(this.this_7)]), $.makeLiteralMap(['name', 'Toggle Debug Mode', 'func', new $.World_startCycle_anon9()]), $.makeLiteralMap(['name', 'Simulate 2 hours', 'func', new $.World_startCycle_anon10(this.this_7)]), $.makeLiteralMap(['name', 'Dump Trace', 'func', new $.World_startCycle_anon11(this.this_7)]), $.makeLiteralMap(['name', 'Game Over', 'func', new $.World_startCycle_anon12()]), $.makeLiteralMap(['name', 'Prosperity', 'func', new $.World_startCycle_anon13(this.this_7)]), $.makeLiteralMap(['name', 'Test Menu', 'func', new $.World_startCycle_anon14(this.this_7)]), $.makeLiteralMap(['name', 'Get JSON', 'func', new $.World_startCycle_anon15(this.this_7)])]])));
  }
 }
};

$$.World_startCycle_prompt = {"":
 [],
 super: "Closure",
 $call$2: function(s, def) {
  return $.window().prompt$2(s, def);
 },
 $call$1: function(s) {
  return this.$call$2(s,'')
}
};

$$.World_startCycle_anon5 = {"":
 ["this_9", "prompt_8"],
 super: "Closure",
 $call$0: function() {
  $.add$1(this.this_9.get$menuInterfaces(), $.MenuInterface$('options', $.makeLiteralMap(['options', [$.makeLiteralMap(['name', 'Zombie Node', 'func', new $.World_startCycle_anon23(this.this_9)]), $.makeLiteralMap(['name', 'Custom Emitter', 'func', new $.World_startCycle_anon24(this.this_9, this.prompt_8)])]])));
 }
};

$$.World_startCycle_anon23 = {"":
 ["this_10"],
 super: "Closure",
 $call$0: function() {
  $.add$1($.index(this.this_10.get$currentMapTree(), 'objects'), $.makeLiteralMap(['type', 'node', 'tag', ['zombie-spawn'], 'x', this.this_10.get$player().get$x(), 'y', this.this_10.get$player().get$y()]));
 }
};

$$.World_startCycle_anon24 = {"":
 ["this_12", "prompt_11"],
 super: "Closure",
 $call$0: function() {
  return $.add$1($.index(this.this_12.get$currentMapTree(), 'objects'), $.makeLiteralMap(['type', 'spawn', 'emit', this.prompt_11.$call$1('Emit Type'), 'emit-properties', $.makeLiteralMap(['tag', $.split(this.prompt_11.$call$1('Emit Properties (\',\' delimited)'), ',')]), 'freq', $.Math_parseInt(this.prompt_11.$call$1('Freq (60 = 1 second)')), 'limit', $.Math_parseInt(this.prompt_11.$call$1('Limit')), 'x', $.toInt(this.this_12.get$player().get$x()), 'y', $.toInt(this.this_12.get$player().get$y())]));
 }
};

$$.World_startCycle_anon6 = {"":
 ["this_14", "prompt_13"],
 super: "Closure",
 $call$0: function() {
  $.add$1(this.this_14.get$menuInterfaces(), $.MenuInterface$('options', $.makeLiteralMap(['options', [$.makeLiteralMap(['name', 'Custom Object', 'func', new $.World_startCycle_anon22(this.this_14, this.prompt_13)])]])));
 }
};

$$.World_startCycle_anon22 = {"":
 ["this_16", "prompt_15"],
 super: "Closure",
 $call$0: function() {
  return $.add$1($.index(this.this_16.get$currentMapTree(), 'objects'), $.makeLiteralMap(['type', this.prompt_15.$call$1('Type'), 'tag', $.split(this.prompt_15.$call$1('Tags, delimit with \',\''), ','), 'x', $.toInt(this.this_16.get$player().get$x()), 'y', $.toInt(this.this_16.get$player().get$y())]));
 }
};

$$.World_startCycle_anon7 = {"":
 ["this_17", "box_3"],
 super: "Closure",
 $call$0: function() {
  return $.add$1(this.this_17.get$menuInterfaces(), $.MenuInterface$('options', $.makeLiteralMap(['options', [$.makeLiteralMap(['name', 'House Node', 'func', new $.World_startCycle_anon17(this.this_17)]), $.makeLiteralMap(['name', 'Path Node', 'func', new $.World_startCycle_anon18(this.this_17, this.box_3)]), $.makeLiteralMap(['name', 'End Path Node', 'func', new $.World_startCycle_anon19(this.this_17, this.box_3)])]])));
 }
};

$$.World_startCycle_anon17 = {"":
 ["this_18"],
 super: "Closure",
 $call$0: function() {
  return $.add$1($.index(this.this_18.get$currentMapTree(), 'objects'), $.makeLiteralMap(['type', 'node', 'tag', ['house'], 'x', $.toInt(this.this_18.get$player().get$x()), 'y', $.toInt(this.this_18.get$player().get$y())]));
 }
};

$$.World_startCycle_anon18 = {"":
 ["this_19", "box_3"],
 super: "Closure",
 $call$0: function() {
  return $.add$1(this.box_3.debugPathNodes_4, this.this_19.get$player().clone$0());
 }
};

$$.World_startCycle_anon19 = {"":
 ["this_20", "box_3"],
 super: "Closure",
 $call$0: function() {
  var t1 = ({});
  $.add$1(this.box_3.debugPathNodes_4, this.this_20.get$player().clone$0());
  var ax = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(ax, ({E: 'int'}));
  var ay = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(ay, ({E: 'int'}));
  $.forEach(this.box_3.debugPathNodes_4, new $.World_startCycle_anon20(ay, ax));
  var t2 = this.box_3.debugPathNodes_4;
  var end = $.index(t2, $.sub($.get$length(t2), 1));
  var start = $.index(this.box_3.debugPathNodes_4, 0);
  t1.endHouse_1 = false;
  t1.startHouse_2 = false;
  $.forEach($.index($.tags, 'house'), new $.World_startCycle_anon21(start, t1, end));
  $.add$1($.index(this.this_20.get$currentMapTree(), 'paths'), $.makeLiteralMap(['type', 'path', 'point_x', ax, 'point_y', ay, 'endHouse', t1.endHouse_1, 'startHouse', t1.startHouse_2]));
  var debugPathNodes = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(debugPathNodes, ({E: 'Vec2'}));
  this.box_3.debugPathNodes_4 = debugPathNodes;
 }
};

$$.World_startCycle_anon20 = {"":
 ["ay_22", "ax_21"],
 super: "Closure",
 $call$1: function(node) {
  $.add$1(this.ax_21, $.toInt(node.get$x()));
  $.add$1(this.ay_22, $.toInt(node.get$y()));
 }
};

$$.World_startCycle_anon21 = {"":
 ["start_24", "box_0", "end_23"],
 super: "Closure",
 $call$1: function(house) {
  if ($.ltB(house.distanceTo$1(this.end_23), 256)) this.box_0.endHouse_1 = true;
  if ($.ltB(house.distanceTo$1(this.start_24), 256)) this.box_0.startHouse_2 = true;
 }
};

$$.World_startCycle_anon8 = {"":
 ["this_25"],
 super: "Closure",
 $call$0: function() {
  var t1 = this.this_25;
  var t2 = $.add(t1.get$time(), 1);
  t1.set$time(t2);
  return t2;
 }
};

$$.World_startCycle_anon9 = {"":
 [],
 super: "Closure",
 $call$0: function() {
  $.DEBUG = $.DEBUG !== true;
 }
};

$$.World_startCycle_anon10 = {"":
 ["this_26"],
 super: "Closure",
 $call$0: function() {
  for (var i = 0; $.ltB(i, $.div(this.this_26.get$dayLength(), 12)); ++i) {
    this.this_26.update$0();
  }
 }
};

$$.World_startCycle_anon11 = {"":
 ["this_27"],
 super: "Closure",
 $call$0: function() {
  $.print('Player : Health : ' + $.S(this.this_27.get$player().get$health()) + ' : Damage : ' + $.S(this.this_27.get$player().get$damage()) + ' : Armor : ' + $.S(this.this_27.get$player().get$armor()));
  $.print('Mouse : ' + $.S($.toString($.event.get$mouse_position())));
 }
};

$$.World_startCycle_anon12 = {"":
 [],
 super: "Closure",
 $call$0: function() {
  return $.GameOver($.game.get$context());
 }
};

$$.World_startCycle_anon13 = {"":
 ["this_28"],
 super: "Closure",
 $call$0: function() {
  var t1 = this.this_28;
  t1.giveCoin$2(t1.get$player(), 2000);
  t1 = this.this_28;
  t1.set$totalPopulation($.add(t1.get$totalPopulation(), 200));
 }
};

$$.World_startCycle_anon14 = {"":
 ["this_29"],
 super: "Closure",
 $call$0: function() {
  return $.add$1(this.this_29.get$menuInterfaces(), $.MenuInterface$('confirm', $.makeLiteralMap(['text', 'Would you like to confirm?', 'func', new $.World_startCycle_anon16()])));
 }
};

$$.World_startCycle_anon16 = {"":
 [],
 super: "Closure",
 $call$0: function() {
  $.print('Confirmed');
 }
};

$$.World_startCycle_anon15 = {"":
 ["this_30"],
 super: "Closure",
 $call$0: function() {
  return $.print($.window().open$3('javascript:document.body.innerHTML=\'' + $.S($.JSON_stringify(this.this_30.get$dataTree())) + '\';', 'JSON Data', 'height=300,width=300'));
 }
};

$$.World_startCycle_anon1 = {"":
 ["this_31"],
 super: "Closure",
 $call$1: function(e) {
  !$.eqB($.get$length(this.this_31.get$menuInterfaces()), 0) && $.event.set$mouseDown(false);
  var i = $.sub($.get$length(this.this_31.get$menuInterfaces()), 1);
  if (typeof i !== 'number') return this.$call$1$bailout(1, i);
  for (; i >= 0; --i) {
    $.index(this.this_31.get$menuInterfaces(), i).clickAt$2($.event.get$mouse_position().get$x(), $.event.get$mouse_position().get$y()) === true && $.removeRange(this.this_31.get$menuInterfaces(), i, 1);
  }
  $.tags.containsKey$1('item') === true && $.some($.index($.tags, 'item'), new $.World_startCycle_anon4(this.this_31));
 },
 $call$1$bailout: function(state, i) {
  for (; $.geB(i, 0); i = $.sub(i, 1)) {
    $.index(this.this_31.get$menuInterfaces(), i).clickAt$2($.event.get$mouse_position().get$x(), $.event.get$mouse_position().get$y()) === true && $.removeRange(this.this_31.get$menuInterfaces(), i, 1);
  }
  $.tags.containsKey$1('item') === true && $.some($.index($.tags, 'item'), new $.World_startCycle_anon4(this.this_31));
 }
};

$$.World_startCycle_anon4 = {"":
 ["this_32"],
 super: "Closure",
 $call$1: function(item) {
  if ($.ltB(this.this_32.get$player().distanceTo$1(item), 32)) {
    $.event.set$mouseDown(false);
    $.notify('You found ' + $.S(item.get$prop().containsKey$1('properName') === true ? $.index(item, 'properName') : item.get$type()));
    this.this_32.pickUpItem$1(item);
    return true;
  }
  return false;
 }
};

$$.World_startCycle_anon2 = {"":
 ["this_33"],
 super: "Closure",
 $call$1: function(e) {
  $.eqB($.event.key$1('space'), 1) && $.tags.containsKey$1('salesman') === true && $.forEach($.index($.tags, 'salesman'), new $.World_startCycle_anon3(this.this_33));
 }
};

$$.World_startCycle_anon3 = {"":
 ["this_34"],
 super: "Closure",
 $call$1: function(a) {
  $.ltB(a.distanceTo$1(this.this_34.get$player()), 128) && this.this_34.openMenu$1($.index(a, 'menu'));
 }
};

$$.World_startCycle_cycle = {"":
 ["context_37", "box_3", "frameSkip_36", "this_35"],
 super: "Closure",
 $call$1: function(a) {
  if (this.this_35.get$paused() !== true) {
    $.window().requestAnimationFrame$1(this);
    this.this_35.update$0();
    if ($.eqB($.event.key$1('T'), 1)) {
      this.this_35.update$0();
      this.this_35.update$0();
      this.this_35.update$0();
    }
    var t1 = this.box_3.c_inc_5;
    var c_inc = $.add(t1, 1);
    this.box_3.c_inc_5 = c_inc;
    $.eqB($.mod(t1, this.frameSkip_36), 0) && this.this_35.render$1(this.context_37);
  }
 }
};

$$.World_render_anon = {"":
 ["c_0"],
 super: "Closure",
 $call$1: function(object) {
  object.render$1(this.c_0);
 }
};

$$.World_render_anon0 = {"":
 ["c_1"],
 super: "Closure",
 $call$1: function(path) {
  this.c_1.beginPath$0();
  this.c_1.set$strokeStyle('#fff');
  this.c_1.set$lineWidth(5);
  this.c_1.set$lineCap('round');
  this.c_1.set$fillStyle('#fff');
  this.c_1.moveTo$2(path.get$start().get$x(), path.get$start().get$y());
  $.forEach(path.get$points(), new $.World_render_anon2(this.c_1));
  this.c_1.stroke$0();
  this.c_1.closePath$0();
 }
};

$$.World_render_anon2 = {"":
 ["c_2"],
 super: "Closure",
 $call$1: function(point) {
  this.c_2.lineTo$2(point.get$x(), point.get$y());
 }
};

$$.World_render_anon1 = {"":
 ["c_3"],
 super: "Closure",
 $call$1: function(mi) {
  mi.render$1(this.c_3);
 }
};

$$.notify_anon = {"":
 [],
 super: "Closure",
 $call$1: function(note) {
  note.set$y($.add(note.get$y(), 32));
 }
};

$$.World_update_anon = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
  a.removeTag$1('lost');
  $.rmTag(a, 'lost');
 }
};

$$.World_update_anon0 = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
  $.switchTag(a, 'following', 'wander');
  a.say$1('Thank you!');
  $.add$1(a.get$tags(), 'nice');
  $.addTag(a, 'nice');
 }
};

$$.World_update_anon1 = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
  a.markForRemoval$0();
 }
};

$$.World_update_anon2 = {"":
 [],
 super: "Closure",
 $call$1: function(citizen) {
  if (citizen.hasTag$1('ai') === true && (citizen.hasTag$1('lost') !== true && citizen.hasTag$1('citizen') === true)) {
    if ($.ltB($.Math_random(), 0.9)) {
      $.switchTag(citizen, 'wander', 'homebound');
      $.index($.index($.tagEvents, 'homebound'), 'init').$call$1(citizen);
    } else {
      $.add$1(citizen.get$tags(), 'lost');
      $.addTag(citizen, 'lost');
    }
  }
 }
};

$$.World_update_anon3 = {"":
 [],
 super: "Closure",
 $call$1: function(ob) {
  ob.fireTagEvent$1('init');
  ob.removeTag$1('uninit');
 }
};

$$.World_update_anon4 = {"":
 [],
 super: "Closure",
 $call$1: function(g) {
  return g.fireTagEvent$1('update');
 }
};

$$.World_update_anon5 = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(actor) {
  if (actor.get$alive() === true) {
    if (actor.get$attacking() === true) {
      actor.set$currentAttackTime($.add(actor.get$currentAttackTime(), 1));
      if ($.gtB(actor.get$currentAttackTime(), actor.get$attackTime())) {
        actor.set$currentAttackTime(0);
        if ($.eqB(actor.get$attackType(), 0)) {
          var attacked = this.this_0.damageBubble$4($.add$1(actor.clone$0(), actor.get$attackDirection().clone$0().multiplyScalar$1(actor.get$attackRadius())), $.div(actor.get$attackRadius(), 2), actor.get$damage(), actor.get$attackDirection());
          if (typeof attacked !== 'string' && (typeof attacked !== 'object' || attacked === null || (attacked.constructor !== Array && !attacked.is$JavaScriptIndexingBehavior()))) return this.$call$1$bailout(1, actor, attacked);
          for (var i = 0; t1 = attacked.length, i < t1; ++i) {
            if (i < 0 || i >= t1) throw $.ioore(i);
            attacked[i].get$alive() !== true && actor.fireTagEvent$1('kill');
          }
          $.ltB(actor.distanceTo$1(this.this_0.get$player()), 256) && $.audio.play$1('bump');
        } else {
          if ($.eqB(actor.get$attackType(), 1)) {
            this.this_0.spawnObject$2('arrow', $.makeLiteralMap(['direction', actor.get$attackDirection().clone$0().multiplyScalar$1(128), 'x', $.add(actor.get$x(), $.mul(actor.get$attackDirection().get$x(), 32)), 'y', $.add(actor.get$y(), $.mul(actor.get$attackDirection().get$y(), 32)), 'damage', actor.get$damage()]));
            $.audio.play$1('shoot');
          } else {
            if ($.eqB(actor.get$attackType(), 2)) {
              attacked = this.this_0.damageBubble$4($.add$1(actor.clone$0(), actor.get$attackDirection().clone$0().multiplyScalar$1(actor.get$attackRadius())), $.div(actor.get$attackRadius(), 2), actor.get$damage(), actor.get$attackDirection().clone$0().multiplyScalar$1(1.5));
              if (typeof attacked !== 'string' && (typeof attacked !== 'object' || attacked === null || (attacked.constructor !== Array && !attacked.is$JavaScriptIndexingBehavior()))) return this.$call$1$bailout(2, actor, attacked);
              for (i = 0; t1 = attacked.length, i < t1; ++i) {
                if (i < 0 || i >= t1) throw $.ioore(i);
                attacked[i].get$alive() !== true && actor.fireTagEvent$1('kill');
              }
            }
          }
        }
      }
      t1 = $.sub(actor.get$currentAttackTime(), actor.get$attackTime());
      var t2 = actor.get$attackType();
      if (t2 !== (t2 | 0)) throw $.iae(t2);
      if (t2 < 0 || t2 >= 3) throw $.ioore(t2);
      var timeToAttack = $.add(t1, $.CTC34[t2]);
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
    t2 = actor.get$attacking() === true ? 2 : 1;
    t1.divideScalar$1(1.5 * t2);
    if (this.this_0.collisionAtVec2$1($.add$1(actor.clone$0(), actor.get$velocity())) === true) {
      this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(actor.get$velocity().get$x(), 0)) === true && actor.get$velocity().zeroX$0();
      this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(0, actor.get$velocity().get$y())) === true && actor.get$velocity().zeroY$0();
      $.add$1(actor, actor.get$velocity());
      actor.fireTagEvent$1('collide');
    } else {
      if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(actor.get$velocity().get$x(), 0)) === true) {
        $.add$1(actor, actor.get$velocity().zeroX$0());
        actor.fireTagEvent$1('collide');
      } else {
        if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(0, actor.get$velocity().get$y())) === true) {
          $.add$1(actor, actor.get$velocity().zeroY$0());
          actor.fireTagEvent$1('collide');
        } else $.add$1(actor, actor.get$velocity());
      }
    }
  } else {
    $.ltB(actor.get$currentFrame(), 25) && actor.set$currentFrame($.add(actor.get$currentFrame(), 1));
  }
  var t1;
 },
 $call$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var actor = env0;
      attacked = env1;
      break;
    case 2:
      actor = env0;
      attacked = env1;
      break;
  }
  switch (state) {
    case 0:
    default:
      if (state == 1 || state == 2 || (state == 0 && actor.get$alive() === true)) {
        switch (state) {
          case 0:
          default:
            if (state == 1 || state == 2 || (state == 0 && actor.get$attacking() === true)) {
              switch (state) {
                case 0:
                  actor.set$currentAttackTime($.add(actor.get$currentAttackTime(), 1));
                default:
                  if (state == 1 || state == 2 || (state == 0 && $.gtB(actor.get$currentAttackTime(), actor.get$attackTime()))) {
                    switch (state) {
                      case 0:
                        actor.set$currentAttackTime(0);
                      default:
                        if (state == 1 || (state == 0 && $.eqB(actor.get$attackType(), 0))) {
                          switch (state) {
                            case 0:
                              var attacked = this.this_0.damageBubble$4($.add$1(actor.clone$0(), actor.get$attackDirection().clone$0().multiplyScalar$1(actor.get$attackRadius())), $.div(actor.get$attackRadius(), 2), actor.get$damage(), actor.get$attackDirection());
                            case 1:
                              state = 0;
                              for (var i = 0; $.ltB(i, $.get$length(attacked)); ++i) {
                                $.index(attacked, i).get$alive() !== true && actor.fireTagEvent$1('kill');
                              }
                              $.ltB(actor.distanceTo$1(this.this_0.get$player()), 256) && $.audio.play$1('bump');
                          }
                        } else {
                          switch (state) {
                            case 0:
                            case 2:
                              if ((state == 0 && $.eqB(actor.get$attackType(), 1))) {
                                this.this_0.spawnObject$2('arrow', $.makeLiteralMap(['direction', actor.get$attackDirection().clone$0().multiplyScalar$1(128), 'x', $.add(actor.get$x(), $.mul(actor.get$attackDirection().get$x(), 32)), 'y', $.add(actor.get$y(), $.mul(actor.get$attackDirection().get$y(), 32)), 'damage', actor.get$damage()]));
                                $.audio.play$1('shoot');
                              } else {
                                switch (state) {
                                  case 0:
                                  case 2:
                                    if (state == 2 || (state == 0 && $.eqB(actor.get$attackType(), 2))) {
                                      switch (state) {
                                        case 0:
                                          attacked = this.this_0.damageBubble$4($.add$1(actor.clone$0(), actor.get$attackDirection().clone$0().multiplyScalar$1(actor.get$attackRadius())), $.div(actor.get$attackRadius(), 2), actor.get$damage(), actor.get$attackDirection().clone$0().multiplyScalar$1(1.5));
                                        case 2:
                                          state = 0;
                                          for (i = 0; $.ltB(i, $.get$length(attacked)); ++i) {
                                            $.index(attacked, i).get$alive() !== true && actor.fireTagEvent$1('kill');
                                          }
                                      }
                                    }
                                }
                              }
                          }
                        }
                    }
                  }
                  var t1 = $.sub(actor.get$currentAttackTime(), actor.get$attackTime());
                  var t2 = actor.get$attackType();
                  if (t2 !== (t2 | 0)) throw $.iae(t2);
                  if (t2 < 0 || t2 >= 3) throw $.ioore(t2);
                  var timeToAttack = $.add(t1, $.CTC34[t2]);
                  t1 = actor.get$currentFrame();
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
            t2 = actor.get$attacking() === true ? 2 : 1;
            t1.divideScalar$1(1.5 * t2);
            if (this.this_0.collisionAtVec2$1($.add$1(actor.clone$0(), actor.get$velocity())) === true) {
              this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(actor.get$velocity().get$x(), 0)) === true && actor.get$velocity().zeroX$0();
              this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(0, actor.get$velocity().get$y())) === true && actor.get$velocity().zeroY$0();
              $.add$1(actor, actor.get$velocity());
              actor.fireTagEvent$1('collide');
            } else {
              if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(actor.get$velocity().get$x(), 0)) === true) {
                $.add$1(actor, actor.get$velocity().zeroX$0());
                actor.fireTagEvent$1('collide');
              } else {
                if (this.this_0.collisionAtVec2$1(actor.clone$0().addTo$2(0, actor.get$velocity().get$y())) === true) {
                  $.add$1(actor, actor.get$velocity().zeroY$0());
                  actor.fireTagEvent$1('collide');
                } else $.add$1(actor, actor.get$velocity());
              }
            }
        }
      } else {
        $.ltB(actor.get$currentFrame(), 25) && actor.set$currentFrame($.add(actor.get$currentFrame(), 1));
      }
  }
 }
};

$$.World_update_anon6 = {"":
 [],
 super: "Closure",
 $call$1: function(spawn) {
  spawn.update$0();
 }
};

$$.GameOver_rcycle = {"":
 ["img_6", "menu_pos_5", "c_4", "box_2"],
 super: "Closure",
 $call$1: function(a) {
  var t1 = ({});
  var timePass = $.add(this.box_2.timePass_3, 1);
  this.box_2.timePass_3 = timePass;
  this.c_4.set$globalAlpha(1);
  this.c_4.drawImage$3(this.img_6, 0, 0);
  this.c_4.save$0();
  var t2 = this.menu_pos_5;
  t2.set$x($.sub(t2.get$x(), $.div($.sub(this.menu_pos_5.get$x(), $.sub($.SCREEN_WIDTH, 400)), 10)));
  this.c_4.translate$2(this.menu_pos_5.get$x(), this.menu_pos_5.get$y());
  this.c_4.set$fillStyle('#000');
  this.c_4.set$globalAlpha(0.75);
  this.c_4.fillRect$4(0, 0, 400, $.SCREEN_HEIGHT);
  this.c_4.set$globalAlpha(1);
  this.c_4.set$font('48px Arial');
  this.c_4.set$fillStyle('#fff');
  this.c_4.fillText$3('Game Over', 75, 75);
  this.c_4.set$font('18px Arial');
  t1.ypos_1 = 160;
  $.forEach([['Village Population', $.S($.world.get$totalPopulation())], ['Zombie Population', $.S($.world.get$zombie_max())], ['Zombies Killed', $.S($.world.get$zombies_killed())], ['Villagers Saved', $.S($.world.get$saved())], ['Days Survived', $.S($.world.get$dayCount())]], new $.GameOver_rcycle_anon(t1, this.c_4));
  this.c_4.set$textAlign('center');
  this.c_4.fillText$3('Click anywhere to play again', 200, $.add(t1.ypos_1, 50));
  this.c_4.fillText$3('Game by Severin Ibarluzea', 200, $.sub($.SCREEN_HEIGHT, 50));
  this.c_4.fillText$3('For the Liberated Pixel Cup (2012)', 200, $.sub($.SCREEN_HEIGHT, 25));
  this.c_4.restore$0();
  $.game == null && $.window().requestAnimationFrame$1(this);
 }
};

$$.GameOver_rcycle_anon = {"":
 ["box_0", "c_7"],
 super: "Closure",
 $call$1: function(not) {
  this.c_7.set$textAlign('left');
  this.c_7.fillText$3($.index(not, 0), 25, this.box_0.ypos_1);
  this.c_7.set$textAlign('right');
  this.c_7.fillText$3($.index(not, 1), 350, this.box_0.ypos_1);
  var ypos = $.add(this.box_0.ypos_1, 40);
  this.box_0.ypos_1 = ypos;
 }
};

$$.GameOver_anon = {"":
 ["box_2"],
 super: "Closure",
 $call$1: function(e) {
  if ($.geB(this.box_2.timePass_3, 120)) {
    $.openMainMenu();
    return true;
  }
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
 }
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$.GameObject_fireTagEvent_anon = {"":
 ["this_1", "event_0"],
 super: "Closure",
 $call$1: function(tag) {
  $.tagEvents.containsKey$1(tag) === true && $.index($.tagEvents, tag).containsKey$1(this.event_0) === true && $.index($.index($.tagEvents, tag), this.event_0).$call$1(this.this_1);
 }
};

$$.World_damageBubble_anon = {"":
 ["direction_4", "attacked_3", "radius_2", "point_1", "damage_0"],
 super: "Closure",
 $call$1: function(actor) {
  if (actor.get$alive() === true && $.ltB(actor.distanceTo$1(this.point_1), this.radius_2)) {
    $.add$1(this.attacked_3, actor);
    actor.hurt$2(this.damage_0, this.direction_4);
  }
 }
};

$$.World_openMenu_anon = {"":
 ["i_1", "this_0"],
 super: "Closure",
 $call$0: function() {
  var t1 = $.geB(this.this_0.get$coin(), $.index(this.this_0.get$weaponCost(), this.i_1));
  var t2 = this.this_0;
  return t1 ? $.add$1(t2.get$menuInterfaces(), $.MenuInterface$('confirm', $.makeLiteralMap(['text', 'Would you like to buy the ' + $.S($.index(this.this_0.get$weaponName(), this.i_1)) + ' for ' + $.S($.index(this.this_0.get$weaponCost(), this.i_1)) + 'c?', 'func', new $.World_openMenu_anon5(this.i_1, this.this_0)]))) : $.add$1(t2.get$menuInterfaces(), $.MenuInterface$('broke', $.makeLiteralMap(['text', 'You cannot afford the ' + $.S($.index(this.this_0.get$weaponName(), this.i_1)) + ', come back when you have ' + $.S($.index(this.this_0.get$weaponCost(), this.i_1)) + 'c.'])));
 }
};

$$.World_openMenu_anon5 = {"":
 ["i_3", "this_2"],
 super: "Closure",
 $call$0: function() {
  return this.this_2.purchaseWeapon$1(this.i_3);
 }
};

$$.World_openMenu_anon0 = {"":
 ["i_5", "this_4"],
 super: "Closure",
 $call$0: function() {
  var t1 = $.geB(this.this_4.get$coin(), $.index(this.this_4.get$weaponCost(), this.i_5));
  var t2 = this.this_4;
  return t1 ? $.add$1(t2.get$menuInterfaces(), $.MenuInterface$('confirm', $.makeLiteralMap(['text', 'Would you like to buy a ' + $.S($.index(this.this_4.get$weaponName(), this.i_5)) + ' damage upgrade for ' + $.S($.index(this.this_4.get$weaponCost(), this.i_5)) + 'c?', 'func', new $.World_openMenu_anon4(this.i_5, this.this_4)]))) : $.add$1(t2.get$menuInterfaces(), $.MenuInterface$('broke', $.makeLiteralMap(['text', 'You cannot afford a ' + $.S($.index(this.this_4.get$weaponName(), this.i_5)) + ' damage upgrade, come back when you have ' + $.S($.index(this.this_4.get$weaponCost2(), this.i_5)) + 'c.'])));
 }
};

$$.World_openMenu_anon4 = {"":
 ["i_7", "this_6"],
 super: "Closure",
 $call$0: function() {
  return this.this_6.purchaseUpgrade$2('damage', this.i_7);
 }
};

$$.World_openMenu_anon1 = {"":
 ["i_9", "this_8"],
 super: "Closure",
 $call$0: function() {
  var t1 = $.geB(this.this_8.get$coin(), $.index(this.this_8.get$weaponCost2(), this.i_9));
  var t2 = this.this_8;
  return t1 ? $.add$1(t2.get$menuInterfaces(), $.MenuInterface$('confirm', $.makeLiteralMap(['text', 'Would you like to buy a ' + $.S($.index(this.this_8.get$weaponName(), this.i_9)) + ' damage upgrade for ' + $.S($.index(this.this_8.get$weaponCost2(), this.i_9)) + 'c?', 'func', new $.World_openMenu_anon3(this.i_9, this.this_8)]))) : $.add$1(t2.get$menuInterfaces(), $.MenuInterface$('broke', $.makeLiteralMap(['text', 'You cannot afford a ' + $.S($.index(this.this_8.get$weaponName(), this.i_9)) + ' attack rate upgrade, come back when you have ' + $.S($.index(this.this_8.get$weaponCost2(), this.i_9)) + 'c.'])));
 }
};

$$.World_openMenu_anon3 = {"":
 ["i_11", "this_10"],
 super: "Closure",
 $call$0: function() {
  return this.this_10.purchaseUpgrade$2('rate', this.i_11);
 }
};

$$.World_openMenu_anon2 = {"":
 ["this_12"],
 super: "Closure",
 $call$0: function() {
  var t1 = this.this_12;
  t1.set$player_max_health($.add(t1.get$player_max_health(), 50));
  t1 = this.this_12;
  t1.set$coin($.sub(t1.get$coin(), 300));
 }
};

$$.anon62 = {"":
 [],
 super: "Closure",
 $call$0: function() {
 }
};

$$.anon63 = {"":
 [],
 super: "Closure",
 $call$0: function() {
 }
};

$$.anon64 = {"":
 [],
 super: "Closure",
 $call$0: function() {
 }
};

$$.anon65 = {"":
 [],
 super: "Closure",
 $call$0: function() {
 }
};

$$.MenuInterface_renderConfirmMenu_anon = {"":
 ["c_0"],
 super: "Closure",
 $call$1: function(button) {
  return button.render$1(this.c_0);
 }
};

$$._ElementImpl_rect_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  return $._ElementRectImpl$(this.this_0);
 }
};

$$._maybeScheduleMeasurementFrame_anon = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return $._completeMeasurementFutures();
 }
};

$$._DocumentFragmentImpl_rect_anon = {"":
 [],
 super: "Closure",
 $call$0: function() {
  return $.CTC38;
 }
};

$$.MenuInterface_renderOptionsMenu_anon = {"":
 ["c_0"],
 super: "Closure",
 $call$1: function(button) {
  return button.render$1(this.c_0);
 }
};

$$.MenuInterface_clickAt_anon = {"":
 ["x_3", "box_0", "y_2"],
 super: "Closure",
 $call$1: function(button) {
  if (button.clickAt$2(this.x_3, this.y_2) === true) {
    this.box_0.returner_1 = true;
    button.action$0();
    return true;
  }
  return false;
 }
};

$$.JsonStringifier__stringify_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.box_0.first_10 !== true;
  var t2 = this.this_2;
  if (t1) $.add$1(t2.get$_sb(), ',"');
  else $.add$1(t2.get$_sb(), '"');
  $.JsonStringifier__escape(this.this_2.get$_sb(), key);
  $.add$1(this.this_2.get$_sb(), '":');
  this.this_2._stringify$1(value);
  this.box_0.first_10 = false;
 }
};

$$.World_getClosePathNodes_anon = {"":
 ["v_1", "cnodes_0"],
 super: "Closure",
 $call$1: function(node) {
  $.ltB(node.distanceTo$1(this.v_1), 256) && $.add$1(this.cnodes_0, node);
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_11;
  var i = $.add(t2, 1);
  this.box_0.i_11 = i;
  $.indexSet(t1, t2, value);
 }
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$.ConstantMap_getValues_anon = {"":
 ["this_1", "result_0"],
 super: "Closure",
 $call$1: function(key) {
  return $.add$1(this.result_0, $.index(this.this_1, key));
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.GameOver = function(c) {
  var t1 = ({});
  $.world.set$paused(true);
  var menu_pos = $.Vec2$($.SCREEN_WIDTH, 0);
  var img = $._Elements_ImageElement(null, null, null);
  img.set$src($.game.get$canvas().toDataURL$1('image/png'));
  $.game = null;
  t1.timePass_3 = 0;
  var t2 = new $.GameOver_rcycle(img, menu_pos, c, t1);
  $.window().requestAnimationFrame$1(t2);
  $.add$1($.event.get$onClick(), new $.GameOver_anon(t1));
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
  }
  return a === b;
};

$._completeMeasurementFutures = function() {
  if ($.eqB($._nextMeasurementFrameScheduled, false)) return;
  $._nextMeasurementFrameScheduled = false;
  if (!($._pendingRequests == null)) {
    for (var t1 = $.iterator($._pendingRequests); t1.hasNext$0() === true; ) {
      var request = t1.next$0();
      try {
        var t2 = request.computeValue$0();
        request.set$value(t2);
      } catch (exception) {
        t2 = $.unwrapException(exception);
        var e = t2;
        t2 = e;
        request.set$value(t2);
        request.set$exception(true);
      }
    }
  }
  var completedRequests = $._pendingRequests;
  var readyMeasurementFrameCallbacks = $._pendingMeasurementFrameCallbacks;
  $._pendingRequests = null;
  $._pendingMeasurementFrameCallbacks = null;
  if (!(completedRequests == null)) {
    for (t1 = $.iterator(completedRequests); t1.hasNext$0() === true; ) {
      t2 = t1.next$0();
      if (t2.get$exception() === true) t2.get$completer().completeException$1(t2.get$value());
      else t2.get$completer().complete$1(t2.get$value());
    }
  }
  if (!(readyMeasurementFrameCallbacks == null)) {
    for (t1 = $.iterator(readyMeasurementFrameCallbacks); t1.hasNext$0() === true; ) {
      t1.next$0().$call$0();
    }
  }
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$.FrameMap$ = function(orientations_, positions_, list) {
  return new $.FrameMap(list, positions_, orientations_);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.web_load = function(url, callback) {
  var req = $._XMLHttpRequestFactoryProvider_XMLHttpRequest();
  req.open$2('GET', url);
  req.setRequestHeader$2('Content-type', 'text/plain');
  $.add$1(req.get$on().get$readyStateChange(), new $.web_load_anon(callback, req));
  req.send$0();
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
  return a.operator$ge$1(b);
};

$.Vec2$ = function(x, y) {
  var t1 = new $.Vec2(null, null);
  t1.Vec2$2(x, y);
  return t1;
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
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
    if ((typeof(name$)) === 'string' && ($.isEmpty(name$) !== true && (!(name$ === 'Object') && !(name$ === 'Function.prototype')))) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLDDElement')) return 'HTMLElement';
  if ($.eqB(name$, 'HTMLDTElement')) return 'HTMLElement';
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.notify = function(text) {
  $.forEach($.notifications, new $.notify_anon());
  $.add$1($.notifications, $.Notification$(text));
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.removeRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.removeRange$2(start, length$);
  $.checkGrowable(receiver, 'removeRange');
  if ($.eqB(length$, 0)) return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var receiverLength = (receiver.length);
  if (start < 0 || start >= receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if (t1 > receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  var t2 = receiverLength - length$;
  $.Arrays_copy(receiver, t1, receiver, start, t2 - start);
  $.set$length(receiver, t2);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.Color$ = function(r, g, b) {
  var t1 = new $.Color(null, null, null);
  t1.Color$3(r, g, b);
  return t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver') return 'MutationObserver';
  return name$;
};

$.Math_sqrt = function(x) {
  return $.MathNatives_sqrt(x);
};

$.MathNatives_sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
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

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$.Strings_String$fromCharCodes = function(charCodes) {
  return $.StringBase_createFromCharCodes(charCodes);
};

$._createMeasurementFuture = function(computeValue, completer) {
  if ($._pendingRequests == null) {
    $._pendingRequests = [];
    $._maybeScheduleMeasurementFrame();
  }
  $.add$1($._pendingRequests, $._MeasurementRequest$(computeValue, completer));
  return completer.get$future();
};

$._DOMWindowCrossFrameImpl__postMessage2 = function(win, message, targetOrigin) {
      win.postMessage(message, targetOrigin);
;
};

$._maybeScheduleMeasurementFrame = function() {
  if ($._nextMeasurementFrameScheduled === true) return;
  $._nextMeasurementFrameScheduled = true;
  if ($._firstMeasurementRequest === true) {
    $.add$1($.window().get$on().get$message(), new $._maybeScheduleMeasurementFrame_anon());
    $._firstMeasurementRequest = false;
  }
  $.window().postMessage$2('DART-MEASURE', '*');
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.Notification$ = function(text) {
  return new $.Notification(0, 32, 300, text);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$.Math_parseInt = function(str) {
  return $.MathNatives_parseInt(str);
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.MathNatives_parseInt = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) throw $.captureStackTrace($.BadNumberFormatException$(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2)) {
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  } else t1 = false;
  if (!t1) {
    if ($.gtB($.get$length(trimmed), 3)) {
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    } else t1 = false;
  } else t1 = true;
  var base = t1 ? 16 : 10;
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) throw $.captureStackTrace($.BadNumberFormatException$(str));
  return ret;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null) {
    if ($._Device_isFirefox() === true) $._cachedBrowserPrefix = '-moz-';
    else $._cachedBrowserPrefix = '-webkit-';
  }
  return $._cachedBrowserPrefix;
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$.neg = function(a) {
  if (typeof a === "number") return -a;
  return a.operator$negate$0();
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.JsonStringifier__numberToString = function(x) {
  if (typeof x === 'number' && x === (x | 0)) return $.toString(x);
  if (typeof x === 'number') return $.toString(x);
  return $.toString($.toDouble(x));
};

$.OverlayManager$ = function() {
  return new $.OverlayManager($.CTC7, $.CTC8, 21, 7);
};

$.UIManager$ = function() {
  {};
  var t1 = new $.UIManager($.CTC30, null, null, null, false, null);
  t1.UIManager$0();
  return t1;
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.renderNotifications = function(c) {
  var i = $.sub($.get$length($.notifications), 1);
  if (typeof i !== 'number') return $.renderNotifications$bailout(1, c, i);
  for (; i >= 0; --i) {
    $.index($.notifications, i).render$1(c) === true && $.removeRange($.notifications, i, 1);
  }
};

$.Avatar$ = function(properties) {
  var t1 = new $.Avatar(null, null, 32, '', 0, false, 1, true, 100, 0, 0, 12, 0, 1, 25, null, false, null, 0, 2, 1, false, '', '', null, null, null, null);
  t1.Vec2$2(0, 0);
  t1.GameObject$3(properties, 0, 0);
  t1.Avatar$1(properties);
  return t1;
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a | b) >>> 0;
  return a.operator$or$1(b);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  return name$;
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._JsonParser$_internal = function(json) {
  var t1 = new $._JsonParser(0, $.get$length(json), json);
  t1._JsonParser$_internal$1(json);
  return t1;
};

$.MainMenu$ = function() {
  var t1 = new $.MainMenu(false, null, 0, 0, true, null, null, null, null, null, null);
  t1.MainMenu$0();
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
  if (result === null) return;
  return result;
};

$.MenuInterface$ = function(type, data) {
  var t1 = new $.MenuInterface(null, null, null, data, type);
  t1.MenuInterface$2(type, data);
  return t1;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') return !($.indexOf$2(receiver, other, startIndex) === -1);
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.Game$ = function() {
  var t1 = new $.Game(null, null);
  t1.Game$0();
  return t1;
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.abs$0();
  return Math.abs(receiver);
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.res_loadSplitImage = function(name$, callback, px, py) {
  var name0 = 'resources/' + $.S(name$);
  var img = $._ElementFactoryProvider_Element$tag('img');
  $.add$1(img.get$on().get$load(), new $.res_loadSplitImage_anon(img, callback, py, px));
  img.set$src(name0);
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b) === true;
};

$.Camera$ = function(x, y, zoom) {
  var t1 = new $.Camera(null, null, 10.0, null, null);
  t1.Vec2$2(0.0, 0.0);
  t1.Camera$3(x, y, zoom);
  return t1;
};

$._DOMWindowCrossFrameImpl$ = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) return 0;
    if (result > 0) return result;
    b = (b);
    if (b < 0) return result - b;
    return result + b;
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$.splitChars = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.splitChars$0();
  return receiver.split("");
};

$.BadNumberFormatException$ = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$.JSON_stringify = function(object) {
  return $.JsonStringifier_stringify(object);
};

$.JsonStringifier_stringify = function(object) {
  var output = $.StringBufferImpl$('');
  $.JsonStringifier$_internal(output)._stringify$1(object);
  return output.toString$0();
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$._MeasurementRequest$ = function(computeValue, completer) {
  return new $._MeasurementRequest(false, null, completer, computeValue);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$._SimpleClientRect$ = function(left, top$, width, height) {
  return new $._SimpleClientRect(height, width, top$, left);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.rpat = function(n) {
  var t1 = $.rpatCount;
  $.rpatCount = $.add(t1, 1);
  return $.eq($.mod(t1, n), 0);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.concat = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.concat$1(other);
  if (!(typeof other === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(other));
  return receiver + other;
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$._ElementFactoryProvider_Element$tag = function(tag) {
  return document.createElement(tag);
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.TileManager$ = function(location$) {
  var t1 = new $.TileManager(location$, null, null);
  t1.TileManager$1(location$);
  return t1;
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.CANVAS_OFFSETX = $.sub($.div($.window().get$innerWidth(), 2), 400.0);
  $.CANVAS_OFFSETY = $.sub($.div($.window().get$innerHeight(), 2), 225.0);
  if ($.ltB($.CANVAS_OFFSETY, 0)) $.CANVAS_OFFSETY = 0;
  $.document().query$1('#canvas').get$style().set$position('absolute');
  var t1 = $.S($.CANVAS_OFFSETX) + 'px';
  $.document().query$1('#canvas').get$style().set$left(t1);
  t1 = $.S($.CANVAS_OFFSETY) + 'px';
  $.document().query$1('#canvas').get$style().set$top(t1);
  $.add$1($.window().get$on().get$load(), new $.main_anon());
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.Item$ = function(properties) {
  var t1 = new $.Item(null, false, '', '', null, null, null, null);
  t1.Vec2$2(0, 0);
  t1.GameObject$3(properties, 0, 0);
  return t1;
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.AudioManager$ = function() {
  var t1 = new $.AudioManager(null, null);
  t1.AudioManager$0();
  return t1;
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') return isNaN(receiver);
  return receiver.isNaN$0();
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.isInfinite$0();
  return (receiver == Infinity) || (receiver == -Infinity);
};

$.startGame = function() {
  $.menu = null;
  $.game = $.Game$();
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.round$0();
  if (receiver < 0) return -Math.round(-receiver);
  return Math.round(receiver);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.Animation$ = function(properties) {
  var t1 = new $.Animation(null, null, null);
  t1.Animation$1(properties);
  return t1;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a <= b;
  return a.operator$le$1(b);
};

$.openMainMenu = function() {
  $.menu = $.MainMenu$();
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || (src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || ((dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof count !== 'number') return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart == null) srcStart = 0;
  if (typeof srcStart !== 'number') return $.Arrays_copy$bailout(2, src, dst, dstStart, count, srcStart);
  if (dstStart == null) dstStart = 0;
  if (typeof dstStart !== 'number') return $.Arrays_copy$bailout(3, src, dst, count, srcStart, dstStart);
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
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$._XMLHttpRequestFactoryProvider_XMLHttpRequest = function() {
  return new XMLHttpRequest();;
};

$._DOMWindowCrossFrameImpl__top = function(win) {
  return win.top;;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.addTag = function(object, tag) {
  if ($.index($.tags, tag) == null) {
    var t1 = $.tags;
    var t2 = $.ListFactory_List$from([object]);
    $.setRuntimeTypeInfo(t2, ({E: 'GameObject'}));
    $.indexSet(t1, tag, t2);
    t1 = t2;
  } else t1 = $.add$1($.index($.tags, tag), object);
  return t1;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.toRadixString = function(receiver, radix) {
  if (!(typeof receiver === 'number')) return receiver.toRadixString$1(radix);
  $.checkNum(radix);
  return receiver.toString(radix);
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$.JSON_parse = function(json) {
  return $._JsonParser_parse(json);
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$._JsonParser_parse = function(json) {
  return $._JsonParser$_internal(json)._parseToplevel$0();
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.HiddenCanvas_split = function(img, px, py, callback) {
  var t1 = ({});
  if (typeof px !== 'number') return $.HiddenCanvas_split$bailout(1, img, px, py, callback, t1);
  if (typeof py !== 'number') return $.HiddenCanvas_split$bailout(1, img, px, py, callback, t1);
  var hc = $.HiddenCanvas$(px, py);
  var c = hc.context;
  t1.amt_1 = 0;
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, ({E: 'ImageElement'}));
  for (; $.ltB(list.length, $.mul($.div(img.get$width(), px), $.div(img.get$height(), py))); ) {
    list.push(null);
  }
  t1 = new $.HiddenCanvas_split_addToList(list, t1, callback, hc);
  for (var n = 0, y = 0; $.gtB(y, $.neg(img.get$height())); y -= py) {
    for (var x = 0; $.gtB(x, $.neg(img.get$width())); x -= px) {
      c.clearRect$4(0, 0, px, py);
      c.drawImage$3(img, x, y);
      var n0 = n + 1;
      t1.$call$1(n);
      n = n0;
    }
  }
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.Math_pow = function(x, exponent) {
  return $.MathNatives_pow(x, exponent);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.MathNatives_pow = function(value, exponent) {
  $.checkNum(value);
  $.checkNum(exponent);
  return Math.pow(value, exponent);
};

$.jsPropertyAccess = function(jsObject, property) {
  return jsObject[property];
};

$.JsonStringifier$_internal = function(_sb) {
  return new $.JsonStringifier([], _sb);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$.toUpperCase = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.toUpperCase$0();
  return receiver.toUpperCase();
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$._DeprecatedPeerConnectionEventsImpl$ = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$._dynamicMetadata0 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$.res_loadFile = function(name$, callback) {
  var name0 = 'resources/' + $.S(name$);
  if (callback == null) callback = new $.res_loadFile_anon();
  $.web_load(name0, callback);
};

$.Math_random = function() {
  return $.MathNatives_random();
};

$.MathNatives_random = function() {
  return Math.random();
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.GameObject$ = function(a, xx, yy) {
  var t1 = new $.GameObject(false, '', '', null, null, null, null);
  t1.Vec2$2(xx, yy);
  t1.GameObject$3(a, xx, yy);
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.Color$fromString = function(s) {
  var t1 = new $.Color(null, null, null);
  t1.Color$fromString$1(s);
  return t1;
};

$.res_loadImage = function(name$, callback) {
  var t1 = ({});
  t1.callback_1 = callback;
  var name0 = 'resources/' + $.S(name$);
  var img = $._ElementFactoryProvider_Element$tag('img');
  $.add$1(img.get$on().get$load(), new $.res_loadImage_anon(img, t1));
  $.add$1(img.get$on().get$error(), new $.res_loadImage_anon0(t1));
  callback = t1.callback_1;
  t1.callback_1 = callback == null ? new $.res_loadImage_anon1() : callback;
  img.set$src(name0);
  return img;
};

$._globalState = function() {
  return $globalState;;
};

$._globalState0 = function(val) {
  $globalState = val;;
};

$._DOMWindowCrossFrameImpl__postMessage3 = function(win, message, targetOrigin, messagePorts) {
      win.postMessage(message, targetOrigin, messagePorts);
;
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.Path$ = function(s, e, points, houseStart, houseEnd) {
  var t1 = new $.Path(points, null, null);
  t1.Path$5(s, e, points, houseStart, houseEnd);
  return t1;
};

$.rmTag = function(object, tag) {
  var index = $.indexOf$1($.index($.tags, tag), object);
  !$.eqB(index, -1) && $.removeRange($.index($.tags, tag), index, 1);
};

$.JsonStringifier__escape = function(sb, s) {
  var length$ = $.get$length(s);
  var charCodes = $.ListFactory_List(null);
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
          charCodes.push($.JsonStringifier__hexDigit($.and($.shr(charCode, 12), 15)));
          charCodes.push($.JsonStringifier__hexDigit($.and($.shr(charCode, 8), 15)));
          charCodes.push($.JsonStringifier__hexDigit($.and($.shr(charCode, 4), 15)));
          charCodes.push($.JsonStringifier__hexDigit($.and(charCode, 15)));
          break;
      }
      needsEscape = true;
    } else {
      if ($.eqB(charCode, 34) || $.eqB(charCode, 92)) {
        charCodes.push(92);
        charCodes.push(charCode);
        needsEscape = true;
      } else charCodes.push(charCode);
    }
  }
  $.add$1(sb, needsEscape ? $.Strings_String$fromCharCodes(charCodes) : s);
};

$._Elements_ImageElement = function(src, width, height) {
  var _e = $._document().$dom_createElement$1('img');
  !(src == null) && _e.set$src(src);
  !(width == null) && _e.set$width(width);
  !(height == null) && _e.set$height(height);
  return _e;
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._ElementRectImpl$ = function(element) {
  var t1 = $._SimpleClientRect$(element.get$$$dom_clientLeft(), element.get$$$dom_clientTop(), element.get$$$dom_clientWidth(), element.get$$$dom_clientHeight());
  var t2 = $._SimpleClientRect$(element.get$$$dom_offsetLeft(), element.get$$$dom_offsetTop(), element.get$$$dom_offsetWidth(), element.get$$$dom_offsetHeight());
  var t3 = $._SimpleClientRect$(element.get$$$dom_scrollLeft(), element.get$$$dom_scrollTop(), element.get$$$dom_scrollWidth(), element.get$$$dom_scrollHeight());
  var t4 = element.$dom_getBoundingClientRect$0();
  return new $._ElementRectImpl(element.$dom_getClientRects$0(), t4, t3, t2, t1);
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toInt$0();
  if ($.isNaN(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$('NaN'));
  if ($.isInfinite(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$('Infinity'));
  var truncated = $.truncate(receiver);
  return (truncated == -0.0) ? 0 : truncated;
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC45)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.print = function(obj) {
  return $.Primitives_printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.Primitives_stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!((typeof t2 === 'number') && (t2 === (t2 | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(t2));
  }
  return String.fromCharCode.apply(null, charCodes);
};

$.HiddenCanvas$ = function(width, height) {
  var t1 = new $.HiddenCanvas(null, null);
  t1.HiddenCanvas$2(width, height);
  return t1;
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$.JsonStringifier__hexDigit = function(x) {
  if ($.ltB(x, 10)) {
    if (typeof x !== 'number') throw $.iae(x);
    var t1 = 48 + x;
  } else {
    if (typeof x !== 'number') throw $.iae(x);
    t1 = 87 + x;
  }
  return t1;
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + (receiver.charCodeAt(i));
    var hash1 = 536870911 & hash0 + (524287 & hash0 << 10);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + (16383 & hash0 << 15);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.SpawnPoint$ = function(a) {
  var t1 = new $.SpawnPoint(null, null, false, 0, 0, 5, -1, false, '', '', null, null, null, null);
  t1.Vec2$2(0, 0);
  t1.GameObject$3(a, 0, 0);
  return t1;
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.StringBase_createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object' && charCodes !== null) && (((charCodes.constructor === Array) || charCodes.is$List())))) throw $.captureStackTrace($.IllegalArgumentException$(charCodes));
    var charCodes0 = $.ListFactory_List$from(charCodes);
    charCodes = charCodes0;
  }
  return $.Primitives_stringFromCharCodes(charCodes);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.trim$0();
  return receiver.trim();
};

$.FloatingText$ = function(properties) {
  var t1 = new $.FloatingText(0, false, '', '', null, null, null, null);
  t1.Vec2$2(0, 0);
  t1.GameObject$3(properties, 0, 0);
  return t1;
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method == null && !($._dynamicMetadata0() == null)) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._document = function() {
  return document;;
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC44) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  if ($.contains$1(userAgent, 'Opera') === true) return $.typeNameInOpera;
  return $.constructorNameFallback;
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.World$ = function() {
  var t1 = new $.World(0, null, null, $.CTC3, $.CTC4, $.CTC5, $.CTC6, 0, 0, true, 100, null, 0, null, null, null, null, null, null, null, null, 0, null, 0, 0, 0, 50, 1, 0, 0, 200, false, 14400, 7, null, null, 25, 1, 0.6, 256, 256, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  t1.World$0();
  return t1;
};

$.Math_parseDouble = function(str) {
  return $.MathNatives_parseDouble(str);
};

$.toDouble = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toDouble$0();
  return receiver;
};

$.MathNatives_parseDouble = function(str) {
  $.checkString(str);
  var ret = (parseFloat(str));
  if (ret === 0) {
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  } else t1 = false;
  if (t1) ret = (parseInt(str));
  if ($.isNaN(ret) === true && (!$.eqB(str, 'NaN') && !$.eqB(str, '-NaN'))) throw $.captureStackTrace($.BadNumberFormatException$(str));
  return ret;
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$._DOMWindowCrossFrameImpl__createSafe = function(w) {
  var t1 = $.window();
  if (w == null ? t1 == null : w === t1) return w;
  return $._DOMWindowCrossFrameImpl$(w);
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC0;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.PathNode$fromVec2 = function(v, path, house, start) {
  var t1 = v.get$x();
  var t2 = v.get$y();
  var t3 = new $.PathNode(start, house, path, null, null);
  t3.Vec2$2(t1, t2);
  return t3;
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver) === true) return $.Arrays_indexOf(receiver, element, 0, (receiver.length));
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    return receiver.indexOf(element);
  }
  return receiver.indexOf$1(element);
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
  return a === b;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a / b;
  return a.operator$div$1(b);
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.MenuButton$ = function(text, action, x, y) {
  var t1 = new $.MenuButton(48.0, 192.0, action, text, null, null);
  t1.Vec2$2(x, y);
  return t1;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.some = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.some$1(f);
  return $.Collections_some(receiver, f);
};

$.Collections_some = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) return true;
  }
  return false;
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.Arrow$ = function(properties) {
  var t1 = new $.Arrow(0, false, '', '', null, null, null, null);
  t1.Vec2$2(0, 0);
  t1.GameObject$3(properties, 0, 0);
  return t1;
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$._Collections_some = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) return true;
  }
  return false;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.document = function() {
  return document;;
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || ($.eqB(type, 'called_non_callable') || ($.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')))) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || ($.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)) return $.NullPointerException$(null, $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.Arrays_copy$bailout = function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var src = env0;
      var srcStart = env1;
      var dst = env2;
      var dstStart = env3;
      var count = env4;
      break;
    case 2:
      src = env0;
      dst = env1;
      dstStart = env2;
      count = env3;
      srcStart = env4;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      srcStart = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (srcStart == null) srcStart = 0;
    case 2:
      state = 0;
      if (dstStart == null) dstStart = 0;
    case 3:
      state = 0;
      if ($.ltB(srcStart, dstStart)) {
        for (var i = $.sub($.add(srcStart, count), 1), j = $.sub($.add(dstStart, count), 1); $.geB(i, srcStart); i = $.sub(i, 1), j = $.sub(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      } else {
        for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.add(i, 1), j = $.add(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      }
  }
};

$.renderNotifications$bailout = function(state, c, i) {
  for (; $.geB(i, 0); i = $.sub(i, 1)) {
    $.index($.notifications, i).render$1(c) === true && $.removeRange($.notifications, i, 1);
  }
};

$.HiddenCanvas_split$bailout = function(state, img, px, py, callback, t1) {
  var hc = $.HiddenCanvas$(px, py);
  var c = hc.context;
  t1.amt_1 = 0;
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, ({E: 'ImageElement'}));
  for (; $.ltB(list.length, $.mul($.div(img.get$width(), px), $.div(img.get$height(), py))); ) {
    list.push(null);
  }
  t1 = new $.HiddenCanvas_split_addToList(list, t1, callback, hc);
  var n = 0;
  var y = 0;
  while ($.gtB(y, $.neg(img.get$height()))) {
    var x = 0;
    while ($.gtB(x, $.neg(img.get$width()))) {
      c.clearRect$4(0, 0, px, py);
      c.drawImage$3(img, x, y);
      var n0 = n + 1;
      t1.$call$1(n);
      n = n0;
      if (typeof px !== 'number') throw $.iae(px);
      x -= px;
    }
    if (typeof py !== 'number') throw $.iae(py);
    y -= py;
  }
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
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
            var set = $.HashSetImplementation$();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.$call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC11 = Isolate.makeConstantList([0, 0, 0, 1]);
$.CTC12 = Isolate.makeConstantList([0, 0, 1, 0]);
$.CTC3 = Isolate.makeConstantList([2, 2, 3, -2, -2]);
$.CTC14 = Isolate.makeConstantList([0, 1, 0, 0]);
$.CTC34 = Isolate.makeConstantList([6, 12, 8]);
$.CTC10 = Isolate.makeConstantList([0, 0, 0, 0]);
$.CTC17 = Isolate.makeConstantList([0, 1, 1, 1]);
$.CTC43 = Isolate.makeConstantList(['Ahhhh!', 'Look out!', 'Run!', 'AHHHH!', 'Woah!']);
$.CTC31 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC15 = Isolate.makeConstantList([0, 1, 0, 1]);
$.CTC18 = Isolate.makeConstantList([1, 0, 0, 0]);
$.CTC37 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC32 = Isolate.makeConstantList(['Help!', 'Where is everyone?', 'Where do I go?', 'Please help me!', 'Where am I?']);
$.CTC26 = Isolate.makeConstantList(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']);
$.CTC13 = Isolate.makeConstantList([0, 0, 1, 1]);
$.CTC16 = Isolate.makeConstantList([0, 1, 1, 0]);
$.CTC19 = Isolate.makeConstantList([1, 0, 0, 1]);
$.CTC20 = Isolate.makeConstantList([1, 0, 1, 0]);
$.CTC21 = Isolate.makeConstantList([1, 0, 1, 1]);
$.CTC22 = Isolate.makeConstantList([1, 1, 0, 0]);
$.CTC23 = Isolate.makeConstantList([1, 1, 0, 1]);
$.CTC24 = Isolate.makeConstantList([1, 1, 1, 0]);
$.CTC25 = Isolate.makeConstantList([1, 1, 1, 1]);
$.CTC27 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC26, {'0': Isolate.$isolateProperties.CTC10, '1': Isolate.$isolateProperties.CTC11, '2': Isolate.$isolateProperties.CTC12, '3': Isolate.$isolateProperties.CTC13, '4': Isolate.$isolateProperties.CTC14, '5': Isolate.$isolateProperties.CTC15, '6': Isolate.$isolateProperties.CTC16, '7': Isolate.$isolateProperties.CTC17, '8': Isolate.$isolateProperties.CTC18, '9': Isolate.$isolateProperties.CTC19, 'a': Isolate.$isolateProperties.CTC20, 'b': Isolate.$isolateProperties.CTC21, 'c': Isolate.$isolateProperties.CTC22, 'd': Isolate.$isolateProperties.CTC23, 'e': Isolate.$isolateProperties.CTC24, 'f': Isolate.$isolateProperties.CTC25}, 16);
$.CTC35 = Isolate.makeConstantList(['wander', 'nice', 'hostile', 'hostile-wander', 'mean', 'scared', 'citizen']);
$.CTC33 = Isolate.makeConstantList([2, 4, 5]);
$.CTC2 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC29 = Isolate.makeConstantList(['backspace', 'enter', 'shift', 'ctrl', 'alt', 'capslock', 'esc', 'space', '_0', 'zero', '_1', 'one', '_2', 'two', '_3', 'three', '_4', 'four', '_5', 'five', '_6', 'six', '_7', 'seven', '_8', 'eight', '_9', 'nine', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'semicolon', 'equal', 'comma', 'hyphen', 'dash', 'minus', 'period', 'dot', 'slash', 'forwardslash', 'grave', 'backtick', 'bracketleft', 'backslash', 'bracketright', 'singlequote', 'exclamation', 'at', 'ampersat', 'pound', 'dollar', 'mod', 'modulo', 'percent', 'caret', 'ampersand', 'asterisk', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'colon', 'plus', 'pointbracketleft', 'trianglebracketleft', 'underscore', 'pointbracketright', 'trianglebracketright', 'question', 'questionmark', 'approx', 'tilde', 'curleybraceleft', 'pipe', 'curleybraceright', 'doublequote', 'left', 'up', 'right', 'down', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']);
$.CTC44 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC40 = Isolate.makeConstantList(['Why don\'t you just go?', 'Get outta here!', 'Get out!', 'Why won\'t you help us?', 'It\'s outsiders like you that caused this!']);
$.CTC7 = Isolate.makeConstantList(['#ebddcb', '#d3b7b2', '#bb98ad', '#806593']);
$.CTC5 = Isolate.makeConstantList([2400, 4581, 4329, 2324, 8221]);
$.CTC6 = Isolate.makeConstantList(['This is Big Island', 'At day, all is peaceful', 'But come night, horrific monsters of the black appear', 'The ever-curious villagers often stray into the darkness', 'Do you have what it takes to defend them?']);
$.CTC42 = Isolate.makeConstantList(['Can you take me somewhere safe?', 'Please help me!', 'Please take me home!']);
$.CTC45 = new Isolate.$isolateProperties.Object();
$.CTC8 = Isolate.makeConstantList(['#3e3e56', '#818fb6', '#b2cdec', '#cbe3f6']);
$.CTC39 = new Isolate.$isolateProperties.JsonUnsupportedObjectType();
$.CTC30 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC29, {'backspace': 8, 'enter': 13, 'shift': 16, 'ctrl': 17, 'alt': 18, 'capslock': 20, 'esc': 27, 'space': 32, '_0': 48, 'zero': 48, '_1': 49, 'one': 49, '_2': 50, 'two': 50, '_3': 51, 'three': 51, '_4': 52, 'four': 52, '_5': 53, 'five': 53, '_6': 54, 'six': 54, '_7': 55, 'seven': 55, '_8': 56, 'eight': 56, '_9': 57, 'nine': 57, 'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84, 'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90, 'semicolon': 186, 'equal': 187, 'comma': 188, 'hyphen': 189, 'dash': 189, 'minus': 189, 'period': 190, 'dot': 190, 'slash': 191, 'forwardslash': 191, 'grave': 192, 'backtick': 192, 'bracketleft': 219, 'backslash': 220, 'bracketright': 221, 'singlequote': 222, 'exclamation': 49, 'at': 50, 'ampersat': 50, 'pound': 51, 'dollar': 52, 'mod': 53, 'modulo': 53, 'percent': 53, 'caret': 54, 'ampersand': 55, 'asterisk': 56, 'A': 65, 'B': 66, 'C': 67, 'D': 68, 'E': 69, 'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74, 'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79, 'P': 80, 'Q': 81, 'R': 82, 'S': 83, 'T': 84, 'U': 85, 'V': 86, 'W': 87, 'X': 88, 'Y': 89, 'Z': 90, 'colon': 186, 'plus': 187, 'pointbracketleft': 188, 'trianglebracketleft': 188, 'underscore': 189, 'pointbracketright': 190, 'trianglebracketright': 190, 'question': 191, 'questionmark': 191, 'approx': 192, 'tilde': 192, 'curleybraceleft': 219, 'pipe': 220, 'curleybraceright': 221, 'doublequote': 222, 'left': 37, 'up': 38, 'right': 39, 'down': 40, 'F1': 112, 'F2': 113, 'F3': 114, 'F4': 115, 'F5': 116, 'F6': 117, 'F7': 118, 'F8': 119, 'F9': 120, 'F10': 121, 'F11': 122, 'F12': 123}, 138);
$.CTC28 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC4 = Isolate.makeConstantList([1000, 5251, 6819, 8114, 6860]);
$.CTC36 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC35, {'wander': true, 'nice': true, 'hostile': true, 'hostile-wander': true, 'mean': true, 'scared': true, 'citizen': true}, 7);
$.CTC41 = Isolate.makeConstantList(['Hi!', 'Hiya!', 'Hello!', 'It\'s not so scary with you around!', 'Thanks for the help!']);
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC38 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC, Isolate.$isolateProperties.CTC37, Isolate.$isolateProperties.CTC37, Isolate.$isolateProperties.CTC37, Isolate.$isolateProperties.CTC37);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC9 = new Isolate.$isolateProperties.EmptyQueueException();
$._pendingRequests = null;
$.audio = null;
$.tags = null;
$.tagEvents = null;
$.rpatCount = 0;
$.SCREEN_WIDTH = null;
$.animationMap = null;
$._getTypeNameOf = null;
$._cachedBrowserPrefix = null;
$._firstMeasurementRequest = true;
$.CANVAS_OFFSETY = null;
$.classMap = null;
$.removalOnDeath = Isolate.$isolateProperties.CTC36;
$.RENDER_DISTANCE = null;
$.niceFactor = null;
$.RESOLUTION = 1;
$.SCREEN_HEIGHT = null;
$._JsonParser_tokens = null;
$.CANVAS_OFFSETX = null;
$.world = null;
$.DEBUG = false;
$.event = null;
$.menu = null;
$.dynamicUnknownElementDispatcher = null;
$.game = null;
$.BLANK_IMAGE = null;
$._nextMeasurementFrameScheduled = false;
$._pendingMeasurementFrameCallbacks = null;
$.tagMap = null;
$.notifications = null;
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
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$(this);
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

$.$defineNativeClass('WebKitAnimation', ["paused?"], {
 play$0: function() {
  return this.play();
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
  return $._AudioContextEventsImpl$(this);
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
  return $._BatteryManagerEventsImpl$(this);
 }
});

$.$defineNativeClass('BiquadFilterNode', ["type="], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLBodyElement', ["background!"], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type="], {
});

$.$defineNativeClass('CSSFontFaceRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframeRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', ["b?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSPageRule', ["style?"], {
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
 set$top: function(value) {
  this.setProperty$3('top', value, '');
 },
 get$top: function() {
  return this.getPropertyValue$1('top');
 },
 set$textAlign: function(value) {
  this.setProperty$3('text-align', value, '');
 },
 set$src: function(value) {
  this.setProperty$3('src', value, '');
 },
 set$position: function(value) {
  this.setProperty$3('position', value, '');
 },
 set$left: function(value) {
  this.setProperty$3('left', value, '');
 },
 get$left: function() {
  return this.getPropertyValue$1('left');
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
 set$cursor: function(value) {
  this.setProperty$3('cursor', value, '');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 set$background: function(value) {
  this.setProperty$3('background', value, '');
 },
 set$animation: function(value) {
  this.setProperty$3($.S($._browserPrefix()) + 'animation', value, '');
 },
 get$animation: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'animation');
 },
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

$.$defineNativeClass('CSSStyleRule', ["style?"], {
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

$.$defineNativeClass('CanvasRenderingContext', ["canvas?"], {
});

$.$defineNativeClass('CanvasRenderingContext2D', ["textAlign!", "strokeStyle!", "lineWidth!", "lineCap!", "globalAlpha=", "font!", "fillStyle!"], {
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
 rect$4: function(x, y, width, height) {
  return this.rect(x,y,width,height);
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
 fill$0: function() {
  return this.fill();
 },
 drawImage$9: function(canvas_OR_image_OR_video, sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh, dx, dy, dw, dh) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh);
 },
 drawImage$3: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y);
},
 createPattern$2: function(canvas_OR_image, repetitionType) {
  return this.createPattern(canvas_OR_image,repetitionType);
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

$.$defineNativeClass('ClientRect', ["width?", "top?", "left?", "height?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.time$1 = function(title) {
  return this.time(title);
 };
_ConsoleImpl.get$time = function() { return new $.BoundClosure0(this, 'time$1'); };
_ConsoleImpl.error$1 = function(arg) {
  return this.error(arg);
 };
_ConsoleImpl.get$error = function() { return new $.BoundClosure0(this, 'error$1'); };
$.$defineNativeClass('ConvolverNode', [], {
 normalize$0: function() { return this.normalize.$call$0(); }
});

$.$defineNativeClass('Coordinates', ["speed?"], {
});

$.$defineNativeClass('DOMApplicationCache', ["status?"], {
 update$0: function() {
  return this.update();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMException', ["message?"], {
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
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List: function() { return true; },
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
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', ["readyState?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 open$2: function(arg0, arg1) { return this.open.$call$2(arg0, arg1); },
 open$3: function(arg0, arg1, arg2) { return this.open.$call$3(arg0, arg1, arg2); }
});

$.$defineNativeClass('HTMLDocument', ["webkitIsFullScreen?", "readyState?", "body?"], {
 query$1: function(selectors) {
  if ($.CTC2.hasMatch$1(selectors) === true) return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
 },
 webkitCancelFullScreen$0: function() {
  return this.webkitCancelFullScreen();
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
  return $._DocumentEventsImpl$(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$(this);
 },
 webkitRequestFullscreen$0: function() {
 },
 get$style: function() {
  return $._ElementFactoryProvider_Element$tag('div').get$style();
 },
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
 },
 get$translate: function() {
  return false;
 },
 translate$2: function(arg0, arg1) { return this.get$translate().$call$2(arg0, arg1); },
 get$rect: function() {
  var t1 = new $._DocumentFragmentImpl_rect_anon();
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t1, t2);
 },
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().$call$4(arg0, arg1, arg2, arg3); },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 }
});

$.$defineNativeClass('Element', ["style?", "id?"], {
 webkitRequestFullscreen$0: function() {
  return this.webkitRequestFullscreen();
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getClientRects$0: function() {
  return this.getClientRects();
 },
 $dom_getBoundingClientRect$0: function() {
  return this.getBoundingClientRect();
 },
 get$$$dom_scrollWidth: function() {
  return this.scrollWidth;;
 },
 get$$$dom_scrollTop: function() {
  return this.scrollTop;;
 },
 get$$$dom_scrollLeft: function() {
  return this.scrollLeft;;
 },
 get$$$dom_scrollHeight: function() {
  return this.scrollHeight;;
 },
 get$$$dom_offsetWidth: function() {
  return this.offsetWidth;;
 },
 get$$$dom_offsetTop: function() {
  return this.offsetTop;;
 },
 get$$$dom_offsetLeft: function() {
  return this.offsetLeft;;
 },
 get$$$dom_offsetHeight: function() {
  return this.offsetHeight;;
 },
 get$$$dom_clientWidth: function() {
  return this.clientWidth;;
 },
 get$$$dom_clientTop: function() {
  return this.clientTop;;
 },
 get$$$dom_clientLeft: function() {
  return this.clientLeft;;
 },
 get$$$dom_clientHeight: function() {
  return this.clientHeight;;
 },
 translate$2: function(arg0, arg1) { return this.translate.$call$2(arg0, arg1); },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 get$rect: function() {
  var t1 = new $._ElementImpl_rect_anon(this);
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t1, t2);
 },
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().$call$4(arg0, arg1, arg2, arg3); },
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

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('Event', ["type?"], {
 preventDefault$0: function() {
  return this.preventDefault();
 }
});

$.$defineNativeClass('EventException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', ["readyState?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
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
    return $._EventsImpl$(this);
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

$.$defineNativeClass('FileException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', ["readyState?", "error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriter', ["readyState?", "length?", "error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 length$0: function() { return this.length.$call$0(); },
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('Float32Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
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
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
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
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function() {
  return this.reset();
 },
 length$0: function() { return this.length.$call$0(); },
 action$0: function() { return this.action.$call$0(); }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "src!", "height?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
 tags$1: function(name) {
  return this.tags(name);
 },
 get$tags: function() { return new $.BoundClosure0(this, 'tags$1'); },
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List: function() { return true; },
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
 is$List: function() { return true; },
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
  return $._IDBDatabaseEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', ["message?"], {
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
    return $._IDBRequestEventsImpl$(this);
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
  return $._IDBTransactionEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["width=", "src!", "height="], {
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width=", "src!", "height="], {
 complete$1: function(arg0) { return this.complete.$call$1(arg0); }
});

$.$defineNativeClass('HTMLInputElement', ["width=", "value=", "type=", "src!", "pattern?", "height="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
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
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
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
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
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
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
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
 get$start: function() { return new $.BoundClosure(this, 'start$0'); }
});

$.$defineNativeClass('MediaController', ["paused?"], {
 play$0: function() {
  return this.play();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', ["src!", "readyState?", "paused?", "error?"], {
 play$0: function() {
  return this.play();
 },
 load$0: function() {
  return this.load();
 },
 get$load: function() { return new $.BoundClosure(this, 'load$0'); },
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List: function() { return true; },
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
  return $._MediaStreamEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 add$1: function(track) {
  return this.add(track);
 },
 length$0: function() { return this.length.$call$0(); },
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.BoundClosure(this, 'start$0'); },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
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
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
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
  !(this.get$parent() == null) && this.get$parent().$dom_removeChild$1(this);
  return this;
 }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type=", "start?"], {
});

$.$defineNativeClass('HTMLObjectElement', ["width=", "type=", "height="], {
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
  return $._PeerConnection00EventsImpl$(this);
 }
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["y=", "x="], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('Rect', ["top?", "left?"], {
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
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

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
  return this.id;;
 }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('SVGException', ["message?"], {
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
  return $._SharedWorkerContextEventsImpl$(this);
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
 get$start: function() { return new $.BoundClosure(this, 'start$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
 }
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
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
  return this.$dom_key$1(0) == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 length$0: function() { return this.get$length().$call$0(); },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
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
  return !(this.$dom_getItem$1(key) == null);
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
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List: function() { return true; },
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
  return $._TextTrackEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "position!", "id?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
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
  return $._TextTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 start$1: function(index) {
  return this.start(index);
 },
 get$start: function() { return new $.BoundClosure0(this, 'start$1'); },
 length$0: function() { return this.length.$call$0(); }
});

$.$defineNativeClass('Touch', ["pageY?", "pageX?"], {
});

$.$defineNativeClass('TouchEvent', ["touches?", "changedTouches?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 length$0: function() { return this.length.$call$0(); },
 is$List: function() { return true; },
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
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
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
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
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
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
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
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 noSuchMethod$2: function(name$, args) {
  if ($.dynamicUnknownElementDispatcher == null) throw $.captureStackTrace($.NoSuchMethodException$(this, name$, args, null));
  return $.dynamicUnknownElementDispatcher.$call$3(this, name$, args);
 }
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
  return $._WebSocketEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', ["status?", "navigator?", "length?", "innerWidth?", "innerHeight?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
 },
 prompt$2: function(message, defaultValue) {
  return this.prompt(message,defaultValue);
 },
 postMessage$3: function(message, targetOrigin, messagePorts) {
  return this.postMessage(message,targetOrigin,messagePorts);
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage(message,targetOrigin);
},
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 clearInterval$1: function(handle) {
  return this.clearInterval(handle);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 length$0: function() { return this.length.$call$0(); },
 get$on: function() {
  return $._WindowEventsImpl$(this);
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
 },
 open$3: function(url, name$, options) {
  if (options == null) return $._DOMWindowCrossFrameImpl__createSafe(this._open2$2(url, name$));
  return $._DOMWindowCrossFrameImpl__createSafe(this._open3$3(url, name$, options));
 },
 open$2: function(url,name$) {
  return this.open$3(url,name$,null)
},
 _open3$3: function(url, name, options) {
  return this.open(url, name, options);;
 },
 _open2$2: function(url, name) {
  return this.open(url, name);;
 },
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe(this.get$_top());
 },
 get$_top: function() {
  return this.top;;
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
 },
 clearInterval$1: function(handle) {
  return this.clearInterval(handle);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$(this);
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

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
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
  return $._XMLHttpRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
 }
});

$.$defineNativeClass('XPathException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 get$id: function() {
  return this.id;;
 }
});

// 267 dynamic classes.
// 408 classes
// 37 !leaf
(function(){
  var v0/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v1/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v2/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v3/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v2/*class(_SVGComponentTransferFunctionElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v2/*class(_SVGComponentTransferFunctionElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v4/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v5/*class(_UIEventImpl)*/ = [v0/*class(_MouseEventImpl)*/,v0/*class(_MouseEventImpl)*/,'UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent'].join('|');
  var v6/*class(_ElementImpl)*/ = [v3/*class(_SVGElementImpl)*/,v4/*class(_MediaElementImpl)*/,v3/*class(_SVGElementImpl)*/,v4/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v7/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v8/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v9/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v10/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v11/*class(_NodeImpl)*/ = [v6/*class(_ElementImpl)*/,v7/*class(_DocumentFragmentImpl)*/,v8/*class(_DocumentImpl)*/,v9/*class(_CharacterDataImpl)*/,v6/*class(_ElementImpl)*/,v7/*class(_DocumentFragmentImpl)*/,v8/*class(_DocumentImpl)*/,v9/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v12/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v13/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v14/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v1/*class(_SVGTextPositioningElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['MouseEvent', v0/*class(_MouseEventImpl)*/],
    ['UIEvent', v5/*class(_UIEventImpl)*/],
    ['AbstractWorker', v14/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioNode', 'AudioNode|WaveShaperNode|RealtimeAnalyserNode|JavaScriptAudioNode|DynamicsCompressorNode|DelayNode|ConvolverNode|BiquadFilterNode|AudioSourceNode|Oscillator|MediaElementAudioSourceNode|AudioBufferSourceNode|Oscillator|MediaElementAudioSourceNode|AudioBufferSourceNode|AudioPannerNode|AudioGainNode|AudioDestinationNode|AudioChannelSplitter|AudioChannelMerger|WaveShaperNode|RealtimeAnalyserNode|JavaScriptAudioNode|DynamicsCompressorNode|DelayNode|ConvolverNode|BiquadFilterNode|AudioSourceNode|Oscillator|MediaElementAudioSourceNode|AudioBufferSourceNode|Oscillator|MediaElementAudioSourceNode|AudioBufferSourceNode|AudioPannerNode|AudioGainNode|AudioDestinationNode|AudioChannelSplitter|AudioChannelMerger'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['WorkerContext', v10/*class(_WorkerContextImpl)*/],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CanvasRenderingContext', 'CanvasRenderingContext|WebGLRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|CanvasRenderingContext2D'],
    ['CharacterData', v9/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v8/*class(_DocumentImpl)*/],
    ['DocumentFragment', v7/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v2/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGElement', v3/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v4/*class(_MediaElementImpl)*/],
    ['Element', v6/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v5/*class(_UIEventImpl)*/,v5/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v11/*class(_NodeImpl)*/],
    ['MediaStream', v12/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v13/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v10/*class(_WorkerContextImpl)*/,v11/*class(_NodeImpl)*/,v12/*class(_MediaStreamImpl)*/,v13/*class(_IDBRequestImpl)*/,v14/*class(_AbstractWorkerImpl)*/,v10/*class(_WorkerContextImpl)*/,v11/*class(_NodeImpl)*/,v12/*class(_MediaStreamImpl)*/,v13/*class(_IDBRequestImpl)*/,v14/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
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
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
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
    if (supportsProto) {
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
