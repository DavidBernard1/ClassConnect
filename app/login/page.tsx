export default function LoginPage() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="brand-block" style={{justifyContent:'center', marginBottom:20}}>
          <div className="brand-logo"><img src="/logo.svg" alt="DavidNet Technologies" /></div>
          <span>ClassConnect</span>
        </div>
        <h2 style={{marginTop:0, textAlign:'center'}}>Welcome back</h2>
        <form className="form-grid" method="post" action="/api/auth/login">
          <div className="field">
            <label htmlFor="identifier">Email or username or phone</label>
            <input id="identifier" name="identifier" placeholder="jane@school.edu or jane_doe or +250..." required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Enter your password" required />
          </div>
          <button className="btn primary" type="submit">Login</button>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:14}}>
            <a href="/register">Create account</a>
            <a href="/forgot-password">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
