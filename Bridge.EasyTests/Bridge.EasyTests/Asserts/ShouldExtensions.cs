namespace Bridge.EasyTests.Asserts
{
    public static class ShouldExtensions
    {
        /// <summary>
        /// Test equals
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="secondObj"></param>
        public static T ShouldBeEquals<T>(this T obj, T secondObj)
        {
            var equal = EasyAsserts.ObjectEqual(obj, secondObj);

            if (!equal)
                throw new ShouldException(string.Format($"Expected {secondObj.ToCompareString()}. Value: {obj.ToCompareString()}"));
            
            return obj;
        }
        
        /// <summary>
        /// Test not equals
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="secondObj"></param>
        public static T ShouldBeNotEquals<T>(this T obj, T secondObj)
        {
            var equal = EasyAsserts.ObjectEqual(obj, secondObj);

            if (equal)
                throw new ShouldException(string.Format($"Expected {secondObj.ToCompareString()} different from {obj.ToCompareString()}. Are Equal!"));
            
            return obj;
        }



       
        
        

       
       
    }
}