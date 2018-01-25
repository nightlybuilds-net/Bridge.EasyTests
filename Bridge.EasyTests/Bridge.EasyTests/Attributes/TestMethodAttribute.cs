using System;

namespace Bridge.EasyTests.Attributes
{
    /// <summary>
    /// Attribute for test Method
    /// </summary>
    [System.AttributeUsage(System.AttributeTargets.Method)] 
    public class TestMethodAttribute : Attribute
    {
        public string Description { get; }

        public TestMethodAttribute(string description = null)
        {
            Description = description;
        }
    }
}