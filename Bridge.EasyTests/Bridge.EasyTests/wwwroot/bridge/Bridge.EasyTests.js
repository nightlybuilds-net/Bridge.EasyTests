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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuRWFzeVRlc3RzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBc3NlcnRSZXN1bHQuY3MiLCJBdHRyaWJ1dGVzL1Rlc3RBdHRyaWJ1dGUuY3MiLCJBdHRyaWJ1dGVzL1Rlc3RNZXRob2RBdHRyaWJ1dGUuY3MiLCJSdW5uZXIuY3MiLCJUZXN0QmFzZS5jcyIsIlRlc3REZXNjcmlwdG9yLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztZQVFZQSxhQUFhQSxJQUFJQTtZQUNqQkEsaUJBQTBCQTtZQUMxQkE7Ozs7Ozs7Ozt3QkNJbUNBLE9BQU9BLElBQUlBOzs7Ozs7Ozs7OztnQkFIOUNBLGVBQWVBLEtBQUlBOzs7O2tDQUtRQSxRQUFtQkE7O2dCQUU5Q0EsaUJBQWlCQSxVQUFJQSxnREFFSEEsMEJBQ0pBO2dCQUVkQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkNMVUE7OztnQkFFakJBLG1CQUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQ1JTQTs7Ozs7Z0JBRXZCQSxtQkFBY0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JDTWRBLGFBQWFBO2dCQUNiQSx1QkFBdUJBO2dCQUN2QkEscUJBQXFCQTtnQkFDckJBLHFCQUFxQkE7Z0JBQ3JCQSxpQkFBaUJBO2dCQUNqQkEsZUFBZUE7O2dCQUVmQSxtQkFBbUJBOzs7Ozs7Ozs7Ozs7OztnQkFVbkJBOztnQkFFQUE7O2dCQUVBQTs7Z0JBRUFBLHFCQUEwQkEsNEJBQStHQSx5QkFBa0JBLEFBQW9KQTttQ0FBSUE7OztnQkFFblRBLG1CQUF3QkEsNEJBQStHQSx5QkFBa0JBLEFBQW9KQTttQ0FBSUE7aUNBQWlDQSxBQUFpRUE7K0JBQUdBLENBQUNBOztnQkFDdlpBLG1CQUF3QkEsNEJBQStHQSx5QkFBa0JBLEFBQW9KQTttQ0FBSUE7aUNBQWlDQSxBQUFpRUE7K0JBQUdBOztnQkFDdFpBLGVBQW9CQSw0QkFBb0VBLGtCQUFrQkEsQUFBb0VBO21DQUFLQTs7O2dCQUVuTEE7Ozs7Ozs7Ozs7OztnQkFRWkEsQUFBb0ZBLHFCQUFrQkEsQUFBaUVBO3dCQUV2SkE7Ozs7Ozs7Ozs7Ozs7Z0JBU0pBLFlBQVlBLDRCQUEwRkEsNkNBQXdDQSxBQUErSEE7K0JBQUtBOzZCQUN2UUEsQUFBaURBOzJCQUFJQSxDQUFDQSxvQ0FBaUJBLG1DQUFPQSwyQkFBMkJBLE1BQU1BLENBQUNBOzs7O2dCQUkzSEEsY0FBY0EsQUFBNkNBO29CQUV2REEsZUFBZUEsc0JBQXlCQTtvQkFDeENBLGdCQUFnQkEsWUFBV0E7O29CQUUzQkEsa0JBQWtCQSw0QkFBbUVBLDhDQUFlQSxBQUFrRUE7bUNBQUtBO2lDQUNoS0EsQUFBa0VBOytCQUFLQSw0QkFBbUNBLHdDQUFzQkEsQUFBT0E7OztvQkFFbEpBLG9CQUFvQkEsQUFBOERBOzt3QkFFOUVBLGdCQUFnQkEsVUFBSUEsaURBRUxBLHNCQUNGQSxtQkFDREEsNEJBQXFCQSx5QkFBeUJBLDBEQUEwQkE7O3dCQUdwRkEsZ0JBQWdCQTs7Ozs7Ozs7Ozs7O29CQ3RGV0EsT0FBT0E7Ozs7O29CQUVYQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ0lsQkEsT0FBT0E7Ozs7Ozs7Z0JBWTNCQSxzQkFBc0JBO2dCQUN0QkEsZUFBZUE7Z0JBQ2ZBLFlBQVlBOzs7OztnQkFLWkEsWUFBWUEsSUFBSUE7Z0JBQ2hCQTtnQkFDQUEsbUJBQW1CQSwrQ0FBbUJBO2dCQUN0Q0E7O2dCQUVBQSxJQUFJQSxnQkFBZ0JBO29CQUVoQkEseUJBQWtCQSwwRUFBa0VBLGVBQWlCQTtvQkFDckdBOzs7Z0JBR0pBLFVBQWVBLEFBQUtBO2dCQUNwQkEsb0JBQXlCQTtnQkFDekJBLGFBQWtCQSw0QkFBZ0VBLDJCQUEyQkEsQUFBaUVBO21DQUFHQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBSZXR5cGVkO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIHB1YmxpYyBjbGFzcyBBcHBcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJ1bm5lciA9IG5ldyBSdW5uZXIoKTtcbiAgICAgICAgICAgIGtub2Nrb3V0LmtvLmFwcGx5QmluZGluZ3MocnVubmVyKTtcbiAgICAgICAgICAgIHJ1bm5lci5SdW4oKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBwdWJsaWMgY2xhc3MgQXNzZXJ0UmVzdWx0XG4gICAge1xuICAgICAgICBwdWJsaWMgIExpc3Q8RWFzeUFzc2VydD4gQXNzZXJ0cyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwcml2YXRlIEFzc2VydFJlc3VsdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXNzZXJ0cyA9IG5ldyBMaXN0PEVhc3lBc3NlcnQ+KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQXNzZXJ0UmVzdWx0IFJlc3VsdCB7Z2V0e3JldHVybiBuZXcgQXNzZXJ0UmVzdWx0KCk7fX1cblxuICAgICAgICBwdWJsaWMgQXNzZXJ0UmVzdWx0IFdpdGhBc3NlcnQoRnVuYzxib29sPiBhc3NlcnQsIHN0cmluZyBkZXNjcmlwdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5Bc3NlcnRzLkFkZChuZXcgRWFzeUFzc2VydFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgU3VjY2VzcyA9IGFzc2VydCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlc1xue1xuICAgIFxuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gQXR0cmlidXRlIGZvciB0ZXN0IGNsYXNzXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBbU3lzdGVtLkF0dHJpYnV0ZVVzYWdlKFN5c3RlbS5BdHRyaWJ1dGVUYXJnZXRzLkNsYXNzKV0gXG4gICAgcHVibGljIGNsYXNzIFRlc3RBdHRyaWJ1dGUgOiBBdHRyaWJ1dGVcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRlc3RBdHRyaWJ1dGUoKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUZXN0QXR0cmlidXRlKHN0cmluZyBkZXNjcmlwdGlvbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzXG57XG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBdHRyaWJ1dGUgZm9yIHRlc3QgTWV0aG9kXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBbU3lzdGVtLkF0dHJpYnV0ZVVzYWdlKFN5c3RlbS5BdHRyaWJ1dGVUYXJnZXRzLk1ldGhvZCldIFxuICAgIHB1YmxpYyBjbGFzcyBUZXN0TWV0aG9kQXR0cmlidXRlIDogQXR0cmlidXRlXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBUZXN0TWV0aG9kQXR0cmlidXRlKHN0cmluZyBkZXNjcmlwdGlvbiA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgUnVubmVyXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RyaW5nIEJyb3dzZXJJbmZvIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj5UZXN0cztcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+VG90YWxBc3NlcnRpb25zO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5GYWlsZWRBc3NlcnRzO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5QYXNzZWRBc3NlcnRzO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5Ub3RhbFRpbWU7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5SdW5uaW5nO1xuXG5cbiAgICAgICAgcHVibGljIFJ1bm5lcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuVGVzdHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPFRlc3REZXNjcmlwdG9yPigpO1xuICAgICAgICAgICAgdGhpcy5Ub3RhbEFzc2VydGlvbnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLkZhaWxlZEFzc2VydHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLlBhc3NlZEFzc2VydHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLlRvdGFsVGltZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuUnVubmluZyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG5cbiAgICAgICAgICAgIHRoaXMuQnJvd3NlckluZm8gPSBHbG9iYWwuTmF2aWdhdG9yLkFwcFZlcnNpb247XG4gICAgICAgIH1cblxuICAgICAgICBcblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gdGVzdHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5SdW5uaW5nLlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuRGlzY292ZXJUZXN0KCk7IC8vIGRpc2NvdmVyeSBhbGwgdGVzdHNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5SdW5UZXN0cygpOyAvLyBydW4gYWxsIHRlc3QgZm9yIGVhY2ggZ3JvdXBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5Ub3RhbEFzc2VydGlvbnMuU2VsZihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5FYXN5QXNzZXJ0Pih0aGlzLlRlc3RzLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLkVhc3lBc3NlcnQ+Pikoc209PnNtLkVhc3lBc3NlcnRpb25zLlNlbGYoKSkpLkNvdW50KCkpOyAvLyB0b3RhbCB0ZXN0cyBmb3VuZFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLkZhaWxlZEFzc2VydHMuU2VsZihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5FYXN5QXNzZXJ0Pih0aGlzLlRlc3RzLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLkVhc3lBc3NlcnQ+Pikoc209PnNtLkVhc3lBc3NlcnRpb25zLlNlbGYoKSkpLkNvdW50KChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5FYXN5QXNzZXJ0LCBib29sPikoYz0+IWMuU3VjY2VzcykpKTsgLy8gZmFpbGVkIGFzc2VydGlvbiB0ZXN0cyBmb3VuZFxuICAgICAgICAgICAgdGhpcy5QYXNzZWRBc3NlcnRzLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3RNYW55PGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcixnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuRWFzeUFzc2VydD4odGhpcy5UZXN0cy5TZWxmKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLklFbnVtZXJhYmxlPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5FYXN5QXNzZXJ0Pj4pKHNtPT5zbS5FYXN5QXNzZXJ0aW9ucy5TZWxmKCkpKS5Db3VudCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuRWFzeUFzc2VydCwgYm9vbD4pKGM9PmMuU3VjY2VzcykpKTsgLy8gZmFpbGVkIGFzc2VydGlvbiB0ZXN0cyBmb3VuZFxuICAgICAgICAgICAgdGhpcy5Ub3RhbFRpbWUuU2VsZihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlN1bTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuVGVzdHMuU2VsZigpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgaW50PikocyA9PiBzLlRpbWUuU2VsZigpKSkpO1xuXG4gICAgICAgICAgICB0aGlzLlJ1bm5pbmcuU2VsZihmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBSdW5UZXN0cygpXG4gICAgICAgIHtcblN5c3RlbS5BcnJheUV4dGVuc2lvbnMuRm9yRWFjaDxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KCAgICAgICAgICAgIHRoaXMuVGVzdHMuU2VsZigpLChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPikoZiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGYuUnVuVGVzdCgpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRGlzY292ZXJ5IGFsbCB0ZXN0c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwcml2YXRlIHZvaWQgRGlzY292ZXJUZXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHR5cGVzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3RNYW55PGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uQXNzZW1ibHksZ2xvYmFsOjpTeXN0ZW0uVHlwZT4oQXBwRG9tYWluLkN1cnJlbnREb21haW4uR2V0QXNzZW1ibGllcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uQXNzZW1ibHksIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8Z2xvYmFsOjpTeXN0ZW0uVHlwZT4+KShzID0+IHMuR2V0VHlwZXMoKSkpXG4gICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR5cGUsIGJvb2w+KSh3PT4gIXcuSXNJbnRlcmZhY2UgJiYgdHlwZW9mKFRlc3RCYXNlKS5Jc0Fzc2lnbmFibGVGcm9tKHcpICYmICF3LklzQWJzdHJhY3QpKVxuICAgICAgICAgICAgICAgIC5Ub0xpc3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcnVuIGFsbCB0ZXN0cyBtZXRob2RcbiAgICAgICAgICAgIHR5cGVzLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlN5c3RlbS5UeXBlPikoZiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZShmKTtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdENsYXNzID0gKFRlc3RCYXNlKSBpbnN0YW5jZTtcblxuICAgICAgICAgICAgICAgIHZhciB0ZXN0TWV0aG9kcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvPihmLkdldE1ldGhvZHMoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8sIGJvb2w+KSh3ID0+IHcuSXNQdWJsaWMpKVxuICAgICAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvLCBib29sPikodyA9PiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxvYmplY3Q+KHcuR2V0Q3VzdG9tQXR0cmlidXRlcyh0eXBlb2YoVGVzdE1ldGhvZEF0dHJpYnV0ZSksIHRydWUpKSkpLlRvTGlzdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRlc3RNZXRob2RzLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8+KShtZXRob2QgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0RGVzY3IgPSBuZXcgVGVzdERlc2NyaXB0b3JcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5zdGFuY2UgPSBpbnN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1ldGhvZCA9IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEdyb3VwID0gc3RyaW5nLklzTnVsbE9yRW1wdHkodGVzdENsYXNzLkRlc2NyaXB0aW9uKSA/IGluc3RhbmNlLkdldFR5cGUoKS5OYW1lIDogdGVzdENsYXNzLkRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRlc3RzLnB1c2godGVzdERlc2NyKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgXG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRlc3RCYXNlXG4gICAge1xuICAgICAgICBwdWJsaWMgdmlydHVhbCBzdHJpbmcgRGVzY3JpcHRpb24ge2dldHtyZXR1cm4gdGhpcy5HZXRUeXBlKCkuTmFtZTt9fVxuXG4gICAgICAgIHByb3RlY3RlZCBBc3NlcnRSZXN1bHQgUmVzdWx0IHtnZXR7cmV0dXJuIEFzc2VydFJlc3VsdC5SZXN1bHQ7fX1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIGludGVybmFsIGNsYXNzIFRlc3REZXNjcmlwdG9yXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUge2dldHtyZXR1cm4gdGhpcy5NZXRob2QuTmFtZTt9fVxuICAgICAgICBwdWJsaWMgTWV0aG9kSW5mbyBNZXRob2QgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgb2JqZWN0IEluc3RhbmNlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIHN0cmluZyBHcm91cCB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLkVhc3lBc3NlcnQ+RWFzeUFzc2VydGlvbnMgeyBnZXQ7ICBwcml2YXRlIHNldDsgIH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPlN1Y2Nlc3MgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5UaW1lIHsgZ2V0OyBzZXQ7IH1cblxuXG4gICAgICAgIHB1YmxpYyBUZXN0RGVzY3JpcHRvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuRWFzeUFzc2VydGlvbnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPEVhc3lBc3NlcnQ+KCk7XG4gICAgICAgICAgICB0aGlzLlN1Y2Nlc3MgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPihmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KDApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdm9pZCBSdW5UZXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHdhdGNoID0gbmV3IFN0b3B3YXRjaCgpO1xuICAgICAgICAgICAgd2F0Y2guU3RhcnQoKTtcbiAgICAgICAgICAgIHZhciBhc3NlcnRSZXN1bHQgPSB0aGlzLk1ldGhvZC5JbnZva2UodGhpcy5JbnN0YW5jZSkgYXMgQXNzZXJ0UmVzdWx0O1xuICAgICAgICAgICAgd2F0Y2guU3RvcCgpO1xuXG4gICAgICAgICAgICBpZiAoYXNzZXJ0UmVzdWx0ID09IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoc3RyaW5nLkZvcm1hdChcIk1ldGhvZDogezB9IGluIGdyb3VwIHsxfSBub3QgcmV0dXJuIEFzc2VydFJlc3VsdCFcIix0aGlzLk1ldGhvZC5OYW1lLHRoaXMuR3JvdXApKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuVGltZS5TZWxmKChpbnQpd2F0Y2guRWxhcHNlZE1pbGxpc2Vjb25kcyk7XG4gICAgICAgICAgICB0aGlzLkVhc3lBc3NlcnRpb25zLlNlbGYoYXNzZXJ0UmVzdWx0LkFzc2VydHMuVG9BcnJheSgpKTtcbiAgICAgICAgICAgIHRoaXMuU3VjY2Vzcy5TZWxmKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQWxsPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5FYXN5QXNzZXJ0Pih0aGlzLkVhc3lBc3NlcnRpb25zLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuRWFzeUFzc2VydCwgYm9vbD4pKGE9PmEuU3VjY2VzcykpKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSJdCn0K
