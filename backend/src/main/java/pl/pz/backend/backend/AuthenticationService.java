package pl.pz.backend.backend;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    private User user;

    @Autowired
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
        return true;
    }
}
