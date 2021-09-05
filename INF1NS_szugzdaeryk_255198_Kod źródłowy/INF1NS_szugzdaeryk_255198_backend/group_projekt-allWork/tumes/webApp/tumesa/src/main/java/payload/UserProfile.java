/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package payload;

/**
 *
 * @author eszug
 */
import com.projectgroup.tumesa.models.Role;
import java.time.Instant;
import java.util.Collection;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;

public class UserProfile {
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private Set<String> roles;


    public UserProfile(Long id, String firstName, String lastName, String phone, String email, Set<String> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.roles = roles;

    }

    public Set<String> getRoles() {
        return this.roles;
    }

    public void setRoles(Set<String> role) {
        this.roles = role;
    }
//    private Collection<? extends GrantedAuthority> roless;
//
//    public void setRoless(Collection<? extends GrantedAuthority> roless) {
//        this.roless = roless;
//    }
//       
//    
//    public Collection<? extends GrantedAuthority> getRoless() {
//        return roless;
//    }
//    
//    public String getRawRoles(){
//        Set<Role> role = getRoles();
//        String aa = role.toString();
//        return aa.replaceAll("[\\[\\](){}]","");
//    }
    
    
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

