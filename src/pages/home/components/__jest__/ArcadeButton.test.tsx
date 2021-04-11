it("foo", () => {
  expect("bob").toBeTruthy();
});

it("bar", async () => {
  const bar = Promise.resolve("bar");
  expect(await bar).toEqual("bar");
});
