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
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getPassword().equals(password)) {
                this.user = user;
                return true;
            }
        }

        return false;
    }

//    ---

    public TokenInfo validateToken(String token) throws InvalidTokenException {
        if (token == null || token.length() != 100) {
            throw new InvalidTokenException("Nieprawidłowy format tokenu");
        }

        Optional<Token> tokenOptional = tokenRepository.findByTokenBody(token);
        if (!tokenOptional.isPresent()) {
            throw new InvalidTokenException("Token nie znaleziony");
        }

        Token dbToken = tokenOptional.get();
        if (dbToken.getValidUntil().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(dbToken);
            throw new InvalidTokenException("Token przeterminowany");
        }

        User user = userRepository.findById(dbToken.getUserId()).orElseThrow(() -> new InvalidTokenException("Nie znaleziono użytkownika"));
        String newToken = generateNewToken(user);
        dbToken.setTokenBody(newToken);
        dbToken.setValidUntil(LocalDateTime.now().plusHours(1)); // reset expiration
        tokenRepository.save(dbToken);

        return new TokenInfo(newToken, user.getRole(), dbToken.getValidUntil());
    }


    private String generateNewToken(User user) {
        String rawToken = RandomStringUtils.random(86, true, true) + "R" + user.getRole() + "ID" + user.getId();
        return rawToken + StringUtils.repeat('0', 100 - rawToken.length());
    }



}
