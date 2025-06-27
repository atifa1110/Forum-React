describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Enter your email"]').should('be.visible');
    cy.get('input[placeholder="Enter your password"]').should('be.visible');
    cy.get('button')
      .contains(/^Log in$/)
      .should('be.visible');
  });

  it('should show required error when input email is empty', () => {
    // langsung submit tanpa isi
    cy.get('form').submit();

    // cek bahwa input required memunculkan validasi native
    cy.get('input[type="email"]')
      .then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validity.valueMissing).to.be.true;
    });
  });

  it('should show required error when input password is empty', () => {
    // Isi input email saja
    cy.get('input[placeholder="Enter your email"]').type('user@example.com');

    // langsung submit tanpa isi
    cy.get('form').submit();

     // Cek validasi native browser pada input password
    cy.get('input[type="password"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validity.valueMissing).to.be.true;
    });
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="Enter your email"]').type('user@example.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Enter your password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('form').submit();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Error: email or password is wrong');
    });
  });

  it('should display alert when email and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="Enter your email"]').type('user@example.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Enter your password"]').type('1245678');

    // menekan tombol Login
    cy.get('form').submit();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Logged in successfully! Please Welcome');
    });
  });

});

