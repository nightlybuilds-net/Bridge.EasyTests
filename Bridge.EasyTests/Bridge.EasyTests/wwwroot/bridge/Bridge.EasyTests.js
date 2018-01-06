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
                        throw new Bridge.EasyTests.ShouldException(System.String.format("Expected Exception: {0}. No Excpetion Throwed!", [Bridge.Reflection.getTypeName(T)]));
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                        var expected, e;
                        if (Bridge.is($e1, T)) {
                            expected = $e1;
                            // ok
                        } else {
                            e = $e1;
                            throw new Bridge.EasyTests.ShouldException(System.String.format("Exception of type: {0} instead of Expected Exception: {1}", Bridge.Reflection.getTypeName(Bridge.getType(e)), Bridge.Reflection.getTypeName(T)));
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
                 * @return  {T}
                 */
                ShouldBeEquals: function (T, obj, secondObj) {
                    var equal = Bridge.EasyTests.Asserts.EasyAsserts.ObjectEqual(obj, secondObj);

                    if (!equal) {
                        throw new Bridge.EasyTests.ShouldException(System.String.format(System.String.format("Expected {0}. Value: {1}", Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(secondObj), Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(obj)), null));
                    }

                    return obj;
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
                 * @return  {T}
                 */
                ShouldBeNotEquals: function (T, obj, secondObj) {
                    var equal = Bridge.EasyTests.Asserts.EasyAsserts.ObjectEqual(obj, secondObj);

                    if (equal) {
                        throw new Bridge.EasyTests.ShouldException(System.String.format(System.String.format("Expected {0} different from {1}. Are Equal!", Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(secondObj), Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(obj)), null));
                    }

                    return obj;
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

    Bridge.define("Bridge.EasyTests.PippoException", {
        inherits: [System.Exception]
    });

    Bridge.define("Bridge.EasyTests.prova2", {
        methods: {
            Pippo: function () {
                var t = 2;
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Int32, t, 3);
            },
            Somma: function () {
                var t = 2;
                var c = 5;

                var r = (t + c) | 0;
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Int32, Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(System.Int32, r, 8), 7);

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
            Running: null
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

    Bridge.define("Bridge.EasyTests.ShouldException", {
        inherits: [System.Exception],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                System.Exception.ctor.call(this, message);
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
            Time: 0
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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuRWFzeVRlc3RzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBc3NlcnRzL0Vhc3lBc3NlcnRzLmNzIiwiQXNzZXJ0cy9TaG91bGRFeHRlbnNpb25zLmNzIiwiQXR0cmlidXRlcy9UZXN0QXR0cmlidXRlLmNzIiwiQXR0cmlidXRlcy9UZXN0TWV0aG9kQXR0cmlidXRlLmNzIiwicHJvdmEyLmNzIiwiUnVubmVyLmNzIiwiU2hvdWxkRXhjZXB0aW9uLmNzIiwiVGVzdERlc2NyaXB0b3IuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O1lBUVlBLGFBQWFBLElBQUlBO1lBQ2pCQSxpQkFBMEJBO1lBQzFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0NFc0JBLEdBQUdBO29CQUV6QkE7d0JBRUlBO3dCQUNBQSxNQUFNQSxJQUFJQSxpQ0FBZ0JBLHdFQUErREEsOEJBQU9BOzs7Ozs7Ozs7OzRCQVFoR0EsTUFBTUEsSUFBSUEsaUNBQWdCQSxrRkFBMEVBLGtEQUFpQkEsOEJBQU9BOzs7Ozs7Ozs7Ozs7Ozs7b0NBVXhHQSxLQUFZQTtvQkFFaERBLHdFQUE2RUEsS0FBSUE7Ozs7Ozs7Ozs7Ozs7dUNBUTFDQSxLQUFZQTtvQkFFbkRBLDJFQUFnRkEsS0FBSUE7Ozs7Ozs7Ozs7Ozs7dUNBVzdDQSxJQUFXQTtvQkFFdENBLElBQUlBLE1BQU1BLFFBQVFBLE1BQU1BO3dCQUFNQTs7b0JBQzlCQSxJQUFJQSxNQUFNQSxRQUFRQSxNQUFNQTt3QkFBTUE7OztvQkFFOUJBLE9BQU9BLE1BQU1BLFFBQVFBLGtCQUFVQTs7Ozs7Ozs7Ozs7OzJDQVFFQTtvQkFFakNBLE9BQU9BLE9BQU9BLGdCQUFnQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQ0NoRUhBLEdBQUdBLEtBQVlBO29CQUUxQ0EsWUFBWUEsaURBQXdCQSxLQUFLQTs7b0JBRXpDQSxJQUFJQSxDQUFDQTt3QkFDREEsTUFBTUEsSUFBSUEsaUNBQWdCQSxxQkFBY0EsaURBQXlDQSxpRUFBNEJBOzs7b0JBRWpIQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7NkNBUXVCQSxHQUFHQSxLQUFZQTtvQkFFN0NBLFlBQVlBLGlEQUF3QkEsS0FBS0E7O29CQUV6Q0EsSUFBSUE7d0JBQ0FBLE1BQU1BLElBQUlBLGlDQUFnQkEscUJBQWNBLG9FQUE0REEsaUVBQTRCQTs7O29CQUVwSUEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQ2JVQTs7O2dCQUVqQkEsbUJBQWNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDUlNBOzs7OztnQkFFdkJBLG1CQUFjQTs7Ozs7Ozs7Ozs7O2dCQ0ZkQTtnQkFDWkEsdUVBQ1lBOzs7Z0JBTUFBO2dCQUNBQTs7Z0JBRUFBLFFBQVFBLEtBQUlBO2dCQUN4QkEsdUVBQThEQSwwRUFDbERBOztnQkFFQUEsNkVBQW1DQSxBQUF3QkE7b0JBRXZEQSxNQUFNQSxJQUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NDbkI0QkEsS0FBSUE7Ozs7Z0JBYTlDQSxhQUFhQTtnQkFDYkEsa0JBQWtCQTtnQkFDbEJBLG1CQUFtQkE7Z0JBQ25CQSxtQkFBbUJBO2dCQUNuQkEsaUJBQWlCQTtnQkFDakJBLGVBQWVBOztnQkFFZkEsbUJBQW1CQTs7Ozs7Ozs7Ozs7Ozs7Z0JBVW5CQTs7Z0JBRUFBOztnQkFFQUEsZ0JBQXFCQTtnQkFDckJBOztnQkFFQUEsaUJBQXNCQSw0QkFBc0VBLDJCQUFvQkEsQUFBcUVBO21DQUFHQSxDQUFDQTs7Z0JBQ3pMQSxpQkFBc0JBLDRCQUFzRUEsMkJBQW9CQSxBQUFxRUE7bUNBQUdBOztnQkFDeExBLGVBQW9CQSw0QkFBb0VBLGtCQUFrQkEsQUFBb0VBO21DQUFLQTs7O2dCQUVuTEE7Ozs7Ozs7Ozs7OztnQkFRQUEsNEJBQTRCQSxBQUFpRUE7b0JBRXpGQTtvQkFDQUEsZ0JBQWdCQTs7Ozs7Ozs7Ozs7OztnQkFTcEJBLFlBQVlBLDRCQUEwRkEsNkNBQXdDQSxBQUErSEE7K0JBQUtBOzZCQUN2UUEsQUFBaURBOzJCQUFHQSxDQUFDQTt5QkFDckRBLEFBQWlEQTsyQkFBR0EsQ0FBQ0Esb0NBQWlCQSxDQUFDQTt5QkFDdkVBLEFBQWlEQTsyQkFBR0EsNEJBQW1DQSxtQ0FBc0JBLEFBQU9BOzs7O2dCQUkvSEEsY0FBY0EsQUFBNkNBO29CQUV2REEsY0FBY0EsWUFBZUEsNEJBQXFDQSxtQ0FBc0JBLEFBQU9BOzs7b0JBRy9GQSxrQkFBa0JBLDRCQUFtRUEsOENBQWVBLEFBQWtFQTttQ0FBS0E7aUNBQ2hLQSxBQUFrRUE7K0JBQUtBLDRCQUFtQ0Esd0NBQXNCQSxBQUFPQTs7O29CQUVsSkEsb0JBQW9CQSxBQUE4REE7O3dCQUU5RUEsV0FBV0EsWUFBc0JBLDRCQUFxQ0EsNkNBQTJCQSxBQUFPQTs7d0JBRXhHQSxnQkFBZ0JBLFVBQUlBLDZDQUVUQSxlQUNFQSxtQkFDREEsNEJBQXFCQSx1QkFBdUJBLG1DQUFTQSwrQkFDdERBLDRCQUFxQkEsb0JBQW9CQSxXQUFjQTs7d0JBR2xFQSx3QkFBd0JBOzs7Ozs7Ozs7Ozs0QkM1RmJBOztpREFBdUJBOzs7Ozs7Ozs7Ozs7Ozs7OztvQkNjckJBLE9BQU9BLG1CQUFjQTs7Ozs7b0JBRXJCQSxPQUFPQSxtQkFBY0EsT0FBT0EsS0FBZUEsaUNBQXlCQSxnRUFBMEJBOzs7Ozs7b0JBQzlGQSxPQUFPQSxNQUFvQ0Esb0JBQWFBLE9BQUtBLGdCQUE2REEsQUFBUUE7Ozs7Ozs7Ozs7Ozs7OztnQkFVdkpBLGVBQWVBLHNCQUF5QkE7O2dCQUV4Q0EsWUFBWUEsSUFBSUE7Z0JBQ2hCQTs7Z0JBRUFBO29CQUVJQSxxQ0FBbUJBOzs7O29CQUluQkEsa0JBQWtCQTs7O29CQUlsQkE7b0JBQ0FBLFlBQVlBLG9CQUFLQTs7O29CQUdqQkEsaUJBQWlCQTtvQkFDakJBLGNBQVlBLE9BQUtBLEFBQXFDQSwwQ0FBc0JBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgcHVibGljIGNsYXNzIEFwcFxuICAgIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcnVubmVyID0gbmV3IFJ1bm5lcigpO1xuICAgICAgICAgICAga25vY2tvdXQua28uYXBwbHlCaW5kaW5ncyhydW5uZXIpO1xuICAgICAgICAgICAgcnVubmVyLlJ1bigpO1xuXG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFYXN5QXNzZXJ0c1xuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgYWN0aW9uIG11c3QgdGhyb3cgYSBzcGVjaWZpYyBleGNlcHRpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWN0aW9uXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIlNob3VsZEV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgVGhyb3dzPFQ+KEFjdGlvbiBhY3Rpb24pIHdoZXJlIFQgOiBFeGNlcHRpb25cbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFNob3VsZEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiRXhwZWN0ZWQgRXhjZXB0aW9uOiB7MH0uIE5vIEV4Y3BldGlvbiBUaHJvd2VkIVwiLHR5cGVvZihUKS5OYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoVCBleHBlY3RlZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBva1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTaG91bGRFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIkV4Y2VwdGlvbiBvZiB0eXBlOiB7MH0gaW5zdGVhZCBvZiBFeHBlY3RlZCBFeGNlcHRpb246IHsxfVwiLGUuR2V0VHlwZSgpLk5hbWUsdHlwZW9mKFQpLk5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgdHdvIG9iamVjdCBhcmUgZXF1YWxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2Vjb25kXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFyZUVxdWFsKG9iamVjdCBvYmosIG9iamVjdCBzZWNvbmQpXG4gICAgICAgIHtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPG9iamVjdD4oICAgICAgICAgICAgb2JqLHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFzc2VydCB0aGF0IHR3byBvYmplY3QgYXJlIG5vdCBlcXVhbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQXJlTm90RXF1YWwob2JqZWN0IG9iaiwgb2JqZWN0IHNlY29uZClcbiAgICAgICAge1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8b2JqZWN0PiggICAgICAgICAgICBvYmosc2Vjb25kKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBDT21wYXJlIG9ialxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvMVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm8yXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIE9iamVjdEVxdWFsKG9iamVjdCBvMSwgb2JqZWN0IG8yKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAobzEgPT0gbnVsbCAmJiBvMiAhPSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAobzEgIT0gbnVsbCAmJiBvMiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBvMSA9PSBudWxsIHx8IG8xLkVxdWFscyhvMik7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBJZiBvYmogaXMgbnVsbCByZXR1cm4gJ251bGwnIGVsc2UgdG9zdHJpbmdcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgVG9Db21wYXJlU3RyaW5nKHRoaXMgb2JqZWN0IG9iailcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiA9PSBudWxsID8gXCJudWxsXCIgOiBvYmouVG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBTaG91bGRFeHRlbnNpb25zXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBUZXN0IGVxdWFsc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRPYmpcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgU2hvdWxkQmVFcXVhbHM8VD4odGhpcyBUIG9iaiwgVCBzZWNvbmRPYmopXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcXVhbCA9IEVhc3lBc3NlcnRzLk9iamVjdEVxdWFsKG9iaiwgc2Vjb25kT2JqKTtcblxuICAgICAgICAgICAgaWYgKCFlcXVhbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU2hvdWxkRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkV4cGVjdGVkIHswfS4gVmFsdWU6IHsxfVwiLHNlY29uZE9iai5Ub0NvbXBhcmVTdHJpbmcoKSxvYmouVG9Db21wYXJlU3RyaW5nKCkpKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3Qgbm90IGVxdWFsc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRPYmpcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgU2hvdWxkQmVOb3RFcXVhbHM8VD4odGhpcyBUIG9iaiwgVCBzZWNvbmRPYmopXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcXVhbCA9IEVhc3lBc3NlcnRzLk9iamVjdEVxdWFsKG9iaiwgc2Vjb25kT2JqKTtcblxuICAgICAgICAgICAgaWYgKGVxdWFsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTaG91bGRFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChzdHJpbmcuRm9ybWF0KFwiRXhwZWN0ZWQgezB9IGRpZmZlcmVudCBmcm9tIHsxfS4gQXJlIEVxdWFsIVwiLHNlY29uZE9iai5Ub0NvbXBhcmVTdHJpbmcoKSxvYmouVG9Db21wYXJlU3RyaW5nKCkpKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgICAgXG4gICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlc1xue1xuICAgIFxuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gQXR0cmlidXRlIGZvciB0ZXN0IGNsYXNzXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBbU3lzdGVtLkF0dHJpYnV0ZVVzYWdlKFN5c3RlbS5BdHRyaWJ1dGVUYXJnZXRzLkNsYXNzKV0gXG4gICAgcHVibGljIGNsYXNzIFRlc3RBdHRyaWJ1dGUgOiBBdHRyaWJ1dGVcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRlc3RBdHRyaWJ1dGUoKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUZXN0QXR0cmlidXRlKHN0cmluZyBkZXNjcmlwdGlvbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzXG57XG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBdHRyaWJ1dGUgZm9yIHRlc3QgTWV0aG9kXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBbU3lzdGVtLkF0dHJpYnV0ZVVzYWdlKFN5c3RlbS5BdHRyaWJ1dGVUYXJnZXRzLk1ldGhvZCldIFxuICAgIHB1YmxpYyBjbGFzcyBUZXN0TWV0aG9kQXR0cmlidXRlIDogQXR0cmlidXRlXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBUZXN0TWV0aG9kQXR0cmlidXRlKHN0cmluZyBkZXNjcmlwdGlvbiA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIFtUZXN0KCldXG4gICAgcHVibGljIGNsYXNzIHByb3ZhMiBcbiAgICB7XG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgdm9pZCBQaXBwbygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0ID0gMjtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGludD4oICAgICAgICAgICAgXG4gICAgICAgICAgICB0LDMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZChcImNpY2Npb29vb29vXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBTb21tYSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0ID0gMjtcbiAgICAgICAgICAgIHZhciBjID0gNTtcblxuICAgICAgICAgICAgdmFyIHIgPSB0ICsgYztcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGludD4oQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8aW50PihcbiAgICAgICAgICAgIHIsOCksNyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEVhc3lBc3NlcnRzLlRocm93czxQaXBwb0V4Y2VwdGlvbj4oKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGlwcG9FeGNlcHRpb24oKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjbGFzcyBQaXBwb0V4Y2VwdGlvbiA6IEV4Y2VwdGlvblxuICAgIHtcbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgUnVubmVyXG4gICAge1xuICAgICAgICBwcml2YXRlIExpc3Q8VGVzdERlc2NyaXB0b3I+IF9pbnRlcm5hbFRlc3RzID0gbmV3IExpc3Q8VGVzdERlc2NyaXB0b3I+KCk7XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJyb3dzZXJJbmZvIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj5UZXN0cztcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+VG90YWxUZXN0cztcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+RmFpbGVkVGVzdHM7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PlBhc3NlZFRlc3RzO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5Ub3RhbFRpbWU7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5SdW5uaW5nO1xuXG5cbiAgICAgICAgcHVibGljIFJ1bm5lcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuVGVzdHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPFRlc3REZXNjcmlwdG9yPigpO1xuICAgICAgICAgICAgdGhpcy5Ub3RhbFRlc3RzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigpO1xuICAgICAgICAgICAgdGhpcy5GYWlsZWRUZXN0cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuUGFzc2VkVGVzdHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLlRvdGFsVGltZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuUnVubmluZyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG5cbiAgICAgICAgICAgIHRoaXMuQnJvd3NlckluZm8gPSBHbG9iYWwuTmF2aWdhdG9yLkFwcFZlcnNpb247XG4gICAgICAgIH1cblxuICAgICAgICBcblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gdGVzdHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5SdW5uaW5nLlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuRGlzY292ZXJUZXN0KCk7IC8vIGRpc2NvdmVyeSBhbGwgdGVzdHNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5Ub3RhbFRlc3RzLlNlbGYodGhpcy5faW50ZXJuYWxUZXN0cy5Db3VudCk7IC8vIHRvdGFsIHRlc3RzIGZvdW5kXG4gICAgICAgICAgICB0aGlzLlJ1blRlc3RzKCk7IC8vIHJ1biBhbGwgdGVzdCBmb3IgZWFjaCBncm91cFxuXG4gICAgICAgICAgICB0aGlzLkZhaWxlZFRlc3RzLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuX2ludGVybmFsVGVzdHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikoYz0+IWMuU3VjY2VzcykpKTsgLy8gZmFpbGVkIHRlc3RzXG4gICAgICAgICAgICB0aGlzLlBhc3NlZFRlc3RzLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuX2ludGVybmFsVGVzdHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikoYz0+Yy5TdWNjZXNzKSkpOyAvLyBwYXNzZWQgVGVzdHNcbiAgICAgICAgICAgIHRoaXMuVG90YWxUaW1lLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TdW08Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPih0aGlzLlRlc3RzLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGludD4pKHMgPT4gcy5UaW1lKSkpO1xuXG4gICAgICAgICAgICB0aGlzLlJ1bm5pbmcuU2VsZihmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBSdW5UZXN0cygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsVGVzdHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4pKGYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmLlJ1blRlc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLlRlc3RzLnB1c2goZik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBEaXNjb3ZlcnkgYWxsIHRlc3RzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBEaXNjb3ZlclRlc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSxnbG9iYWw6OlN5c3RlbS5UeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OlN5c3RlbS5UeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHc9PiF3LkZ1bGxOYW1lLlRvTG93ZXIoKS5TdGFydHNXaXRoKFwic3lzdGVtXCIpKSlcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHc9PiF3LklzSW50ZXJmYWNlICYmICF3LklzQWJzdHJhY3QpKVxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+U3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0Pih3LkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RBdHRyaWJ1dGUpLHRydWUpKSkpXG4gICAgICAgICAgICAgICAgLlRvTGlzdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBydW4gYWxsIHRlc3RzIG1ldGhvZFxuICAgICAgICAgICAgdHlwZXMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlR5cGU+KShmID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3RBdHQgPSAoVGVzdEF0dHJpYnV0ZSlTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PG9iamVjdD4oZi5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0QXR0cmlidXRlKSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RNZXRob2RzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8+KGYuR2V0TWV0aG9kcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gdy5Jc1B1YmxpYykpXG4gICAgICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8sIGJvb2w+KSh3ID0+IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4ody5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0TWV0aG9kQXR0cmlidXRlKSwgdHJ1ZSkpKSkuVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGVzdE1ldGhvZHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4pKG1ldGhvZCA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSAoVGVzdE1ldGhvZEF0dHJpYnV0ZSkgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxvYmplY3Q+KG1ldGhvZC5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0TWV0aG9kQXR0cmlidXRlKSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3REZXNjciA9IG5ldyBUZXN0RGVzY3JpcHRvclxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBlID0gZixcbiAgICAgICAgICAgICAgICAgICAgICAgIE1ldGhvZCA9IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEdyb3VwID0gc3RyaW5nLklzTnVsbE9yRW1wdHkodGVzdEF0dC5EZXNjcmlwdGlvbikgPyBmLk5hbWUgOiB0ZXN0QXR0LkRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZSA9IHN0cmluZy5Jc051bGxPckVtcHR5KGF0dHIuRGVzY3JpcHRpb24pID8gbWV0aG9kLk5hbWUgOiBhdHRyLkRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcm5hbFRlc3RzLkFkZCh0ZXN0RGVzY3IpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIHB1YmxpYyBjbGFzcyBTaG91bGRFeGNlcHRpb24gOiBFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBTaG91bGRFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKSBcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzO1xudXNpbmcgUmV0eXBlZC5QcmltaXRpdmU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgVGVzdERlc2NyaXB0b3JcbiAgICB7XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIHN0cmluZyBHcm91cCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFR5cGUgVHlwZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBNZXRob2RJbmZvIE1ldGhvZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgRXhjZXB0aW9uIEZhaWxBc3NlcnQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgYm9vbCBTdWNjZXNzIHtnZXR7cmV0dXJuIEZhaWxBc3NlcnQgPT0gbnVsbDt9fVxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRXJyb3Ige2dldHtyZXR1cm4gRmFpbEFzc2VydCA9PSBudWxsID8gc3RyaW5nLkVtcHR5IDogc3RyaW5nLkZvcm1hdChcInswfTogezF9XCIsRmFpbEFzc2VydC5HZXRUeXBlKCkuTmFtZSxGYWlsQXNzZXJ0Lk1lc3NhZ2UpO319XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU3RhY2sge2dldHtyZXR1cm4gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixGYWlsQXNzZXJ0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8RXhjZXB0aW9uPihcImtleTFcIikuU3RhY2tUcmFjZTooc3RyaW5nKW51bGw7fX1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBpbnQgVGltZSB7IGdldDsgc2V0OyB9XG5cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gdGVzdC5cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgUnVuVGVzdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZSh0aGlzLlR5cGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgd2F0Y2ggPSBuZXcgU3RvcHdhdGNoKCk7XG4gICAgICAgICAgICB3YXRjaC5TdGFydCgpO1xuXG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLk1ldGhvZC5JbnZva2UoaW5zdGFuY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuRmFpbEFzc2VydCA9IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgd2F0Y2guU3RvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuVGltZSA9IChpbnQpd2F0Y2guRWxhcHNlZE1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBvZiB0eXBlIGlzIGRpc3Bvc2FibGVcbiAgICAgICAgICAgICAgICB2YXIgZGlzcG9zYWJsZSA9IGluc3RhbmNlIGFzIElEaXNwb3NhYmxlO1xuICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PmRpc3Bvc2FibGUuRGlzcG9zZSgpKTpudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59Il0KfQo=
