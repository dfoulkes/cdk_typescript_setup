import {App, Stack, StackProps} from '@aws-cdk/core';
import {Peer, Port, SecurityGroup, SubnetType, Vpc} from '@aws-cdk/aws-ec2';

let myVpcs;

export class VpcStack extends Stack{
 
    readonly vpc: Vpc;
    readonly ingressSecurityGroup: SecurityGroup;
    readonly egressSecurityGroup: SecurityGroup;

    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        this.vpc = new Vpc(this, 'automatedVpc', {
            cidr: '10.0.0.0/16',
            maxAzs: 2,
            subnetConfiguration: [{
                cidrMask: 25,
                name: 'private-subnet',
                subnetType: SubnetType.PRIVATE,
            }, {
                cidrMask: 25,
                name: 'public-subnet',
                subnetType: SubnetType.PUBLIC,      
            }],
            natGateways: 1
        });

        this.ingressSecurityGroup = new SecurityGroup(this, 'ingress-security-group', {
            vpc: this.vpc,
            allowAllOutbound: false,
            securityGroupName: 'IngressSecurityGroup',
        });
        this.ingressSecurityGroup.addIngressRule(Peer.ipv4('10.0.0.0/16'), Port.tcp(3306));
        
        this.egressSecurityGroup = new SecurityGroup(this, 'egress-security-group', {
            vpc: this.vpc,
            allowAllOutbound: false,
            securityGroupName: 'EgressSecurityGroup',
        });
        
        this.egressSecurityGroup.addEgressRule(Peer.anyIpv4(), Port.tcp(80));
    }
   
  getVpc(environment:String) {
     return this.vpc;
   }     
}