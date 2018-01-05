using Retyped;

namespace Bridge.EasyTests
{
    public class App
    {
        public static void Main()
        {
            var runner = new Runner();
            knockout.ko.applyBindings(runner);
            runner.Run();
        }
    }
}