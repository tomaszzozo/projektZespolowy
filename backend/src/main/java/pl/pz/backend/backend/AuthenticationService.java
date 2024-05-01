package pl.pz.backend.backend;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    public AuthenticationService(UserRepository userRepository, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    private UserRepository userRepository;

    private User user;

    private TokenRepository tokenRepository;


    public TokenInfo authenticate(String email, String password) {
        if (userIsValid(email, password)) {
            userRepository.findByEmail(email);
            String rawToken = RandomStringUtils.random(86, true, true) + "R" + user.getRole() + "ID" + user.getId();
            String finalToken = rawToken + StringUtils.repeat('0', 100 - rawToken.length());

            Token token = new Token();
            token.setTokenBody(finalToken);
            token.setValidUntil(LocalDateTime.now().plusHours(1));
            token.setTokenType(0);
            token.setUserId(user.getId());
            tokenRepository.save(token);
            return new TokenInfo(finalToken, user.getRole(), LocalDateTime.now().plusHours(1));
        }
        return null;
    }

    private boolean userIsValid(String email, String password) {
        // Wyszukiwanie użytkownika w bazie danych po adresie email.
        Optional<User> userOptional = userRepository.findByEmail(email);

        // Sprawdzenie, czy użytkownik istnieje i czy hasło się zgadza.
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Tutaj powinieneś porównać hasło z zaszyfrowanym hasłem w bazie danych.
            // Poniżej zakładamy, że hasła są przechowywane w postaci zaszyfrowanej i używamy metody do sprawdzenia hasła.
            // Na przykład używając bcrypt (w rzeczywistych aplikacjach nie przechowujemy ani nie porównujemy haseł w postaci jawnej):
            // if (passwordEncoder.matches(password, user.getPassword())) {
            //     this.user = user;
            //     return true;
            // }

            // Przykładowa prosta wersja, zakładając że hasła są przechowywane w postaci jawnej (niezalecane w produkcji):
            if (user.getPassword().equals(password)) {
                this.user = user; // Przypisanie znalezionego użytkownika do zmiennej klasy, jeśli jest potrzebna gdzie indziej.
                return true;
            }
        }

        // Jeśli nie znaleziono użytkownika lub hasło nie zgadza się, zwracamy false.
        return false;
    }

}
