package pl.pz.backend.backend;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
class UserService {
    private final UserRepository userRepository;

    User getUser(int id) {
        return userRepository.findById(id).orElseThrow(() -> new UserDoesNotExistsException("User with given id %d does not exists".formatted(id)));
    }

}
