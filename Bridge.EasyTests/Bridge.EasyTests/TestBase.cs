namespace Bridge.EasyTests
{
    public abstract class TestBase
    {
        public virtual string Description => this.GetType().Name;

        protected AssertResult Result => AssertResult.Result;
    }
}