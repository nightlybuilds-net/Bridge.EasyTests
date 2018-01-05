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

    Bridge.define("Bridge.EasyTests.TestBase", {
        props: {
            Description: {
                get: function () {
                    return Bridge.Reflection.getTypeName(Bridge.getType(this));
                }
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
                    return !Bridge.Reflection.isInterface(w) && Bridge.Reflection.isAssignableFrom(Bridge.EasyTests.TestBase, w) && !((Bridge.Reflection.getMetaValue(w, "att", 0)  & 128)  != 0);
                }).toList(Function);

                // run all tests method
                types.forEach(Bridge.fn.bind(this, function (f) {
                    var instance = Bridge.createInstance(f);
                    var testClass = Bridge.cast(instance, Bridge.EasyTests.TestBase);

                    var testMethods = System.Linq.Enumerable.from(Bridge.Reflection.getMembers(f, 8, 28)).where(function (w) {
                            return (w.a === 2);
                        }).where(function (w) {
                        return System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(w, Bridge.EasyTests.Attributes.TestMethodAttribute, true)).any();
                    }).toList(System.Reflection.MethodInfo);

                    testMethods.forEach(Bridge.fn.bind(this, function (method) {
                        var $t;
                        var testDescr = ($t = new Bridge.EasyTests.TestDescriptor(), $t.Type = f, $t.Method = method, $t.Group = System.String.isNullOrEmpty(testClass.Description) ? Bridge.Reflection.getTypeName(Bridge.getType(instance)) : testClass.Description, $t);

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
            Method: null,
            Group: null,
            FailAssert: null,
            Success: false,
            Time: 0,
            Type: null
        },
        props: {
            Name: {
                get: function () {
                    return this.Method.n;
                }
            },
            Error: {
                get: function () {
                    var $t;
                    return ($t = this.FailAssert) != null ? $t.toString() : null;
                }
            }
        },
        methods: {
            RunTest: function () {
                var instance = Bridge.createInstance(this.Type);

                var watch = new System.Diagnostics.Stopwatch();
                watch.start();

                try {
                    Bridge.Reflection.midel(this.Method, Bridge.unbox(instance))(null);
                    this.Success = true;
                }
                catch (e) {
                    e = System.Exception.create(e);
                    this.FailAssert = e;
                    this.Success = false;
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

    Bridge.define("Bridge.EasyTests.prova2", {
        inherits: [Bridge.EasyTests.TestBase],
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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuRWFzeVRlc3RzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBc3NlcnRzL0Vhc3lBc3NlcnRzLmNzIiwiQXNzZXJ0cy9TaG91bGRFeHRlbnNpb25zLmNzIiwiQXR0cmlidXRlcy9UZXN0QXR0cmlidXRlLmNzIiwiQXR0cmlidXRlcy9UZXN0TWV0aG9kQXR0cmlidXRlLmNzIiwiVGVzdEJhc2UuY3MiLCJSdW5uZXIuY3MiLCJTaG91bGRFeGNlcHRpb24uY3MiLCJUZXN0RGVzY3JpcHRvci5jcyIsInByb3ZhMi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7WUFRWUEsYUFBYUEsSUFBSUE7WUFDakJBLGlCQUEwQkE7WUFDMUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ0VzQkEsR0FBR0E7b0JBRXpCQTt3QkFFSUE7d0JBQ0FBLE1BQU1BLElBQUlBLGlDQUFnQkEsd0VBQStEQSw4QkFBT0E7Ozs7Ozs7Ozs7NEJBUWhHQSxNQUFNQSxJQUFJQSxpQ0FBZ0JBLGtGQUEwRUEsa0RBQWlCQSw4QkFBT0E7Ozs7Ozs7Ozs7Ozs7OztvQ0FVeEdBLEtBQVlBO29CQUVoREEsd0VBQTZFQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozt1Q0FRMUNBLEtBQVlBO29CQUVuREEsMkVBQWdGQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozt1Q0FXN0NBLElBQVdBO29CQUV0Q0EsSUFBSUEsTUFBTUEsUUFBUUEsTUFBTUE7d0JBQU1BOztvQkFDOUJBLElBQUlBLE1BQU1BLFFBQVFBLE1BQU1BO3dCQUFNQTs7O29CQUU5QkEsT0FBT0EsTUFBTUEsUUFBUUEsa0JBQVVBOzs7Ozs7Ozs7Ozs7MkNBUUVBO29CQUVqQ0EsT0FBT0EsT0FBT0EsZ0JBQWdCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBDQ2hFSEEsR0FBR0EsS0FBWUE7b0JBRTFDQSxZQUFZQSxpREFBd0JBLEtBQUtBOztvQkFFekNBLElBQUlBLENBQUNBO3dCQUNEQSxNQUFNQSxJQUFJQSxpQ0FBZ0JBLHFCQUFjQSxpREFBeUNBLGlFQUE0QkE7OztvQkFFakhBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs2Q0FRdUJBLEdBQUdBLEtBQVlBO29CQUU3Q0EsWUFBWUEsaURBQXdCQSxLQUFLQTs7b0JBRXpDQSxJQUFJQTt3QkFDQUEsTUFBTUEsSUFBSUEsaUNBQWdCQSxxQkFBY0Esb0VBQTREQSxpRUFBNEJBOzs7b0JBRXBJQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJDYlVBOzs7Z0JBRWpCQSxtQkFBY0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNSU0E7Ozs7O2dCQUV2QkEsbUJBQWNBOzs7Ozs7Ozs7Ozs7O29CQ1ZxQkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NDTUFBLEtBQUlBOzs7O2dCQWE5Q0EsYUFBYUE7Z0JBQ2JBLGtCQUFrQkE7Z0JBQ2xCQSxtQkFBbUJBO2dCQUNuQkEsbUJBQW1CQTtnQkFDbkJBLGlCQUFpQkE7Z0JBQ2pCQSxlQUFlQTs7Z0JBRWZBLG1CQUFtQkE7Ozs7Ozs7Ozs7Ozs7O2dCQVVuQkE7O2dCQUVBQTs7Z0JBRUFBLGdCQUFxQkE7Z0JBQ3JCQTs7Z0JBRUFBLGlCQUFzQkEsNEJBQXNFQSwyQkFBb0JBLEFBQXFFQTttQ0FBR0EsQ0FBQ0E7O2dCQUN6TEEsaUJBQXNCQSw0QkFBc0VBLDJCQUFvQkEsQUFBcUVBO21DQUFHQTs7Z0JBQ3hMQSxlQUFvQkEsNEJBQW9FQSxrQkFBa0JBLEFBQW9FQTttQ0FBS0E7OztnQkFFbkxBOzs7Ozs7Ozs7Ozs7Z0JBUUFBLDRCQUE0QkEsQUFBaUVBO29CQUV6RkE7b0JBQ0FBLGdCQUFnQkE7Ozs7Ozs7Ozs7Ozs7Z0JBU3BCQSxZQUFZQSw0QkFBMEZBLDZDQUF3Q0EsQUFBK0hBOytCQUFLQTs2QkFDdlFBLEFBQWlEQTsyQkFBSUEsQ0FBQ0Esb0NBQWlCQSxtQ0FBT0EsMkJBQTJCQSxNQUFNQSxDQUFDQTs7OztnQkFJM0hBLGNBQWNBLEFBQTZDQTtvQkFFdkRBLGVBQWVBLHNCQUF5QkE7b0JBQ3hDQSxnQkFBZ0JBLFlBQVdBOztvQkFFM0JBLGtCQUFrQkEsNEJBQW1FQSw4Q0FBZUEsQUFBa0VBO21DQUFLQTtpQ0FDaEtBLEFBQWtFQTsrQkFBS0EsNEJBQW1DQSx3Q0FBc0JBLEFBQU9BOzs7b0JBRWxKQSxvQkFBb0JBLEFBQThEQTs7d0JBRTlFQSxnQkFBZ0JBLFVBQUlBLDZDQUVUQSxlQUNFQSxtQkFDREEsNEJBQXFCQSx5QkFBeUJBLDBEQUEwQkE7O3dCQUdwRkEsd0JBQXdCQTs7Ozs7Ozs7Ozs7NEJDdkZiQTs7aURBQXVCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDS3RCQSxPQUFPQTs7Ozs7O29CQVFOQSxPQUFPQSxNQUFvQ0Esb0JBQWFBLE9BQUtBLGdCQUE2REEsQUFBUUE7Ozs7OztnQkFPdkpBLGVBQWVBLHNCQUF5QkE7O2dCQUV4Q0EsWUFBWUEsSUFBSUE7Z0JBQ2hCQTs7Z0JBRUFBO29CQUVJQSxxQ0FBbUJBO29CQUNuQkE7Ozs7b0JBSUFBLGtCQUFrQkE7b0JBQ2xCQTs7O29CQUlBQTtvQkFDQUEsWUFBWUEsb0JBQUtBOzs7b0JBR2pCQSxpQkFBaUJBO29CQUNqQkEsY0FBWUEsT0FBS0EsQUFBcUNBLDBDQUFzQkE7Ozs7Ozs7Ozs7Z0JDckNoRkE7Z0JBQ1pBLHVFQUNZQTs7O2dCQU1BQTtnQkFDQUE7O2dCQUVBQSxRQUFRQSxLQUFJQTtnQkFDeEJBLHVFQUE4REEsMEVBQ2xEQTs7Z0JBRUFBLDZFQUFtQ0EsQUFBd0JBO29CQUV2REEsTUFBTUEsSUFBSUEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgUmV0eXBlZDtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBwdWJsaWMgY2xhc3MgQXBwXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBydW5uZXIgPSBuZXcgUnVubmVyKCk7XG4gICAgICAgICAgICBrbm9ja291dC5rby5hcHBseUJpbmRpbmdzKHJ1bm5lcik7XG4gICAgICAgICAgICBydW5uZXIuUnVuKCk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEVhc3lBc3NlcnRzXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBc3NlcnQgdGhhdCBhY3Rpb24gbXVzdCB0aHJvdyBhIHNwZWNpZmljIGV4Y2VwdGlvblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhY3Rpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiU2hvdWxkRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBUaHJvd3M8VD4oQWN0aW9uIGFjdGlvbikgd2hlcmUgVCA6IEV4Y2VwdGlvblxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU2hvdWxkRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCBFeGNlcHRpb246IHswfS4gTm8gRXhjcGV0aW9uIFRocm93ZWQhXCIsdHlwZW9mKFQpLk5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChUIGV4cGVjdGVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIG9rXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFNob3VsZEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiRXhjZXB0aW9uIG9mIHR5cGU6IHswfSBpbnN0ZWFkIG9mIEV4cGVjdGVkIEV4Y2VwdGlvbjogezF9XCIsZS5HZXRUeXBlKCkuTmFtZSx0eXBlb2YoVCkuTmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBc3NlcnQgdGhhdCB0d28gb2JqZWN0IGFyZSBlcXVhbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQXJlRXF1YWwob2JqZWN0IG9iaiwgb2JqZWN0IHNlY29uZClcbiAgICAgICAge1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8b2JqZWN0PiggICAgICAgICAgICBvYmosc2Vjb25kKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgdHdvIG9iamVjdCBhcmUgbm90IGVxdWFsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZFwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBcmVOb3RFcXVhbChvYmplY3Qgb2JqLCBvYmplY3Qgc2Vjb25kKVxuICAgICAgICB7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxvYmplY3Q+KCAgICAgICAgICAgIG9iaixzZWNvbmQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIENPbXBhcmUgb2JqXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm8xXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibzJcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgT2JqZWN0RXF1YWwob2JqZWN0IG8xLCBvYmplY3QgbzIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChvMSA9PSBudWxsICYmIG8yICE9IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChvMSAhPSBudWxsICYmIG8yID09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG8xID09IG51bGwgfHwgbzEuRXF1YWxzKG8yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIElmIG9iaiBpcyBudWxsIHJldHVybiAnbnVsbCcgZWxzZSB0b3N0cmluZ1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBUb0NvbXBhcmVTdHJpbmcodGhpcyBvYmplY3Qgb2JqKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gb2JqID09IG51bGwgPyBcIm51bGxcIiA6IG9iai5Ub1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFNob3VsZEV4dGVuc2lvbnNcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgZXF1YWxzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZE9ialwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBTaG91bGRCZUVxdWFsczxUPih0aGlzIFQgb2JqLCBUIHNlY29uZE9iailcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVxdWFsID0gRWFzeUFzc2VydHMuT2JqZWN0RXF1YWwob2JqLCBzZWNvbmRPYmopO1xuXG4gICAgICAgICAgICBpZiAoIWVxdWFsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTaG91bGRFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChzdHJpbmcuRm9ybWF0KFwiRXhwZWN0ZWQgezB9LiBWYWx1ZTogezF9XCIsc2Vjb25kT2JqLlRvQ29tcGFyZVN0cmluZygpLG9iai5Ub0NvbXBhcmVTdHJpbmcoKSkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVGVzdCBub3QgZXF1YWxzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZE9ialwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBTaG91bGRCZU5vdEVxdWFsczxUPih0aGlzIFQgb2JqLCBUIHNlY29uZE9iailcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVxdWFsID0gRWFzeUFzc2VydHMuT2JqZWN0RXF1YWwob2JqLCBzZWNvbmRPYmopO1xuXG4gICAgICAgICAgICBpZiAoZXF1YWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFNob3VsZEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCB7MH0gZGlmZmVyZW50IGZyb20gezF9LiBBcmUgRXF1YWwhXCIsc2Vjb25kT2JqLlRvQ29tcGFyZVN0cmluZygpLG9iai5Ub0NvbXBhcmVTdHJpbmcoKSkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG5cblxuICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICAgICBcbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzXG57XG4gICAgXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBdHRyaWJ1dGUgZm9yIHRlc3QgY2xhc3NcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIFtTeXN0ZW0uQXR0cmlidXRlVXNhZ2UoU3lzdGVtLkF0dHJpYnV0ZVRhcmdldHMuQ2xhc3MpXSBcbiAgICBwdWJsaWMgY2xhc3MgVGVzdEF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxuICAgIHtcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgVGVzdEF0dHJpYnV0ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRlc3RBdHRyaWJ1dGUoc3RyaW5nIGRlc2NyaXB0aW9uIClcbiAgICAgICAge1xuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXNcbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIEF0dHJpYnV0ZSBmb3IgdGVzdCBNZXRob2RcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIFtTeXN0ZW0uQXR0cmlidXRlVXNhZ2UoU3lzdGVtLkF0dHJpYnV0ZVRhcmdldHMuTWV0aG9kKV0gXG4gICAgcHVibGljIGNsYXNzIFRlc3RNZXRob2RBdHRyaWJ1dGUgOiBBdHRyaWJ1dGVcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRlc3RNZXRob2RBdHRyaWJ1dGUoc3RyaW5nIGRlc2NyaXB0aW9uID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXN0QmFzZVxuICAgIHtcbiAgICAgICAgcHVibGljIHZpcnR1YWwgc3RyaW5nIERlc2NyaXB0aW9uIHtnZXR7cmV0dXJuIHRoaXMuR2V0VHlwZSgpLk5hbWU7fX1cblxuICAgICAgICAvL3Byb3RlY3RlZCBBc3NlcnRSZXN1bHQgUmVzdWx0ID0+IEFzc2VydFJlc3VsdC5SZXN1bHQ7XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgUnVubmVyXG4gICAge1xuICAgICAgICBwcml2YXRlIExpc3Q8VGVzdERlc2NyaXB0b3I+IF9pbnRlcm5hbFRlc3RzID0gbmV3IExpc3Q8VGVzdERlc2NyaXB0b3I+KCk7XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJyb3dzZXJJbmZvIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj5UZXN0cztcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+VG90YWxUZXN0cztcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+RmFpbGVkVGVzdHM7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PlBhc3NlZFRlc3RzO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5Ub3RhbFRpbWU7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5SdW5uaW5nO1xuXG5cbiAgICAgICAgcHVibGljIFJ1bm5lcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuVGVzdHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPFRlc3REZXNjcmlwdG9yPigpO1xuICAgICAgICAgICAgdGhpcy5Ub3RhbFRlc3RzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigpO1xuICAgICAgICAgICAgdGhpcy5GYWlsZWRUZXN0cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuUGFzc2VkVGVzdHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLlRvdGFsVGltZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuUnVubmluZyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG5cbiAgICAgICAgICAgIHRoaXMuQnJvd3NlckluZm8gPSBHbG9iYWwuTmF2aWdhdG9yLkFwcFZlcnNpb247XG4gICAgICAgIH1cblxuICAgICAgICBcblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gdGVzdHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5SdW5uaW5nLlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuRGlzY292ZXJUZXN0KCk7IC8vIGRpc2NvdmVyeSBhbGwgdGVzdHNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5Ub3RhbFRlc3RzLlNlbGYodGhpcy5faW50ZXJuYWxUZXN0cy5Db3VudCk7IC8vIHRvdGFsIHRlc3RzIGZvdW5kXG4gICAgICAgICAgICB0aGlzLlJ1blRlc3RzKCk7IC8vIHJ1biBhbGwgdGVzdCBmb3IgZWFjaCBncm91cFxuXG4gICAgICAgICAgICB0aGlzLkZhaWxlZFRlc3RzLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuX2ludGVybmFsVGVzdHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikoYz0+IWMuU3VjY2VzcykpKTsgLy8gZmFpbGVkIHRlc3RzXG4gICAgICAgICAgICB0aGlzLlBhc3NlZFRlc3RzLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuX2ludGVybmFsVGVzdHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikoYz0+Yy5TdWNjZXNzKSkpOyAvLyBwYXNzZWQgVGVzdHNcbiAgICAgICAgICAgIHRoaXMuVG90YWxUaW1lLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TdW08Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPih0aGlzLlRlc3RzLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGludD4pKHMgPT4gcy5UaW1lKSkpO1xuXG4gICAgICAgICAgICB0aGlzLlJ1bm5pbmcuU2VsZihmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBSdW5UZXN0cygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsVGVzdHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4pKGYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmLlJ1blRlc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLlRlc3RzLnB1c2goZik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBEaXNjb3ZlcnkgYWxsIHRlc3RzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBEaXNjb3ZlclRlc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSxnbG9iYWw6OlN5c3RlbS5UeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OlN5c3RlbS5UeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHc9PiAhdy5Jc0ludGVyZmFjZSAmJiB0eXBlb2YoVGVzdEJhc2UpLklzQXNzaWduYWJsZUZyb20odykgJiYgIXcuSXNBYnN0cmFjdCkpXG4gICAgICAgICAgICAgICAgLlRvTGlzdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBydW4gYWxsIHRlc3RzIG1ldGhvZFxuICAgICAgICAgICAgdHlwZXMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlR5cGU+KShmID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gQWN0aXZhdG9yLkNyZWF0ZUluc3RhbmNlKGYpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXN0Q2xhc3MgPSAoVGVzdEJhc2UpIGluc3RhbmNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RNZXRob2RzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8+KGYuR2V0TWV0aG9kcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gdy5Jc1B1YmxpYykpXG4gICAgICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8sIGJvb2w+KSh3ID0+IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4ody5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0TWV0aG9kQXR0cmlidXRlKSwgdHJ1ZSkpKSkuVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGVzdE1ldGhvZHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4pKG1ldGhvZCA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3REZXNjciA9IG5ldyBUZXN0RGVzY3JpcHRvclxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBlID0gZixcbiAgICAgICAgICAgICAgICAgICAgICAgIE1ldGhvZCA9IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEdyb3VwID0gc3RyaW5nLklzTnVsbE9yRW1wdHkodGVzdENsYXNzLkRlc2NyaXB0aW9uKSA/IGluc3RhbmNlLkdldFR5cGUoKS5OYW1lIDogdGVzdENsYXNzLkRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcm5hbFRlc3RzLkFkZCh0ZXN0RGVzY3IpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIHB1YmxpYyBjbGFzcyBTaG91bGRFeGNlcHRpb24gOiBFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBTaG91bGRFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKSBcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xudXNpbmcgUmV0eXBlZC5QcmltaXRpdmU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgVGVzdERlc2NyaXB0b3JcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZSB7Z2V0e3JldHVybiB0aGlzLk1ldGhvZC5OYW1lO319XG4gICAgICAgIHB1YmxpYyBNZXRob2RJbmZvIE1ldGhvZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR3JvdXAgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIEV4Y2VwdGlvbiBGYWlsQXNzZXJ0IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGJvb2wgU3VjY2VzcyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBpbnQgVGltZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBFcnJvciB7Z2V0e3JldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLEZhaWxBc3NlcnQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxFeGNlcHRpb24+KFwia2V5MVwiKS5Ub1N0cmluZygpOihzdHJpbmcpbnVsbDt9fVxuICAgICAgICBwdWJsaWMgVHlwZSBUeXBlIHsgZ2V0OyBzZXQ7IH1cblxuXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdm9pZCBSdW5UZXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gQWN0aXZhdG9yLkNyZWF0ZUluc3RhbmNlKHRoaXMuVHlwZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB3YXRjaCA9IG5ldyBTdG9wd2F0Y2goKTtcbiAgICAgICAgICAgIHdhdGNoLlN0YXJ0KCk7XG5cbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuTWV0aG9kLkludm9rZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLkZhaWxBc3NlcnQgPSBlO1xuICAgICAgICAgICAgICAgIHRoaXMuU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdhdGNoLlN0b3AoKTtcbiAgICAgICAgICAgICAgICB0aGlzLlRpbWUgPSAoaW50KXdhdGNoLkVsYXBzZWRNaWxsaXNlY29uZHM7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgb2YgdHlwZSBpcyBkaXNwb3NhYmxlXG4gICAgICAgICAgICAgICAgdmFyIGRpc3Bvc2FibGUgPSBpbnN0YW5jZSBhcyBJRGlzcG9zYWJsZTtcbiAgICAgICAgICAgICAgICBkaXNwb3NhYmxlIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5kaXNwb3NhYmxlLkRpc3Bvc2UoKSk6bnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBwdWJsaWMgY2xhc3MgcHJvdmEyIDogVGVzdEJhc2VcbiAgICB7XG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgdm9pZCBQaXBwbygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0ID0gMjtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGludD4oICAgICAgICAgICAgXG4gICAgICAgICAgICB0LDMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZF1cbiAgICAgICAgcHVibGljIHZvaWQgU29tbWEoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdCA9IDI7XG4gICAgICAgICAgICB2YXIgYyA9IDU7XG5cbiAgICAgICAgICAgIHZhciByID0gdCArIGM7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxpbnQ+KEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPGludD4oXG4gICAgICAgICAgICByLDgpLDcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBFYXN5QXNzZXJ0cy5UaHJvd3M8UGlwcG9FeGNlcHRpb24+KChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBpcHBvRXhjZXB0aW9uKCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFBpcHBvRXhjZXB0aW9uIDogRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBcbiAgICB9XG59Il0KfQo=
