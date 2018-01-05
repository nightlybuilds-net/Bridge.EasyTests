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

    Bridge.define("Bridge.EasyTests.AssertResult", {
        statics: {
            props: {
                Result: {
                    get: function () {
                        return new Bridge.EasyTests.AssertResult();
                    }
                }
            }
        },
        fields: {
            Asserts: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Asserts = new (System.Collections.Generic.List$1(Bridge.EasyTests.EasyAssert)).ctor();
            }
        },
        methods: {
            WithAssert: function (assert, description) {
                var $t;
                this.Asserts.add(($t = new Bridge.EasyTests.EasyAssert(), $t.Description = description, $t.Success = assert(), $t));
                return this;
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

    Bridge.define("Bridge.EasyTests.EasyAssert", {
        fields: {
            Description: null,
            Success: false
        }
    });

    Bridge.define("Bridge.EasyTests.TestBase", {
        props: {
            Description: {
                get: function () {
                    return Bridge.Reflection.getTypeName(Bridge.getType(this));
                }
            },
            Result: {
                get: function () {
                    return Bridge.EasyTests.AssertResult.Result;
                }
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Runner", {
        fields: {
            BrowserInfo: null,
            Tests: null,
            TotalAssertions: null,
            FailedAsserts: null,
            PassedAsserts: null,
            TotalTime: null,
            Running: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Tests = ko.observableArray();
                this.TotalAssertions = ko.observable();
                this.FailedAsserts = ko.observable();
                this.PassedAsserts = ko.observable();
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

                this.RunTests(); // run all test for each group

                this.TotalAssertions(System.Linq.Enumerable.from(this.Tests()).selectMany(function (sm) {
                            return sm.EasyAssertions();
                        }).count()); // total tests found

                this.FailedAsserts(System.Linq.Enumerable.from(this.Tests()).selectMany(function (sm) {
                            return sm.EasyAssertions();
                        }).count(function (c) {
                        return !c.Success;
                    })); // failed assertion tests found
                this.PassedAsserts(System.Linq.Enumerable.from(this.Tests()).selectMany(function (sm) {
                            return sm.EasyAssertions();
                        }).count(function (c) {
                        return c.Success;
                    })); // failed assertion tests found
                this.TotalTime(System.Linq.Enumerable.from(this.Tests()).sum(function (s) {
                            return s.Time();
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
                this.Tests().forEach(function (f) {
                        f.RunTest();
                    });
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
                        var testDescr = ($t = new Bridge.EasyTests.TestDescriptor(), $t.Instance = instance, $t.Method = method, $t.Group = System.String.isNullOrEmpty(testClass.Description) ? Bridge.Reflection.getTypeName(Bridge.getType(instance)) : testClass.Description, $t);

                        this.Tests.push(testDescr);
                    }));

                }));
            }
        }
    });

    Bridge.define("Bridge.EasyTests.TestDescriptor", {
        fields: {
            Method: null,
            Instance: null,
            Group: null,
            EasyAssertions: null,
            Success: null,
            Time: null
        },
        props: {
            Name: {
                get: function () {
                    return this.Method.n;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.EasyAssertions = ko.observableArray();
                this.Success = ko.observable(false);
                this.Time = ko.observable(0);
            }
        },
        methods: {
            RunTest: function () {
                var watch = new System.Diagnostics.Stopwatch();
                watch.start();
                var assertResult = Bridge.as(Bridge.Reflection.midel(this.Method, Bridge.unbox(this.Instance))(null), Bridge.EasyTests.AssertResult);
                watch.stop();

                if (assertResult == null) {
                    System.Console.WriteLine(System.String.format("Method: {0} in group {1} not return AssertResult!", this.Method.n, this.Group));
                    return;
                }

                this.Time(watch.milliseconds());
                this.EasyAssertions(assertResult.Asserts.toArray());
                this.Success(System.Linq.Enumerable.from(this.EasyAssertions()).all(function (a) {
                            return a.Success;
                        }));
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Prova", {
        inherits: [Bridge.EasyTests.TestBase],
        methods: {
            Eccolo: function () {
                return this.Result.WithAssert(function () {
                    return true;
                }, "buono");
            },
            TeNo: function () {
                Bridge.sleep(1000);
                return this.Result.WithAssert(function () {
                    return false;
                }, "Male").WithAssert(function () {
                    return true;
                }, "secondo invece bene");
            }
        }
    });

    Bridge.define("Bridge.EasyTests.TestoTyutto", {
        inherits: [Bridge.EasyTests.TestBase],
        methods: {
            TestSum: function () {
                var soma = 7;

                return this.Result.WithAssert(function () {
                    return soma === 7;
                }, "TestSum").WithAssert(function () {
                    return soma % 2 !== 0;
                }, "Sette è dispari");
            },
            TestSum1: function () {
                var soma = 7;

                return this.Result.WithAssert(function () {
                    return soma === 7;
                }, "TestSum").WithAssert(function () {
                    return soma % 2 !== 0;
                }, "Sette è dispari");
            },
            TestSum2: function () {
                var soma = 7;

                return this.Result.WithAssert(function () {
                    return soma === 7;
                }, "TestSum").WithAssert(function () {
                    return soma % 2 !== 0;
                }, "Sette è dispari");
            },
            TestSum3: function () {
                var soma = 7;

                return this.Result.WithAssert(function () {
                    return soma === 7;
                }, "TestSum").WithAssert(function () {
                    return soma % 2 !== 0;
                }, "Sette è dispari");
            },
            TestSum4: function () {
                var soma = 7;

                return this.Result.WithAssert(function () {
                    return soma === 7;
                }, "TestSum").WithAssert(function () {
                    return soma % 2 !== 0;
                }, "Sette è dispari");
            },
            TestSum5: function () {
                var soma = 7;

                return this.Result.WithAssert(function () {
                    return soma === 7;
                }, "TestSum").WithAssert(function () {
                    return soma % 2 !== 0;
                }, "Sette è dispari");
            },
            TestSum6: function () {
                var soma = 7;

                return this.Result.WithAssert(function () {
                    return soma === 7;
                }, "TestSum").WithAssert(function () {
                    return soma % 2 !== 0;
                }, "Sette è dispari");
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuRWFzeVRlc3RzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJFYXN5QXNzZXJ0LmNzIiwiQXR0cmlidXRlcy9UZXN0QXR0cmlidXRlLmNzIiwiQXR0cmlidXRlcy9UZXN0TWV0aG9kQXR0cmlidXRlLmNzIiwiVGVzdEJhc2UuY3MiLCJSdW5uZXIuY3MiLCJUZXN0RGVzY3JpcHRvci5jcyIsIlByb3ZhLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztZQVFZQSxhQUFhQSxJQUFJQTtZQUNqQkEsaUJBQTBCQTtZQUMxQkE7Ozs7Ozs7Ozt3QkNXbUNBLE9BQU9BLElBQUlBOzs7Ozs7Ozs7OztnQkFIOUNBLGVBQWVBLEtBQUlBOzs7O2tDQUtRQSxRQUFtQkE7O2dCQUU5Q0EsaUJBQWlCQSxVQUFJQSxnREFFSEEsMEJBQ0pBO2dCQUVkQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkNaVUE7OztnQkFFakJBLG1CQUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQ1JTQTs7Ozs7Z0JBRXZCQSxtQkFBY0E7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDVnFCQSxPQUFPQTs7Ozs7b0JBRVhBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQ2N0Q0EsYUFBYUE7Z0JBQ2JBLHVCQUF1QkE7Z0JBQ3ZCQSxxQkFBcUJBO2dCQUNyQkEscUJBQXFCQTtnQkFDckJBLGlCQUFpQkE7Z0JBQ2pCQSxlQUFlQTs7Z0JBRWZBLG1CQUFtQkE7Ozs7Ozs7Ozs7Ozs7O2dCQVVuQkE7O2dCQUVBQTs7Z0JBRUFBOztnQkFFQUEscUJBQTBCQSw0QkFBK0dBLHlCQUFrQkEsQUFBb0pBO21DQUFJQTs7O2dCQUVuVEEsbUJBQXdCQSw0QkFBK0dBLHlCQUFrQkEsQUFBb0pBO21DQUFJQTtpQ0FBaUNBLEFBQWlFQTsrQkFBR0EsQ0FBQ0E7O2dCQUN2WkEsbUJBQXdCQSw0QkFBK0dBLHlCQUFrQkEsQUFBb0pBO21DQUFJQTtpQ0FBaUNBLEFBQWlFQTsrQkFBR0E7O2dCQUN0WkEsZUFBb0JBLDRCQUFvRUEsa0JBQWtCQSxBQUFvRUE7bUNBQUtBOzs7Z0JBRW5MQTs7Ozs7Ozs7Ozs7O2dCQVFaQSxBQUFvRkEscUJBQWtCQSxBQUFpRUE7d0JBRXZKQTs7Ozs7Ozs7Ozs7OztnQkFTSkEsWUFBWUEsNEJBQTBGQSw2Q0FBd0NBLEFBQStIQTsrQkFBS0E7NkJBQ3ZRQSxBQUFpREE7MkJBQUlBLENBQUNBLG9DQUFpQkEsbUNBQU9BLDJCQUEyQkEsTUFBTUEsQ0FBQ0E7Ozs7Z0JBSTNIQSxjQUFjQSxBQUE2Q0E7b0JBRXZEQSxlQUFlQSxzQkFBeUJBO29CQUN4Q0EsZ0JBQWdCQSxZQUFXQTs7b0JBRTNCQSxrQkFBa0JBLDRCQUFtRUEsOENBQWVBLEFBQWtFQTttQ0FBS0E7aUNBQ2hLQSxBQUFrRUE7K0JBQUtBLDRCQUFtQ0Esd0NBQXNCQSxBQUFPQTs7O29CQUVsSkEsb0JBQW9CQSxBQUE4REE7O3dCQUU5RUEsZ0JBQWdCQSxVQUFJQSxpREFFTEEsc0JBQ0ZBLG1CQUNEQSw0QkFBcUJBLHlCQUF5QkEsMERBQTBCQTs7d0JBR3BGQSxnQkFBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNoRkpBLE9BQU9BOzs7Ozs7O2dCQVkzQkEsc0JBQXNCQTtnQkFDdEJBLGVBQWVBO2dCQUNmQSxZQUFZQTs7Ozs7Z0JBS1pBLFlBQVlBLElBQUlBO2dCQUNoQkE7Z0JBQ0FBLG1CQUFtQkEsK0NBQW1CQTtnQkFDdENBOztnQkFFQUEsSUFBSUEsZ0JBQWdCQTtvQkFFaEJBLHlCQUFrQkEsMEVBQWtFQSxlQUFpQkE7b0JBQ3JHQTs7O2dCQUdKQSxVQUFlQSxBQUFLQTtnQkFDcEJBLG9CQUF5QkE7Z0JBQ3pCQSxhQUFrQkEsNEJBQWdFQSwyQkFBMkJBLEFBQWlFQTttQ0FBR0E7Ozs7Ozs7Ozs7Z0JDaENqTEEsT0FBT0EsdUJBQXVCQSxBQUE0QkE7Ozs7O2dCQU8xREE7Z0JBQ0FBLE9BQU9BLHVCQUNTQSxBQUE0QkE7O3NDQUM1QkEsQUFBNEJBOzs7Ozs7Ozs7OztnQkFZNUNBLFdBQVdBOztnQkFFWEEsT0FBT0EsdUJBQ1NBLEFBQTRCQTsyQkFBTUE7eUNBQ2xDQSxBQUE0QkE7MkJBQU1BOzs7O2dCQU1sREEsV0FBV0E7O2dCQUVYQSxPQUFPQSx1QkFDU0EsQUFBNEJBOzJCQUFNQTt5Q0FDbENBLEFBQTRCQTsyQkFBTUE7Ozs7Z0JBS2xEQSxXQUFXQTs7Z0JBRVhBLE9BQU9BLHVCQUNTQSxBQUE0QkE7MkJBQU1BO3lDQUNsQ0EsQUFBNEJBOzJCQUFNQTs7OztnQkFLbERBLFdBQVdBOztnQkFFWEEsT0FBT0EsdUJBQ1NBLEFBQTRCQTsyQkFBTUE7eUNBQ2xDQSxBQUE0QkE7MkJBQU1BOzs7O2dCQUtsREEsV0FBV0E7O2dCQUVYQSxPQUFPQSx1QkFDU0EsQUFBNEJBOzJCQUFNQTt5Q0FDbENBLEFBQTRCQTsyQkFBTUE7Ozs7Z0JBS2xEQSxXQUFXQTs7Z0JBRVhBLE9BQU9BLHVCQUNTQSxBQUE0QkE7MkJBQU1BO3lDQUNsQ0EsQUFBNEJBOzJCQUFNQTs7OztnQkFLbERBLFdBQVdBOztnQkFFWEEsT0FBT0EsdUJBQ1NBLEFBQTRCQTsyQkFBTUE7eUNBQ2xDQSxBQUE0QkE7MkJBQU1BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgcHVibGljIGNsYXNzIEFwcFxuICAgIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcnVubmVyID0gbmV3IFJ1bm5lcigpO1xuICAgICAgICAgICAga25vY2tvdXQua28uYXBwbHlCaW5kaW5ncyhydW5uZXIpO1xuICAgICAgICAgICAgcnVubmVyLlJ1bigpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgcHVibGljIGNsYXNzIEVhc3lBc3NlcnRcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgYm9vbCBTdWNjZXNzIHsgZ2V0OyBzZXQ7IH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xhc3MgQXNzZXJ0UmVzdWx0XG4gICAge1xuICAgICAgICBwdWJsaWMgIExpc3Q8RWFzeUFzc2VydD4gQXNzZXJ0cyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwcml2YXRlIEFzc2VydFJlc3VsdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXNzZXJ0cyA9IG5ldyBMaXN0PEVhc3lBc3NlcnQ+KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQXNzZXJ0UmVzdWx0IFJlc3VsdCB7Z2V0e3JldHVybiBuZXcgQXNzZXJ0UmVzdWx0KCk7fX1cblxuICAgICAgICBwdWJsaWMgQXNzZXJ0UmVzdWx0IFdpdGhBc3NlcnQoRnVuYzxib29sPiBhc3NlcnQsIHN0cmluZyBkZXNjcmlwdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5Bc3NlcnRzLkFkZChuZXcgRWFzeUFzc2VydFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgU3VjY2VzcyA9IGFzc2VydCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlc1xue1xuICAgIFxuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gQXR0cmlidXRlIGZvciB0ZXN0IGNsYXNzXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBbU3lzdGVtLkF0dHJpYnV0ZVVzYWdlKFN5c3RlbS5BdHRyaWJ1dGVUYXJnZXRzLkNsYXNzKV0gXG4gICAgcHVibGljIGNsYXNzIFRlc3RBdHRyaWJ1dGUgOiBBdHRyaWJ1dGVcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRlc3RBdHRyaWJ1dGUoKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUZXN0QXR0cmlidXRlKHN0cmluZyBkZXNjcmlwdGlvbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzXG57XG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBdHRyaWJ1dGUgZm9yIHRlc3QgTWV0aG9kXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBbU3lzdGVtLkF0dHJpYnV0ZVVzYWdlKFN5c3RlbS5BdHRyaWJ1dGVUYXJnZXRzLk1ldGhvZCldIFxuICAgIHB1YmxpYyBjbGFzcyBUZXN0TWV0aG9kQXR0cmlidXRlIDogQXR0cmlidXRlXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBUZXN0TWV0aG9kQXR0cmlidXRlKHN0cmluZyBkZXNjcmlwdGlvbiA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGVzdEJhc2VcbiAgICB7XG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHN0cmluZyBEZXNjcmlwdGlvbiB7Z2V0e3JldHVybiB0aGlzLkdldFR5cGUoKS5OYW1lO319XG5cbiAgICAgICAgcHJvdGVjdGVkIEFzc2VydFJlc3VsdCBSZXN1bHQge2dldHtyZXR1cm4gQXNzZXJ0UmVzdWx0LlJlc3VsdDt9fVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBpbnRlcm5hbCBjbGFzcyBSdW5uZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQnJvd3NlckluZm8geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPlRlc3RzO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5Ub3RhbEFzc2VydGlvbnM7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkZhaWxlZEFzc2VydHM7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PlBhc3NlZEFzc2VydHM7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PlRvdGFsVGltZTtcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPlJ1bm5pbmc7XG5cblxuICAgICAgICBwdWJsaWMgUnVubmVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5UZXN0cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8VGVzdERlc2NyaXB0b3I+KCk7XG4gICAgICAgICAgICB0aGlzLlRvdGFsQXNzZXJ0aW9ucyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuRmFpbGVkQXNzZXJ0cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuUGFzc2VkQXNzZXJ0cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuVG90YWxUaW1lID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigpO1xuICAgICAgICAgICAgdGhpcy5SdW5uaW5nID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcblxuICAgICAgICAgICAgdGhpcy5Ccm93c2VySW5mbyA9IEdsb2JhbC5OYXZpZ2F0b3IuQXBwVmVyc2lvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biB0ZXN0c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLlJ1bm5pbmcuU2VsZih0cnVlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5EaXNjb3ZlclRlc3QoKTsgLy8gZGlzY292ZXJ5IGFsbCB0ZXN0c1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLlJ1blRlc3RzKCk7IC8vIHJ1biBhbGwgdGVzdCBmb3IgZWFjaCBncm91cFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLlRvdGFsQXNzZXJ0aW9ucy5TZWxmKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0TWFueTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsZ2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLkVhc3lBc3NlcnQ+KHRoaXMuVGVzdHMuU2VsZigpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuRWFzeUFzc2VydD4+KShzbT0+c20uRWFzeUFzc2VydGlvbnMuU2VsZigpKSkuQ291bnQoKSk7IC8vIHRvdGFsIHRlc3RzIGZvdW5kXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuRmFpbGVkQXNzZXJ0cy5TZWxmKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0TWFueTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsZ2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLkVhc3lBc3NlcnQ+KHRoaXMuVGVzdHMuU2VsZigpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuRWFzeUFzc2VydD4+KShzbT0+c20uRWFzeUFzc2VydGlvbnMuU2VsZigpKSkuQ291bnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLkVhc3lBc3NlcnQsIGJvb2w+KShjPT4hYy5TdWNjZXNzKSkpOyAvLyBmYWlsZWQgYXNzZXJ0aW9uIHRlc3RzIGZvdW5kXG4gICAgICAgICAgICB0aGlzLlBhc3NlZEFzc2VydHMuU2VsZihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5FYXN5QXNzZXJ0Pih0aGlzLlRlc3RzLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLkVhc3lBc3NlcnQ+Pikoc209PnNtLkVhc3lBc3NlcnRpb25zLlNlbGYoKSkpLkNvdW50KChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5FYXN5QXNzZXJ0LCBib29sPikoYz0+Yy5TdWNjZXNzKSkpOyAvLyBmYWlsZWQgYXNzZXJ0aW9uIHRlc3RzIGZvdW5kXG4gICAgICAgICAgICB0aGlzLlRvdGFsVGltZS5TZWxmKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU3VtPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4odGhpcy5UZXN0cy5TZWxmKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBpbnQ+KShzID0+IHMuVGltZS5TZWxmKCkpKSk7XG5cbiAgICAgICAgICAgIHRoaXMuUnVubmluZy5TZWxmKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biBcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJ1blRlc3RzKClcbiAgICAgICAge1xuU3lzdGVtLkFycmF5RXh0ZW5zaW9ucy5Gb3JFYWNoPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4oICAgICAgICAgICAgdGhpcy5UZXN0cy5TZWxmKCksKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KShmID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZi5SdW5UZXN0KCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBEaXNjb3ZlcnkgYWxsIHRlc3RzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBEaXNjb3ZlclRlc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSxnbG9iYWw6OlN5c3RlbS5UeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OlN5c3RlbS5UeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHc9PiAhdy5Jc0ludGVyZmFjZSAmJiB0eXBlb2YoVGVzdEJhc2UpLklzQXNzaWduYWJsZUZyb20odykgJiYgIXcuSXNBYnN0cmFjdCkpXG4gICAgICAgICAgICAgICAgLlRvTGlzdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBydW4gYWxsIHRlc3RzIG1ldGhvZFxuICAgICAgICAgICAgdHlwZXMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlR5cGU+KShmID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gQWN0aXZhdG9yLkNyZWF0ZUluc3RhbmNlKGYpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXN0Q2xhc3MgPSAoVGVzdEJhc2UpIGluc3RhbmNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RNZXRob2RzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8+KGYuR2V0TWV0aG9kcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gdy5Jc1B1YmxpYykpXG4gICAgICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8sIGJvb2w+KSh3ID0+IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4ody5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0TWV0aG9kQXR0cmlidXRlKSwgdHJ1ZSkpKSkuVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGVzdE1ldGhvZHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4pKG1ldGhvZCA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3REZXNjciA9IG5ldyBUZXN0RGVzY3JpcHRvclxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbnN0YW5jZSA9IGluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWV0aG9kID0gbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgR3JvdXAgPSBzdHJpbmcuSXNOdWxsT3JFbXB0eSh0ZXN0Q2xhc3MuRGVzY3JpcHRpb24pID8gaW5zdGFuY2UuR2V0VHlwZSgpLk5hbWUgOiB0ZXN0Q2xhc3MuRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGVzdHMucHVzaCh0ZXN0RGVzY3IpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIGludGVybmFsIGNsYXNzIFRlc3REZXNjcmlwdG9yXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUge2dldHtyZXR1cm4gdGhpcy5NZXRob2QuTmFtZTt9fVxuICAgICAgICBwdWJsaWMgTWV0aG9kSW5mbyBNZXRob2QgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgb2JqZWN0IEluc3RhbmNlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIHN0cmluZyBHcm91cCB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLkVhc3lBc3NlcnQ+RWFzeUFzc2VydGlvbnMgeyBnZXQ7ICBwcml2YXRlIHNldDsgIH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPlN1Y2Nlc3MgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5UaW1lIHsgZ2V0OyBzZXQ7IH1cblxuXG4gICAgICAgIHB1YmxpYyBUZXN0RGVzY3JpcHRvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuRWFzeUFzc2VydGlvbnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPEVhc3lBc3NlcnQ+KCk7XG4gICAgICAgICAgICB0aGlzLlN1Y2Nlc3MgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPihmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KDApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdm9pZCBSdW5UZXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHdhdGNoID0gbmV3IFN0b3B3YXRjaCgpO1xuICAgICAgICAgICAgd2F0Y2guU3RhcnQoKTtcbiAgICAgICAgICAgIHZhciBhc3NlcnRSZXN1bHQgPSB0aGlzLk1ldGhvZC5JbnZva2UodGhpcy5JbnN0YW5jZSkgYXMgQXNzZXJ0UmVzdWx0O1xuICAgICAgICAgICAgd2F0Y2guU3RvcCgpO1xuXG4gICAgICAgICAgICBpZiAoYXNzZXJ0UmVzdWx0ID09IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoc3RyaW5nLkZvcm1hdChcIk1ldGhvZDogezB9IGluIGdyb3VwIHsxfSBub3QgcmV0dXJuIEFzc2VydFJlc3VsdCFcIix0aGlzLk1ldGhvZC5OYW1lLHRoaXMuR3JvdXApKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuVGltZS5TZWxmKChpbnQpd2F0Y2guRWxhcHNlZE1pbGxpc2Vjb25kcyk7XG4gICAgICAgICAgICB0aGlzLkVhc3lBc3NlcnRpb25zLlNlbGYoYXNzZXJ0UmVzdWx0LkFzc2VydHMuVG9BcnJheSgpKTtcbiAgICAgICAgICAgIHRoaXMuU3VjY2Vzcy5TZWxmKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQWxsPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5FYXN5QXNzZXJ0Pih0aGlzLkVhc3lBc3NlcnRpb25zLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuRWFzeUFzc2VydCwgYm9vbD4pKGE9PmEuU3VjY2VzcykpKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmc7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgcHVibGljIGNsYXNzIFByb3ZhIDogVGVzdEJhc2VcbiAgICB7XG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgQXNzZXJ0UmVzdWx0IEVjY29sbygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlJlc3VsdC5XaXRoQXNzZXJ0KChnbG9iYWw6OlN5c3RlbS5GdW5jPGJvb2w+KSgoKSA9PiB0cnVlKSwgXCJidW9ub1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZF1cbiAgICAgICAgcHVibGljIEFzc2VydFJlc3VsdCBUZU5vKClcbiAgICAgICAge1xuICAgICAgICAgICAgVGhyZWFkLlNsZWVwKDEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUmVzdWx0XG4gICAgICAgICAgICAgICAgLldpdGhBc3NlcnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Ym9vbD4pKCgpID0+IGZhbHNlKSwgXCJNYWxlXCIpXG4gICAgICAgICAgICAgICAgLldpdGhBc3NlcnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Ym9vbD4pKCgpID0+IHRydWUpLCBcInNlY29uZG8gaW52ZWNlIGJlbmVcIik7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgcHVibGljIGNsYXNzIFRlc3RvVHl1dHRvIDogVGVzdEJhc2VcbiAgICB7XG5cbiAgICAgICAgW1Rlc3RNZXRob2RdXG4gICAgICAgIHB1YmxpYyBBc3NlcnRSZXN1bHQgVGVzdFN1bSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzb21hID0gNCArIDM7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLlJlc3VsdFxuICAgICAgICAgICAgICAgIC5XaXRoQXNzZXJ0KChnbG9iYWw6OlN5c3RlbS5GdW5jPGJvb2w+KSgoKSA9PiBzb21hID09IDcpLCBcIlRlc3RTdW1cIilcbiAgICAgICAgICAgICAgICAuV2l0aEFzc2VydCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxib29sPikoKCkgPT4gc29tYSUyICE9IDApLCBcIlNldHRlIMOoIGRpc3BhcmlcIik7XG4gICAgICAgIH1cblxuICAgICAgICBbVGVzdE1ldGhvZF1cbiAgICAgICAgcHVibGljIEFzc2VydFJlc3VsdCBUZXN0U3VtMSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzb21hID0gNCArIDM7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLlJlc3VsdFxuICAgICAgICAgICAgICAgIC5XaXRoQXNzZXJ0KChnbG9iYWw6OlN5c3RlbS5GdW5jPGJvb2w+KSgoKSA9PiBzb21hID09IDcpLCBcIlRlc3RTdW1cIilcbiAgICAgICAgICAgICAgICAuV2l0aEFzc2VydCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxib29sPikoKCkgPT4gc29tYSUyICE9IDApLCBcIlNldHRlIMOoIGRpc3BhcmlcIik7XG4gICAgICAgIH1cbiAgICAgICAgW1Rlc3RNZXRob2RdXG4gICAgICAgIHB1YmxpYyBBc3NlcnRSZXN1bHQgVGVzdFN1bTIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc29tYSA9IDQgKyAzO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5SZXN1bHRcbiAgICAgICAgICAgICAgICAuV2l0aEFzc2VydCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxib29sPikoKCkgPT4gc29tYSA9PSA3KSwgXCJUZXN0U3VtXCIpXG4gICAgICAgICAgICAgICAgLldpdGhBc3NlcnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Ym9vbD4pKCgpID0+IHNvbWElMiAhPSAwKSwgXCJTZXR0ZSDDqCBkaXNwYXJpXCIpO1xuICAgICAgICB9XG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgQXNzZXJ0UmVzdWx0IFRlc3RTdW0zKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHNvbWEgPSA0ICsgMztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUmVzdWx0XG4gICAgICAgICAgICAgICAgLldpdGhBc3NlcnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Ym9vbD4pKCgpID0+IHNvbWEgPT0gNyksIFwiVGVzdFN1bVwiKVxuICAgICAgICAgICAgICAgIC5XaXRoQXNzZXJ0KChnbG9iYWw6OlN5c3RlbS5GdW5jPGJvb2w+KSgoKSA9PiBzb21hJTIgIT0gMCksIFwiU2V0dGUgw6ggZGlzcGFyaVwiKTtcbiAgICAgICAgfVxuICAgICAgICBbVGVzdE1ldGhvZF1cbiAgICAgICAgcHVibGljIEFzc2VydFJlc3VsdCBUZXN0U3VtNCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzb21hID0gNCArIDM7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLlJlc3VsdFxuICAgICAgICAgICAgICAgIC5XaXRoQXNzZXJ0KChnbG9iYWw6OlN5c3RlbS5GdW5jPGJvb2w+KSgoKSA9PiBzb21hID09IDcpLCBcIlRlc3RTdW1cIilcbiAgICAgICAgICAgICAgICAuV2l0aEFzc2VydCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxib29sPikoKCkgPT4gc29tYSUyICE9IDApLCBcIlNldHRlIMOoIGRpc3BhcmlcIik7XG4gICAgICAgIH1cbiAgICAgICAgW1Rlc3RNZXRob2RdXG4gICAgICAgIHB1YmxpYyBBc3NlcnRSZXN1bHQgVGVzdFN1bTUoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc29tYSA9IDQgKyAzO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5SZXN1bHRcbiAgICAgICAgICAgICAgICAuV2l0aEFzc2VydCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxib29sPikoKCkgPT4gc29tYSA9PSA3KSwgXCJUZXN0U3VtXCIpXG4gICAgICAgICAgICAgICAgLldpdGhBc3NlcnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Ym9vbD4pKCgpID0+IHNvbWElMiAhPSAwKSwgXCJTZXR0ZSDDqCBkaXNwYXJpXCIpO1xuICAgICAgICB9XG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgQXNzZXJ0UmVzdWx0IFRlc3RTdW02KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHNvbWEgPSA0ICsgMztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUmVzdWx0XG4gICAgICAgICAgICAgICAgLldpdGhBc3NlcnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Ym9vbD4pKCgpID0+IHNvbWEgPT0gNyksIFwiVGVzdFN1bVwiKVxuICAgICAgICAgICAgICAgIC5XaXRoQXNzZXJ0KChnbG9iYWw6OlN5c3RlbS5GdW5jPGJvb2w+KSgoKSA9PiBzb21hJTIgIT0gMCksIFwiU2V0dGUgw6ggZGlzcGFyaVwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICBcbiAgICAgICAgXG4gICAgfVxufSJdCn0K
