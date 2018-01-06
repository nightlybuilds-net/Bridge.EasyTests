using System;
using System.Collections.Generic;
using System.Linq;
using Bridge.EasyTests.Attributes;
using Bridge.Html5;
using static Retyped.knockout;

namespace Bridge.EasyTests
{
    internal class Runner
    {
        private List<TestDescriptor> _internalTests = new List<TestDescriptor>();
        
        public string BrowserInfo { get; set; }
        public KnockoutObservableArray<TestDescriptor> Tests;
        public KnockoutObservable<int> TotalTests;
        public KnockoutObservable<int> FailedTests;
        public KnockoutObservable<int> PassedTests;
        public KnockoutObservable<int> TotalTime;
        public KnockoutObservable<bool> Running;
        
        public KnockoutObservable<bool> HidePassed;


        public Runner()
        {
            this.Tests = ko.observableArray.Self<TestDescriptor>();
            this.TotalTests = ko.observable.Self<int>();
            this.FailedTests = ko.observable.Self<int>();
            this.PassedTests = ko.observable.Self<int>();
            this.TotalTime = ko.observable.Self<int>();
            this.Running = ko.observable.Self<bool>();
            
            this.BrowserInfo = Global.Navigator.AppVersion;

            // hide passed test management
            this.HidePassed = ko.observable.Self<bool>(false);
            this.HidePassed.subscribe(value =>
            {
                this.Tests.Self().Where(w=>w.Success).ForEach(f=>f.Visible.Self(!value));
            });
        }

        
        
        
        

        /// <summary>
        /// Run tests
        /// </summary>
        public void Run()
        {
            this.Running.Self(true);
            
            this.DiscoverTest(); // discovery all tests
            
            this.TotalTests.Self(this._internalTests.Count); // total tests found
            this.RunTests(); // run all test for each group

            this.FailedTests.Self(this._internalTests.Count(c=>!c.Success)); // failed tests
            this.PassedTests.Self(this._internalTests.Count(c=>c.Success)); // passed Tests
            this.TotalTime.Self(this.Tests.Self().Sum(s => s.Time));

            this.Running.Self(false);
        }

        /// <summary>
        /// Run 
        /// </summary>
        private void RunTests()
        {
            this._internalTests.ForEach(f =>
            {
                f.RunTest();
                this.Tests.push(f);
            });
        }

        /// <summary>
        /// Discovery all tests
        /// </summary>
        private void DiscoverTest()
        {
            var types = AppDomain.CurrentDomain.GetAssemblies().SelectMany(s => s.GetTypes())
                .Where(w=>!w.FullName.ToLower().StartsWith("system"))
                .Where(w=>!w.IsInterface && !w.IsAbstract)
                .Where(w=>w.GetCustomAttributes(typeof(TestAttribute),true).Any())
                .ToList();
            
            // run all tests method
            types.ForEach(f =>
            {
                var testAtt = (TestAttribute)f.GetCustomAttributes(typeof(TestAttribute), true).First();
                

                var testMethods = f.GetMethods().Where(w => w.IsPublic)
                    .Where(w => w.GetCustomAttributes(typeof(TestMethodAttribute), true).Any()).ToList();
                
                testMethods.ForEach(method =>
                {
                    var attr = (TestMethodAttribute) method.GetCustomAttributes(typeof(TestMethodAttribute), true).First();
                    
                    var testDescr = new TestDescriptor
                    {
                        Type = f,
                        Method = method,
                        Group = string.IsNullOrEmpty(testAtt.Description) ? f.Name : testAtt.Description,
                        Name = string.IsNullOrEmpty(attr.Description) ? method.Name : attr.Description
                    };
                    
                    this._internalTests.Add(testDescr);
                });

            });
        }

       
    }
}