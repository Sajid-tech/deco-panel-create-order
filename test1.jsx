<section className="flex flex-col lg:flex-row min-h-screen">
<div className="flex-1 lg:w-3/5 m-4 lg:m-12  px-4 lg:px-8">
  <div className="text-center">
    <Typography variant="h2" className="font-bold mb-4">
      DECO PANEL
    </Typography>
    <Typography
      variant="paragraph"
      color="blue-gray"
      className="text-lg font-normal"
    >
      Enter your username and password to Sign In.
    </Typography>
  </div>
  <form
    onSubmit={handleSumbit}
    method="POST"
    className="mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4"
  >
    <div className="mb-6 flex flex-col gap-6">
      <Typography
        variant="small"
        color="blue-gray"
        className="-mb-3 font-medium"
      >
        Username
      </Typography>
      <Input
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="lg"
        placeholder="Enter the username"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography
        variant="small"
        color="blue-gray"
        className="-mb-3 font-medium"
      >
        Password
      </Typography>
      <Input
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        size="lg"
        placeholder="********"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>

    <Button type="sumbit" disabled={loading} className="mt-6" fullWidth>
      {loading ? "Checking..." : "Sign In"}
    </Button>

    <div className="flex items-center justify-between gap-2 mt-6">
      <Typography variant="small" className="font-medium text-gray-900">
        <Link
          to="https://decopanel.in/session/forgot-password"
          target="blank"
        >
          Reset Password
        </Link>
      </Typography>
    </div>
  </form>
</div>
<div className="w-full lg:w-2/5 h-auto lg:h-full hidden  lg:block">
  <img
    src="/img/pattern.png"
    className="h-full max-h-screen w-full object-cover  rounded-none"
    alt="Sign In Background"
  />
</div>
</section>