/**
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("Bridge.EasyTests", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.EasyTests.App", {
        main: function Main () {
            var runner = new Bridge.EasyTests.Runner();
            ko.applyBindings(runner);
            runner.Run();

        }
    });

    /**
     * @memberof System
     * @callback System.Func
     * @return  {boolean}
     */

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @return  {void}
     */

    Bridge.define("Bridge.EasyTests.Asserts.EasyAsserts", {
        statics: {
            methods: {
                /**
                 * Assert that action must throw a specific exception
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @throws 
                 * @param   {Function}         T         
                 * @param   {System.Action}    action
                 * @return  {void}
                 */
                Throws: function (T, action) {
                    try {
                        action();
                        throw new Bridge.EasyTests.Exceptions.ThrowsException(System.String.format("Expected Exception: {0}. No Excpetion Throwed!", [Bridge.Reflection.getTypeName(T)]));
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                        var expected, e;
                        if (Bridge.is($e1, T)) {
                            expected = $e1;
                            // ok
                        } else {
                            e = $e1;
                            throw new Bridge.EasyTests.Exceptions.ThrowsException(System.String.format("Exception of type: {0} instead of Expected Exception: {1}", Bridge.Reflection.getTypeName(Bridge.getType(e)), Bridge.Reflection.getTypeName(T)));
                        }
                    }
                },
                /**
                 * Assert that two object are equal
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    obj       
                 * @param   {System.Object}    second
                 * @return  {void}
                 */
                AreEqual: function (obj, second) {
                    Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Object, obj, second);
                },
                /**
                 * Assert that two object are not equal
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    obj       
                 * @param   {System.Object}    second
                 * @return  {void}
                 */
                AreNotEqual: function (obj, second) {
                    Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(System.Object, obj, second);
                },
                /**
                 * Test a expected to be true condition
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @throws 
                 * @param   {System.Func}    expectesTrueCondition
                 * @return  {void}
                 */
                ShouldBeTrue: function (expectesTrueCondition) {
                    var res = expectesTrueCondition();
                    if (!res) {
                        throw new Bridge.EasyTests.Exceptions.BeTrueException(System.String.format(System.String.format("Condition expected to be true but result is FALSE.", null), null));
                    }
                },
                /**
                 * Test a expected to be false condition
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @throws 
                 * @param   {System.Func}    expectesFalseCondition
                 * @return  {void}
                 */
                ShouldBeFalse: function (expectesFalseCondition) {
                    var res = expectesFalseCondition();
                    if (res) {
                        throw new Bridge.EasyTests.Exceptions.BeFalseException(System.String.format(System.String.format("Condition expected to be false but result is TRUE.", null), null));
                    }
                },
                /**
                 * COmpare obj
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    o1    
                 * @param   {System.Object}    o2
                 * @return  {boolean}
                 */
                ObjectEqual: function (o1, o2) {
                    if (o1 == null && o2 != null) {
                        return false;
                    }
                    if (o1 != null && o2 == null) {
                        return false;
                    }

                    return o1 == null || Bridge.equals(o1, o2);
                },
                /**
                 * If obj is null return 'null' else tostring
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    obj
                 * @return  {string}
                 */
                ToCompareString: function (obj) {
                    return obj == null ? "null" : obj.toString();
                }
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Asserts.ShouldExtensions", {
        statics: {
            methods: {
                /**
                 * Test equals
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.ShouldExtensions
                 * @memberof Bridge.EasyTests.Asserts.ShouldExtensions
                 * @param   {Function}    T            
                 * @param   {T}           obj          
                 * @param   {T}           secondObj
                 * @return  {void}
                 */
                ShouldBeEquals: function (T, obj, secondObj) {
                    var equal = Bridge.EasyTests.Asserts.EasyAsserts.ObjectEqual(obj, secondObj);

                    if (!equal) {
                        throw new Bridge.EasyTests.Exceptions.EqualException(System.String.format(System.String.format("Expected {0}. Value: {1}", Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(secondObj), Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(obj)), null));
                    }

                },
                /**
                 * Test not equals
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.ShouldExtensions
                 * @memberof Bridge.EasyTests.Asserts.ShouldExtensions
                 * @param   {Function}    T            
                 * @param   {T}           obj          
                 * @param   {T}           secondObj
                 * @return  {void}
                 */
                ShouldBeNotEquals: function (T, obj, secondObj) {
                    var equal = Bridge.EasyTests.Asserts.EasyAsserts.ObjectEqual(obj, secondObj);

                    if (equal) {
                        throw new Bridge.EasyTests.Exceptions.NotEqualException(System.String.format(System.String.format("Expected {0} different from {1}. Are Equal!", Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(secondObj), Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(obj)), null));
                    }

                }
            }
        }
    });

    /** @namespace Bridge.EasyTests.Attributes */

    /**
     * Attribute for test class
     *
     * @public
     * @class Bridge.EasyTests.Attributes.TestAttribute
     * @augments System.Attribute
     */
    Bridge.define("Bridge.EasyTests.Attributes.TestAttribute", {
        inherits: [System.Attribute],
        fields: {
            Description: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Attribute.ctor.call(this);

            },
            $ctor1: function (description) {
                this.$initialize();
                System.Attribute.ctor.call(this);
                this.Description = description;
            }
        }
    });

    /**
     * Attribute for test Method
     *
     * @public
     * @class Bridge.EasyTests.Attributes.TestMethodAttribute
     * @augments System.Attribute
     */
    Bridge.define("Bridge.EasyTests.Attributes.TestMethodAttribute", {
        inherits: [System.Attribute],
        fields: {
            Description: null
        },
        ctors: {
            ctor: function (description) {
                if (description === void 0) { description = null; }

                this.$initialize();
                System.Attribute.ctor.call(this);
                this.Description = description;
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.EasyTestBaseException", {
        inherits: [System.Exception],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                System.Exception.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.PippoException", {
        inherits: [System.Exception]
    });

    Bridge.define("Bridge.EasyTests.prova2", {
        methods: {
            ShouldBeEquals: function () {
                var t = 2;
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Int32, t, 3);

            },
            TestShouldBeTrue: function () {
                Bridge.EasyTests.Asserts.EasyAsserts.ShouldBeTrue(function () {
                    return false;
                });
            },
            NotEqual: function () {
                var t = 2;
                var c = 5;

                var r = (t + c) | 0;
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(System.Int32, r, 8);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Int32, r, 7);

                Bridge.EasyTests.Asserts.EasyAsserts.Throws(Bridge.EasyTests.PippoException, function () {
                    throw new Bridge.EasyTests.PippoException();
                });

            }
        }
    });

    Bridge.define("Bridge.EasyTests.Runner", {
        fields: {
            _internalTests: null,
            BrowserInfo: null,
            Tests: null,
            TotalTests: null,
            FailedTests: null,
            PassedTests: null,
            TotalTime: null,
            Running: null,
            HidePassed: null
        },
        ctors: {
            init: function () {
                this._internalTests = new (System.Collections.Generic.List$1(Bridge.EasyTests.TestDescriptor)).ctor();
            },
            ctor: function () {
                this.$initialize();
                this.Tests = ko.observableArray();
                this.TotalTests = ko.observable();
                this.FailedTests = ko.observable();
                this.PassedTests = ko.observable();
                this.TotalTime = ko.observable();
                this.Running = ko.observable();

                this.BrowserInfo = Bridge.global.navigator.appVersion;

                // hide passed test management
                this.HidePassed = ko.observable(false);
                this.HidePassed.subscribe(Bridge.fn.bind(this, function (value) {
                    System.Linq.Enumerable.from(this.Tests()).where(function (w) {
                            return w.Success;
                        }).forEach(function (f) {
                        f.Visible(!value);
                    });
                }));
            }
        },
        methods: {
            /**
             * Run tests
             *
             * @instance
             * @public
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {void}
             */
            Run: function () {
                this.Running(true);

                this.DiscoverTest(); // discovery all tests

                this.TotalTests(this._internalTests.Count); // total tests found
                this.RunTests(); // run all test for each group

                this.FailedTests(System.Linq.Enumerable.from(this._internalTests).count(function (c) {
                            return !c.Success;
                        })); // failed tests
                this.PassedTests(System.Linq.Enumerable.from(this._internalTests).count(function (c) {
                            return c.Success;
                        })); // passed Tests
                this.TotalTime(System.Linq.Enumerable.from(this.Tests()).sum(function (s) {
                            return s.Time;
                        }));

                this.Running(false);
            },
            /**
             * Run
             *
             * @instance
             * @private
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {void}
             */
            RunTests: function () {
                this._internalTests.forEach(Bridge.fn.bind(this, function (f) {
                    f.RunTest();
                    this.Tests.push(f);
                }));
            },
            /**
             * Discovery all tests
             *
             * @instance
             * @private
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {void}
             */
            DiscoverTest: function () {
                var types = System.Linq.Enumerable.from(System.AppDomain.getAssemblies()).selectMany(function (s) {
                        return Bridge.Reflection.getAssemblyTypes(s);
                    }).where(function (w) {
                    return !System.String.startsWith(Bridge.Reflection.getTypeFullName(w).toLowerCase(), "system");
                }).where(function (w) {
                    return !Bridge.Reflection.isInterface(w) && !((Bridge.Reflection.getMetaValue(w, "att", 0)  & 128)  != 0);
                }).where(function (w) {
                    return System.Linq.Enumerable.from(Bridge.Reflection.getAttributes(w, Bridge.EasyTests.Attributes.TestAttribute, true)).any();
                }).toList(Function);

                // run all tests method
                types.forEach(Bridge.fn.bind(this, function (f) {
                    var testAtt = Bridge.cast(System.Linq.Enumerable.from(Bridge.Reflection.getAttributes(f, Bridge.EasyTests.Attributes.TestAttribute, true)).first(), Bridge.EasyTests.Attributes.TestAttribute);


                    var testMethods = System.Linq.Enumerable.from(Bridge.Reflection.getMembers(f, 8, 28)).where(function (w) {
                            return (w.a === 2);
                        }).where(function (w) {
                        return System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(w, Bridge.EasyTests.Attributes.TestMethodAttribute, true)).any();
                    }).toList(System.Reflection.MethodInfo);

                    testMethods.forEach(Bridge.fn.bind(this, function (method) {
                        var $t;
                        var attr = Bridge.cast(System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(method, Bridge.EasyTests.Attributes.TestMethodAttribute, true)).first(), Bridge.EasyTests.Attributes.TestMethodAttribute);

                        var testDescr = ($t = new Bridge.EasyTests.TestDescriptor(), $t.Type = f, $t.Method = method, $t.Group = System.String.isNullOrEmpty(testAtt.Description) ? Bridge.Reflection.getTypeName(f) : testAtt.Description, $t.Name = System.String.isNullOrEmpty(attr.Description) ? method.n : attr.Description, $t);

                        this._internalTests.add(testDescr);
                    }));

                }));
            }
        }
    });

    Bridge.define("Bridge.EasyTests.TestDescriptor", {
        fields: {
            Name: null,
            Group: null,
            Type: null,
            Method: null,
            FailAssert: null,
            Time: 0,
            Visible: null
        },
        props: {
            Success: {
                get: function () {
                    return this.FailAssert == null;
                }
            },
            Error: {
                get: function () {
                    return this.FailAssert == null ? "" : System.String.format("{0}: {1}", Bridge.Reflection.getTypeName(Bridge.getType(this.FailAssert)), this.FailAssert.Message);
                }
            },
            Stack: {
                get: function () {
                    var $t;
                    return ($t = this.FailAssert) != null ? $t.StackTrace : null;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Visible = ko.observable(true);
            }
        },
        methods: {
            /**
             * Run test.
             *
             * @instance
             * @public
             * @this Bridge.EasyTests.TestDescriptor
             * @memberof Bridge.EasyTests.TestDescriptor
             * @return  {void}
             */
            RunTest: function () {
                var instance = Bridge.createInstance(this.Type);

                var watch = new System.Diagnostics.Stopwatch();
                watch.start();

                try {
                    Bridge.Reflection.midel(this.Method, Bridge.unbox(instance))(null);
                }
                catch (e) {
                    e = System.Exception.create(e);
                    this.FailAssert = e;
                }
                finally {
                    watch.stop();
                    this.Time = System.Int64.clip32(watch.milliseconds());

                    // check of type is disposable
                    var disposable = Bridge.as(instance, System.IDisposable);
                    disposable != null ? disposable.System$IDisposable$dispose() : null;
                }
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.BeFalseException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.BeTrueException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.EqualException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.NotEqualException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.ThrowsException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuRWFzeVRlc3RzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBc3NlcnRzL0Vhc3lBc3NlcnRzLmNzIiwiQXNzZXJ0cy9TaG91bGRFeHRlbnNpb25zLmNzIiwiQXR0cmlidXRlcy9UZXN0QXR0cmlidXRlLmNzIiwiQXR0cmlidXRlcy9UZXN0TWV0aG9kQXR0cmlidXRlLmNzIiwiRXhjZXB0aW9ucy9FYXN5VGVzdEJhc2VFeGNlcHRpb24uY3MiLCJwcm92YTIuY3MiLCJSdW5uZXIuY3MiLCJUZXN0RGVzY3JpcHRvci5jcyIsIkV4Y2VwdGlvbnMvQmVGYWxzZUV4Y2VwdGlvbi5jcyIsIkV4Y2VwdGlvbnMvQmVUcnVlRXhjZXB0aW9uLmNzIiwiRXhjZXB0aW9ucy9FcXVhbEV4Y2VwdGlvbi5jcyIsIkV4Y2VwdGlvbnMvTm90RXF1YWxFeGNlcHRpb24uY3MiLCJFeGNlcHRpb25zL1Rocm93c0V4Y2VwdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7WUFRWUEsYUFBYUEsSUFBSUE7WUFDakJBLGlCQUEwQkE7WUFDMUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ0dzQkEsR0FBR0E7b0JBRXpCQTt3QkFFSUE7d0JBQ0FBLE1BQU1BLElBQUlBLDRDQUFnQkEsd0VBQStEQSw4QkFBT0E7Ozs7Ozs7Ozs7NEJBUWhHQSxNQUFNQSxJQUFJQSw0Q0FBZ0JBLGtGQUEwRUEsa0RBQWlCQSw4QkFBT0E7Ozs7Ozs7Ozs7Ozs7OztvQ0FVeEdBLEtBQVlBO29CQUVoREEsd0VBQTZFQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozt1Q0FRMUNBLEtBQVlBO29CQUVuREEsMkVBQWdGQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozt3Q0FRNUNBO29CQUU1QkEsVUFBVUE7b0JBQ1ZBLElBQUdBLENBQUNBO3dCQUNBQSxNQUFNQSxJQUFJQSw0Q0FBZ0JBLHFCQUFjQTs7Ozs7Ozs7Ozs7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bUNBQVNBLCtCQUN0REEsNEJBQXFCQSxvQkFBb0JBLFdBQWNBOzt3QkFHbEVBLHdCQUF3QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkMxRlhBLE9BQU9BLG1CQUFjQTs7Ozs7b0JBRXJCQSxPQUFPQSxtQkFBY0EsT0FBT0EsS0FBZUEsaUNBQXlCQSxnRUFBMEJBOzs7Ozs7b0JBQzlGQSxPQUFPQSxNQUFvQ0Esb0JBQWFBLE9BQUtBLGdCQUE2REEsQUFBUUE7Ozs7Ozs7Z0JBU3ZKQSxlQUFlQTs7Ozs7Ozs7Ozs7Ozs7Z0JBU2ZBLGVBQWVBLHNCQUF5QkE7O2dCQUV4Q0EsWUFBWUEsSUFBSUE7Z0JBQ2hCQTs7Z0JBRUFBO29CQUVJQSxxQ0FBbUJBOzs7O29CQUluQkEsa0JBQWtCQTs7O29CQUlsQkE7b0JBQ0FBLFlBQVlBLG9CQUFLQTs7O29CQUdqQkEsaUJBQWlCQTtvQkFDakJBLGNBQVlBLE9BQUtBLEFBQXFDQSwwQ0FBc0JBOzs7Ozs7Ozs7NEJDekQ1REE7O2tGQUF1QkE7Ozs7Ozs7OzRCQ0F4QkE7O2tGQUF1QkE7Ozs7Ozs7OzRCQ0F4QkE7O2tGQUF1QkE7Ozs7Ozs7OzRCQ0FwQkE7O2tGQUF1QkE7Ozs7Ozs7OzRCQ0F6QkE7O2tGQUF1QkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgUmV0eXBlZDtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBwdWJsaWMgY2xhc3MgQXBwXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBydW5uZXIgPSBuZXcgUnVubmVyKCk7XG4gICAgICAgICAgICBrbm9ja291dC5rby5hcHBseUJpbmRpbmdzKHJ1bm5lcik7XG4gICAgICAgICAgICBydW5uZXIuUnVuKCk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnM7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEVhc3lBc3NlcnRzXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBc3NlcnQgdGhhdCBhY3Rpb24gbXVzdCB0aHJvdyBhIHNwZWNpZmljIGV4Y2VwdGlvblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhY3Rpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiRWFzeVRlc3RCYXNlRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBUaHJvd3M8VD4oQWN0aW9uIGFjdGlvbikgd2hlcmUgVCA6IEV4Y2VwdGlvblxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVGhyb3dzRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCBFeGNlcHRpb246IHswfS4gTm8gRXhjcGV0aW9uIFRocm93ZWQhXCIsdHlwZW9mKFQpLk5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChUIGV4cGVjdGVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIG9rXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRocm93c0V4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiRXhjZXB0aW9uIG9mIHR5cGU6IHswfSBpbnN0ZWFkIG9mIEV4cGVjdGVkIEV4Y2VwdGlvbjogezF9XCIsZS5HZXRUeXBlKCkuTmFtZSx0eXBlb2YoVCkuTmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBc3NlcnQgdGhhdCB0d28gb2JqZWN0IGFyZSBlcXVhbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQXJlRXF1YWwob2JqZWN0IG9iaiwgb2JqZWN0IHNlY29uZClcbiAgICAgICAge1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8b2JqZWN0PiggICAgICAgICAgICBvYmosc2Vjb25kKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgdHdvIG9iamVjdCBhcmUgbm90IGVxdWFsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZFwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBcmVOb3RFcXVhbChvYmplY3Qgb2JqLCBvYmplY3Qgc2Vjb25kKVxuICAgICAgICB7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxvYmplY3Q+KCAgICAgICAgICAgIG9iaixzZWNvbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVGVzdCBhIGV4cGVjdGVkIHRvIGJlIHRydWUgY29uZGl0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4cGVjdGVzVHJ1ZUNvbmRpdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8ZXhjZXB0aW9uIGNyZWY9XCJCZVRydWVFeGNlcHRpb25cIj48L2V4Y2VwdGlvbj5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3VsZEJlVHJ1ZShGdW5jPGJvb2w+IGV4cGVjdGVzVHJ1ZUNvbmRpdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcyA9IGV4cGVjdGVzVHJ1ZUNvbmRpdGlvbigpO1xuICAgICAgICAgICAgaWYoIXJlcylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmVUcnVlRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkNvbmRpdGlvbiBleHBlY3RlZCB0byBiZSB0cnVlIGJ1dCByZXN1bHQgaXMgRkFMU0UuXCIpKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgYSBleHBlY3RlZCB0byBiZSBmYWxzZSBjb25kaXRpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXhwZWN0ZXNGYWxzZUNvbmRpdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8ZXhjZXB0aW9uIGNyZWY9XCJCZUZhbHNlRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZUZhbHNlKEZ1bmM8Ym9vbD4gZXhwZWN0ZXNGYWxzZUNvbmRpdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcyA9IGV4cGVjdGVzRmFsc2VDb25kaXRpb24oKTtcbiAgICAgICAgICAgIGlmKHJlcylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmVGYWxzZUV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJDb25kaXRpb24gZXhwZWN0ZWQgdG8gYmUgZmFsc2UgYnV0IHJlc3VsdCBpcyBUUlVFLlwiKSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIENPbXBhcmUgb2JqXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm8xXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibzJcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgT2JqZWN0RXF1YWwob2JqZWN0IG8xLCBvYmplY3QgbzIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChvMSA9PSBudWxsICYmIG8yICE9IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChvMSAhPSBudWxsICYmIG8yID09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG8xID09IG51bGwgfHwgbzEuRXF1YWxzKG8yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIElmIG9iaiBpcyBudWxsIHJldHVybiAnbnVsbCcgZWxzZSB0b3N0cmluZ1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBUb0NvbXBhcmVTdHJpbmcodGhpcyBvYmplY3Qgb2JqKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gb2JqID09IG51bGwgPyBcIm51bGxcIiA6IG9iai5Ub1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9ucztcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0c1xue1xuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgU2hvdWxkRXh0ZW5zaW9uc1xuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVGVzdCBlcXVhbHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2Vjb25kT2JqXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3VsZEJlRXF1YWxzPFQ+KHRoaXMgVCBvYmosIFQgc2Vjb25kT2JqKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXF1YWwgPSBFYXN5QXNzZXJ0cy5PYmplY3RFcXVhbChvYmosIHNlY29uZE9iaik7XG5cbiAgICAgICAgICAgIGlmICghZXF1YWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVxdWFsRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkV4cGVjdGVkIHswfS4gVmFsdWU6IHsxfVwiLHNlY29uZE9iai5Ub0NvbXBhcmVTdHJpbmcoKSxvYmouVG9Db21wYXJlU3RyaW5nKCkpKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVGVzdCBub3QgZXF1YWxzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZE9ialwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZU5vdEVxdWFsczxUPih0aGlzIFQgb2JqLCBUIHNlY29uZE9iailcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVxdWFsID0gRWFzeUFzc2VydHMuT2JqZWN0RXF1YWwob2JqLCBzZWNvbmRPYmopO1xuXG4gICAgICAgICAgICBpZiAoZXF1YWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEVxdWFsRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkV4cGVjdGVkIHswfSBkaWZmZXJlbnQgZnJvbSB7MX0uIEFyZSBFcXVhbCFcIixzZWNvbmRPYmouVG9Db21wYXJlU3RyaW5nKCksb2JqLlRvQ29tcGFyZVN0cmluZygpKSkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXNcbntcbiAgICBcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIEF0dHJpYnV0ZSBmb3IgdGVzdCBjbGFzc1xuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgW1N5c3RlbS5BdHRyaWJ1dGVVc2FnZShTeXN0ZW0uQXR0cmlidXRlVGFyZ2V0cy5DbGFzcyldIFxuICAgIHB1YmxpYyBjbGFzcyBUZXN0QXR0cmlidXRlIDogQXR0cmlidXRlXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBUZXN0QXR0cmlidXRlKClcbiAgICAgICAge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGVzdEF0dHJpYnV0ZShzdHJpbmcgZGVzY3JpcHRpb24gKVxuICAgICAgICB7XG4gICAgICAgICAgICBEZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlc1xue1xuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gQXR0cmlidXRlIGZvciB0ZXN0IE1ldGhvZFxuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgW1N5c3RlbS5BdHRyaWJ1dGVVc2FnZShTeXN0ZW0uQXR0cmlidXRlVGFyZ2V0cy5NZXRob2QpXSBcbiAgICBwdWJsaWMgY2xhc3MgVGVzdE1ldGhvZEF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxuICAgIHtcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgVGVzdE1ldGhvZEF0dHJpYnV0ZShzdHJpbmcgZGVzY3JpcHRpb24gPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBEZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xue1xuICAgIHB1YmxpYyBjbGFzcyBFYXN5VGVzdEJhc2VFeGNlcHRpb24gOiBFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBFYXN5VGVzdEJhc2VFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKSBcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBbVGVzdChcIkRlbW9cIildXG4gICAgcHVibGljIGNsYXNzIHByb3ZhMiBcbiAgICB7XG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgdm9pZCBTaG91bGRCZUVxdWFscygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0ID0gMjtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGludD4oICAgICAgICAgICAgdCwzKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgW1Rlc3RNZXRob2QoXCJUZXN0IFNob3VsZCBiZSB0cnVlXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBUZXN0U2hvdWxkQmVUcnVlKClcbiAgICAgICAge1xuICAgICAgICAgICAgRWFzeUFzc2VydHMuU2hvdWxkQmVUcnVlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGJvb2w+KSgoKSA9PiAzPT00KSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFtUZXN0TWV0aG9kKFwiVGVzdCBzb21lIGVxdWFsc1wiKV1cbiAgICAgICAgcHVibGljIHZvaWQgTm90RXF1YWwoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdCA9IDI7XG4gICAgICAgICAgICB2YXIgYyA9IDU7XG5cbiAgICAgICAgICAgIHZhciByID0gdCArIGM7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxpbnQ+KFxuICAgICAgICAgICAgciw4KTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGludD4oICAgICAgICAgICAgciw3KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgRWFzeUFzc2VydHMuVGhyb3dzPFBpcHBvRXhjZXB0aW9uPigoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQaXBwb0V4Y2VwdGlvbigpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNsYXNzIFBpcHBvRXhjZXB0aW9uIDogRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBpbnRlcm5hbCBjbGFzcyBSdW5uZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgTGlzdDxUZXN0RGVzY3JpcHRvcj4gX2ludGVybmFsVGVzdHMgPSBuZXcgTGlzdDxUZXN0RGVzY3JpcHRvcj4oKTtcbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQnJvd3NlckluZm8geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPlRlc3RzO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5Ub3RhbFRlc3RzO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5GYWlsZWRUZXN0cztcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+UGFzc2VkVGVzdHM7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PlRvdGFsVGltZTtcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPlJ1bm5pbmc7XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+SGlkZVBhc3NlZDtcblxuXG4gICAgICAgIHB1YmxpYyBSdW5uZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLlRlc3RzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxUZXN0RGVzY3JpcHRvcj4oKTtcbiAgICAgICAgICAgIHRoaXMuVG90YWxUZXN0cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuRmFpbGVkVGVzdHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLlBhc3NlZFRlc3RzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigpO1xuICAgICAgICAgICAgdGhpcy5Ub3RhbFRpbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLlJ1bm5pbmcgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPigpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLkJyb3dzZXJJbmZvID0gR2xvYmFsLk5hdmlnYXRvci5BcHBWZXJzaW9uO1xuXG4gICAgICAgICAgICAvLyBoaWRlIHBhc3NlZCB0ZXN0IG1hbmFnZW1lbnRcbiAgICAgICAgICAgIHRoaXMuSGlkZVBhc3NlZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuSGlkZVBhc3NlZC5zdWJzY3JpYmUoKGdsb2JhbDo6UmV0eXBlZC5rbm9ja291dC5Lbm9ja291dFN1YnNjcmliYWJsZTxib29sPi5zdWJzY3JpYmVGbikodmFsdWUgPT5cbiAgICAgICAgICAgIHtcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPiggICAgICAgICAgICAgICAgdGhpcy5UZXN0cy5TZWxmKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikodz0+dy5TdWNjZXNzKSkuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4pKGY9PmYuVmlzaWJsZS5TZWxmKCF2YWx1ZSkpKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biB0ZXN0c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLlJ1bm5pbmcuU2VsZih0cnVlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5EaXNjb3ZlclRlc3QoKTsgLy8gZGlzY292ZXJ5IGFsbCB0ZXN0c1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLlRvdGFsVGVzdHMuU2VsZih0aGlzLl9pbnRlcm5hbFRlc3RzLkNvdW50KTsgLy8gdG90YWwgdGVzdHMgZm91bmRcbiAgICAgICAgICAgIHRoaXMuUnVuVGVzdHMoKTsgLy8gcnVuIGFsbCB0ZXN0IGZvciBlYWNoIGdyb3VwXG5cbiAgICAgICAgICAgIHRoaXMuRmFpbGVkVGVzdHMuU2VsZihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4odGhpcy5faW50ZXJuYWxUZXN0cywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGJvb2w+KShjPT4hYy5TdWNjZXNzKSkpOyAvLyBmYWlsZWQgdGVzdHNcbiAgICAgICAgICAgIHRoaXMuUGFzc2VkVGVzdHMuU2VsZihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4odGhpcy5faW50ZXJuYWxUZXN0cywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGJvb2w+KShjPT5jLlN1Y2Nlc3MpKSk7IC8vIHBhc3NlZCBUZXN0c1xuICAgICAgICAgICAgdGhpcy5Ub3RhbFRpbWUuU2VsZihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlN1bTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuVGVzdHMuU2VsZigpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgaW50PikocyA9PiBzLlRpbWUpKSk7XG5cbiAgICAgICAgICAgIHRoaXMuUnVubmluZy5TZWxmKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biBcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJ1blRlc3RzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxUZXN0cy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPikoZiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGYuUnVuVGVzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuVGVzdHMucHVzaChmKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIERpc2NvdmVyeSBhbGwgdGVzdHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIERpc2NvdmVyVGVzdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0TWFueTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLkFzc2VtYmx5LGdsb2JhbDo6U3lzdGVtLlR5cGU+KEFwcERvbWFpbi5DdXJyZW50RG9tYWluLkdldEFzc2VtYmxpZXMoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLkFzc2VtYmx5LCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLklFbnVtZXJhYmxlPGdsb2JhbDo6U3lzdGVtLlR5cGU+PikocyA9PiBzLkdldFR5cGVzKCkpKVxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+IXcuRnVsbE5hbWUuVG9Mb3dlcigpLlN0YXJ0c1dpdGgoXCJzeXN0ZW1cIikpKVxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+IXcuSXNJbnRlcmZhY2UgJiYgIXcuSXNBYnN0cmFjdCkpXG4gICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR5cGUsIGJvb2w+KSh3PT5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxvYmplY3Q+KHcuR2V0Q3VzdG9tQXR0cmlidXRlcyh0eXBlb2YoVGVzdEF0dHJpYnV0ZSksdHJ1ZSkpKSlcbiAgICAgICAgICAgICAgICAuVG9MaXN0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHJ1biBhbGwgdGVzdHMgbWV0aG9kXG4gICAgICAgICAgICB0eXBlcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uVHlwZT4pKGYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdEF0dCA9IChUZXN0QXR0cmlidXRlKVN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8b2JqZWN0PihmLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RBdHRyaWJ1dGUpLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB2YXIgdGVzdE1ldGhvZHMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4oZi5HZXRNZXRob2RzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvLCBib29sPikodyA9PiB3LklzUHVibGljKSlcbiAgICAgICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0Pih3LkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RNZXRob2RBdHRyaWJ1dGUpLCB0cnVlKSkpKS5Ub0xpc3QoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0ZXN0TWV0aG9kcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvPikobWV0aG9kID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IChUZXN0TWV0aG9kQXR0cmlidXRlKSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PG9iamVjdD4obWV0aG9kLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RNZXRob2RBdHRyaWJ1dGUpLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdERlc2NyID0gbmV3IFRlc3REZXNjcmlwdG9yXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cGUgPSBmLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWV0aG9kID0gbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgR3JvdXAgPSBzdHJpbmcuSXNOdWxsT3JFbXB0eSh0ZXN0QXR0LkRlc2NyaXB0aW9uKSA/IGYuTmFtZSA6IHRlc3RBdHQuRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lID0gc3RyaW5nLklzTnVsbE9yRW1wdHkoYXR0ci5EZXNjcmlwdGlvbikgPyBtZXRob2QuTmFtZSA6IGF0dHIuRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludGVybmFsVGVzdHMuQWRkKHRlc3REZXNjcik7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5EaWFnbm9zdGljcztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XG51c2luZyBSZXR5cGVkLlByaW1pdGl2ZTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBpbnRlcm5hbCBjbGFzcyBUZXN0RGVzY3JpcHRvclxuICAgIHtcblxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdyb3VwIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgVHlwZSBUeXBlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIE1ldGhvZEluZm8gTWV0aG9kIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBFeGNlcHRpb24gRmFpbEFzc2VydCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBib29sIFN1Y2Nlc3Mge2dldHtyZXR1cm4gRmFpbEFzc2VydCA9PSBudWxsO319XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBFcnJvciB7Z2V0e3JldHVybiBGYWlsQXNzZXJ0ID09IG51bGwgPyBzdHJpbmcuRW1wdHkgOiBzdHJpbmcuRm9ybWF0KFwiezB9OiB7MX1cIixGYWlsQXNzZXJ0LkdldFR5cGUoKS5OYW1lLEZhaWxBc3NlcnQuTWVzc2FnZSk7fX1cbiAgICAgICAgcHVibGljIHN0cmluZyBTdGFjayB7Z2V0e3JldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLEZhaWxBc3NlcnQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxFeGNlcHRpb24+KFwia2V5MVwiKS5TdGFja1RyYWNlOihzdHJpbmcpbnVsbDt9fVxuICAgICAgICBcbiAgICAgICAgcHVibGljIGludCBUaW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+VmlzaWJsZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRlc3REZXNjcmlwdG9yKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5WaXNpYmxlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4odHJ1ZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biB0ZXN0LlxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBSdW5UZXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gQWN0aXZhdG9yLkNyZWF0ZUluc3RhbmNlKHRoaXMuVHlwZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB3YXRjaCA9IG5ldyBTdG9wd2F0Y2goKTtcbiAgICAgICAgICAgIHdhdGNoLlN0YXJ0KCk7XG5cbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuTWV0aG9kLkludm9rZShpbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5GYWlsQXNzZXJ0ID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3YXRjaC5TdG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gKGludCl3YXRjaC5FbGFwc2VkTWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIG9mIHR5cGUgaXMgZGlzcG9zYWJsZVxuICAgICAgICAgICAgICAgIHZhciBkaXNwb3NhYmxlID0gaW5zdGFuY2UgYXMgSURpc3Bvc2FibGU7XG4gICAgICAgICAgICAgICAgZGlzcG9zYWJsZSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+ZGlzcG9zYWJsZS5EaXNwb3NlKCkpOm51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIEJlRmFsc2VFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBCZUZhbHNlRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgQmVUcnVlRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgQmVUcnVlRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgRXF1YWxFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBFcXVhbEV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIE5vdEVxdWFsRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgTm90RXF1YWxFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xue1xuICAgIHB1YmxpYyBjbGFzcyBUaHJvd3NFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBUaHJvd3NFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59Il0KfQo=
