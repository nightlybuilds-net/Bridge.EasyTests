using System;

namespace Bridge.EasyTests.Asserts
{
    public static class EasyAsserts
    {
        /// <summary>
        /// Assert that action must throw a specific exception
        /// </summary>
        /// <param name="action"></param>
        /// <typeparam name="T"></typeparam>
        /// <exception cref="ShouldException"></exception>
        public static void Throws<T>(Action action) where T : Exception
        {
            try
            {
                action();
                throw new ShouldException($"Expected Exception: {typeof(T).Name}. No Excpetion Throwed!");
            }
            catch (T expected)
            {
                // ok
            }
            catch (Exception e)
            {
                throw new ShouldException($"Exception of type: {e.GetType().Name} instead of Expected Exception: {typeof(T).Name}");
            }
        }


        /// <summary>
        /// Assert that two object are equal
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="second"></param>
        public static void AreEqual(object obj, object second)
        {
            obj.ShouldBeEquals(second);
        }
        
        /// <summary>
        /// Assert that two object are not equal
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="second"></param>
        public static void AreNotEqual(object obj, object second)
        {
            obj.ShouldBeNotEquals(second);
        }
        
        
        
        /// <summary>
        /// COmpare obj
        /// </summary>
        /// <param name="o1"></param>
        /// <param name="o2"></param>
        /// <returns></returns>
        public static bool ObjectEqual(object o1, object o2)
        {
            if (o1 == null && o2 != null) return false;
            if (o1 != null && o2 == null) return false;

            return o1 == null || o1.Equals(o2);
        }

        /// <summary>
        /// If obj is null return 'null' else tostring
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ToCompareString(this object obj)
        {
            return obj == null ? "null" : obj.ToString();
        }
        

    }
}